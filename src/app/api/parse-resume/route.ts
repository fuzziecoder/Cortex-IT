import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a highly accurate resume parser. Your job is to extract specific fields from the provided raw text of a resume and output ONLY a valid JSON object. Do not include markdown formatting, markdown codeblocks (like \`\`\`json), greetings, or explanations. 

Map the extracted data strictly to these JSON keys:
{
  "firstName": "string (empty if not found)",
  "lastName": "string (empty if not found, usually remainder of the full name)",
  "email": "string (extract the first valid email, empty if none)",
  "mobileNumber": "string (extract phone number removing non-digits, empty if none)",
  "linkedinUrl": "string (url to linkedin profile, empty if none)",
  "portfolioUrl": "string (url to github, personal site, or other portfolio, empty if none)",
  "state": "string (full name of the state/province, e.g., 'Maharashtra' or 'California', empty if none)",
  "city": "string (city name, empty if none)",
  "graduation": "string (choose the highest degree from: 'High School', 'Associate Degree', 'Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Engineering', 'Master of Science', 'Master of Arts', 'Master of Business Administration', 'Master of Design', 'Ph.D.', 'Other'. If none found precisely, leave empty)",
  "yearsOfExperience": "string (numeric string like '3', empty if none)",
  "previousCompany": "string (name of latest/current employer, empty if none)",
  "previousRole": "string (title of latest/current job, empty if none)",
  "languagesKnown": "string (comma-separated list of identified languages, e.g., 'English,Hindi,Telugu', empty if none)"
}

Extract the most correct and probable data. If a field isn't clear, leave it empty. Ensure the JSON is perfectly valid.`;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    const model = process.env.NVIDIA_CHAT_MODEL || "meta/llama-3.1-8b-instruct";

    if (!apiKey) {
      return NextResponse.json({ error: "NVIDIA API key not configured" }, { status: 500 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Here is the resume text:\n\n${text}` }
        ],
        temperature: 0.1, // Low temp for strictly factual extraction
        max_tokens: 1024,
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("NVIDIA API Error:", errorText);
      return NextResponse.json({ error: "Failed to parse resume via AI" }, { status: 502 });
    }

    const data = await res.json();
    let content = data.choices[0]?.message?.content || "{}";

    // Strip markdown formatting if the model accidentally included it
    content = content.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();

    const parsedJson = JSON.parse(content);

    return NextResponse.json(parsedJson);

  } catch (error) {
    console.error("Parse Error:", error);
    return NextResponse.json({ error: "Internal Server Error parsing resume" }, { status: 500 });
  }
}
