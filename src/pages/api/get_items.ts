import type { APIRoute } from "astro";
import { db, Items } from "astro:db";

export const GET: APIRoute = async () => {
  try {
    const items = await db.select().from(Items);
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: `Failed to fetch items: ${error.message}`,
        }),
        { status: 500 },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "An unknown error occurred",
        }),
        { status: 500 },
      );
    }
  }
};
