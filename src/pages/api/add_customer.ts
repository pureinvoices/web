import type { APIRoute } from "astro";
import { db, Customers } from "astro:db";
import { generateId, trimFormData, getFullAddress } from "../../utils/helper";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const fields = ["name", "address", "unit", "email", "phone"];
  const trimmedData = trimFormData(data, fields);
  const { name, address, unit, email, phone } = trimmedData;
  const id = generateId(32) as string;

  if (!name || !address || !email || !phone) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const fullAddress = getFullAddress(address, unit);
  const newCustomer = { id, name, address: fullAddress, email, phone };

  try {
    await db.insert(Customers).values(newCustomer);
    return new Response(
      JSON.stringify({
        message: "Customer added successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: `Failed to add customer: ${error.message}`,
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
