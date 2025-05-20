import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const certificateId = context.params.id;
  
    const token = req.nextUrl.searchParams.get("token");
  
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
  
    const backendUrl = `http://localhost:8080/api/certificates/${certificateId}/file`;
  
    const backendRes = await fetch(backendUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (!backendRes.ok) {
      return new NextResponse(await backendRes.text(), {
        status: backendRes.status,
      });
    }
  
    const contentType = backendRes.headers.get("Content-Type") || "application/octet-stream";
    const contentDisposition = `inline; filename="preview.pdf"`;
  
    const fileBuffer = await backendRes.arrayBuffer();
  
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="preview.pdf"`,
      },
    });
  }
  