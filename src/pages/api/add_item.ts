import type { APIRoute } from "astro";
import { db, Items } from "astro:db";
import { generateId, trimFormData } from "../../utils/helper";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const fields = ["name", "desc", "price", "sku"];
  const trimmedData = trimFormData(data, fields);
  const { name, desc, price, sku } = trimmedData;
  const id = generateId(16) as string;

  if (!name || !price || !sku) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const newItem = { id, name, desc, price: Number(price), sku };

  try {
    await db.insert(Items).values(newItem);
    return new Response(
      JSON.stringify({
        message: "Item added successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: `Failed to add item: ${error.message}`,
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
