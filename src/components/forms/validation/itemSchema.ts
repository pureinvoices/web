import { z } from "astro/zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(50, { message: "Name must be 50 characters or fewer" });

const priceSchema = z
  .string()
  .trim()
  .regex(/^\d+(,\d{3})*(\.\d{1,2})?$/, {
    message:
      "Price must be a valid number format with up to two decimal places",
  });

const descSchema = z
  .string()
  .trim()
  .min(10, { message: "Description must contain at least 10 characters" })
  .max(200, { message: "Description must be 200 characters or fewer" });

const skuSchema = z
  .string()
  .trim()
  .regex(
    /^[A-Z0-9]{6}$/,
    "SKU must be 6 characters long, consisting of uppercase letters and numbers",
  );

export const itemSchema = {
  name: nameSchema,
  desc: descSchema,
  price: priceSchema,
  sku: skuSchema,
};
