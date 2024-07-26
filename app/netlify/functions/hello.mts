import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const apiKey = Netlify.env.get("VITE_USERBASE_APP_ID");

  return new Response(apiKey)
}
