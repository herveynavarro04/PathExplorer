import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const certificateId = context.params.id;

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1] || req.cookies.get("token")?.value;
  const url = process.env.NEXT_PUBLIC_API_URL!;

  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const backendUrl = `${url}/certificates/${certificateId}/file`;

  const backendRes = await fetch(backendUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!backendRes.ok) {
    return new NextResponse(await backendRes.text(), {
      status: backendRes.status,
    });
  }

  const contentType =
    backendRes.headers.get("Content-Type") || "application/octet-stream";
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
