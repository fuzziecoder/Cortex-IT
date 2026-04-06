import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';
const NVIDIA_CHAT_MODEL = process.env.NVIDIA_CHAT_MODEL || 'meta/llama-3.1-8b-instruct';
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

async function buildSystemPrompt() {

  // Build concise project summaries (names only, no data dumps)
  let projectNames = '';
  let partnersNames = '';

  try {
    const projects = await prisma.project.findMany();
    projectNames = projects.map(p => {
      const tags = JSON.parse(p.tags) as string[];
      return `${p.title}: ${p.subtitle} (${tags.slice(0, 2).join(', ')}) — /case-study/${p.slug}`;
    }).join('\n');
  } catch { projectNames = 'Data unavailable'; }

  try {
    const partners = await prisma.partner.findMany();
    partnersNames = partners.map(p => p.name).join(', ');
  } catch { partnersNames = 'Data unavailable'; }

  return `CRITICAL INSTRUCTIONS — YOU MUST FOLLOW THESE:
You are a friendly chat assistant on the Cortex website. This is a small chat widget, NOT a document.

RULES YOU MUST OBEY:
1. MAXIMUM 2-3 sentences per reply. Never more.
2. Never use bullet points, numbered lists, or markdown formatting.
3. Never dump all project details at once. Just name them briefly.
4. Write like a friendly human texting — short, casual, warm.
5. Only give detailed info if the user explicitly asks for it.
6. Never exceed 60 words per response.

ABOUT CORTEX:
Cortex is a digital engineering studio. Tagline: "The Core of Technology." They build apps, websites, AI solutions, chatbots, handle SEO, Cloud/DevOps, APIs, and maintenance.

Process: Discover → Design → Build → Launch & Grow.
Differentiators: End-to-end ownership, design-first engineering, AI-ready, performance & security focused.

PROJECTS:
${projectNames}

PARTNERS: ${partnersNames}

METRICS: 5+ projects, 98% satisfaction, 5+ clients, 4x avg ROI.
BUDGET: Ranges from under $5k to $25k+. For exact quotes → contact form.
CONTACT: Direct users to scroll down to the contact form or /#contact.
TESTIMONIALS: Ravi Kumar (BUC India), Guru Prasad (SGS Laser), Ananya Sharma (Humanity Calls), Vikram Desai (NexGen Solutions) — all gave glowing reviews.

Remember: Keep every response under 60 words. Be conversational. No lists. No markdown.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!NVIDIA_API_KEY) {
      return Response.json(
        { error: 'NVIDIA API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = await buildSystemPrompt();

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_CHAT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 150,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NVIDIA API error:', response.status, errorText);
      return Response.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    );
                  }
                } catch {
                  // Skip malformed JSON chunks
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
