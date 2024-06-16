import { z } from "astro/zod";

const customerIdSchema = z
  .string()
  .trim()
  .min(32, { message: "Invalid customer ID format" })
  .max(32, { message: "Invalid customer ID format" });

const dateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD");

const totalSchema = z
  .string()
  .trim()
  .regex(/^\d+(,\d{3})*(\.\d{1,2})?$/, {
    message:
      "Total must be a valid number format with up to two decimal places",
  });

const itemSchema = z.object({
  id: z.string().uuid({ message: "Invalid item ID format" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export const invoiceSchema = {
  customer: customerIdSchema,
  date: dateSchema,
  dueDate: dateSchema,
  total: totalSchema,
  items: z
    .array(itemSchema)
    .min(1, { message: "At least one item is required" }),
};
