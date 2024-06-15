import { defineDb, defineTable, column, NOW } from "astro:db";

const Customers = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    address: column.text(),
    email: column.text(),
    phone: column.text(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

const Items = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    sku: column.text({ optional: true }),
    name: column.text(),
    desc: column.text({ optional: true }),
    price: column.number(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

const Invoices = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    number: column.text(),
    url: column.text(),
    customer: column.text(),
    date: column.date({ default: NOW }),
    dueDate: column.date({ optional: true }),
    total: column.number(),
    invItems: column.json(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
  foreignKeys: [
    {
      columns: ["customer"],
      references: () => [Customers.columns.id],
    },
  ],
});

export default defineDb({
  tables: { Customers, Items, Invoices },
});
