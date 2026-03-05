import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Permitir acesso à página de login
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Se não tiver token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Define quais rotas serão protegidas
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};