import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  const { pathname } = req.nextUrl;

  console.log("🔒 Middleware is running!");
  console.log("📄 Path:", pathname);
  console.log("🪪 Token:", token);

  const isAuth = !!token;
  const isPublicPath = ["/", "/login"].includes(pathname);

  if (!isAuth && !isPublicPath) {
    console.log("🔁 Not Authenticated → Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isPublicPath) {
    console.log("✅ Authenticated → Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|webp|mp4|ico|json)).*)",
  ],
};
