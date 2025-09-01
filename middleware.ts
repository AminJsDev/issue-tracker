export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/issues/new", "/api/edit/:id+"],
};
