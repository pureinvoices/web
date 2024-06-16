import type { APIRoute } from "astro";
import { db, Invoices } from "astro:db";
import { generateId, trimFormData } from "../../utils/helper";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const fields = ["customer", "date", "dueDate", "invItems", "total"];
  const trimmedData = trimFormData(data, fields);
  const { customer, date, dueDate, total, invItems } = trimmedData;
  const id = generateId(8) as string;

  if (!customer || !date || !dueDate || !invItems || !total) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const newInvoice = {
    id,
    number: "INV2134",
    customer,
    url: `https://inv.techinstallinc.com/v/${id}`,
    date: new Date(date),
    dueDate: new Date(dueDate),
    total: Number(total),
    invItems: JSON.parse(invItems),
  };

  try {
    await db.insert(Invoices).values(newInvoice);
    return new Response(
      JSON.stringify({
        message: "Invoice added successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: `Failed to add invoice: ${error.message}`,
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
