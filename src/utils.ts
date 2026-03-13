import { redirect } from "react-router-dom";

export async function requireAuth(request: Request): Promise<any> {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedin") || "false");
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    // Create redirect response and tell TS it can have a body
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`,
    ) as unknown as { body?: unknown }; // <-- cast to allow `body`

    // Add body to satisfy Mirage.js
    response.body = true;

    return response;
  }

  return null;
}
