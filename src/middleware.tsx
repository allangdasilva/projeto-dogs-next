import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const authenticated = token ? true : false;

  // Se o usuário não estiver autenticado e tentar acessar /conta, redirecione-o para
  // /login
  if (!authenticated && request.nextUrl.pathname.startsWith("/conta")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Se o usuário estiver autenticado e tentar acessar /login, redirecione-o para
  // /conta
  if (authenticated && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/conta", request.url));
  }

  // Qualquer coisa diferente desses if's acima, o progama segue o fluxo normal
  // Mas nessa solução aqui, ainda não verificamos se o token é válido, mas ainda
  // vamos fazer isso, ou seja: não tem segurança.
  return NextResponse.next();
}

export const config = {
  matcher: ["/conta/:path*", "/login/:path*"],
};
