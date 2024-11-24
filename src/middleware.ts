import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = async (request: NextRequestWithAuth) => {
  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/admin");

  if (!request?.nextauth?.token?.user) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
  let userToken: { token?: string } = request.nextauth.token.user;

  if (!userToken?.token) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  const isAdmin = request.nextauth.token.user.profile.role.includes("ADMIN");
  if (isPrivateRoutes && !isAdmin) {
    return NextResponse.rewrite(new URL("/perfil", request.url));
  }

  return NextResponse.next();
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware);
export const config = {
  matcher: ["/perfil", "/carrinho", "/admin", "/dashboard"],
};
