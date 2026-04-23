import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin_token")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fileBase64, fileName } = body;

    if (!fileBase64 || !fileName) {
      return NextResponse.json(
        { error: "Missing file data" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "logos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename and add timestamp to avoid collisions
    const safeName = fileName
      .replace(/[^a-zA-Z0-9.\-_]/g, "_")
      .toLowerCase();
    const uniqueFileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Decode base64 and write to file
    const fileBuffer = Buffer.from(fileBase64, "base64");
    fs.writeFileSync(filePath, fileBuffer);

    const publicUrl = `/uploads/logos/${uniqueFileName}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
