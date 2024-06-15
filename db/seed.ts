import { db, Customers, Items, Invoices } from "astro:db";

export default async function () {
  await db.insert(Customers).values([
    {
      id: "SEEDLQLjMH4g9SlHdziwrHPzRy4RJqTC",
      name: "Bastinkie Thomson",
      address: "372 Main St, Kramson, CA 00048 (Apt 2)",
      email: "bastinkie.thomson@example.com",
      phone: "006 400 0306",
    },
    {
      id: "SEED0lGzvC6ZC5wr24HZ74WmJK87agsQ",
      name: "Mediphira Bailey",
      address: "15 Indian Hill Rd, Thozzt, CA 00080",
      email: "mediphira.bailey@example.com",
      phone: "050 200 2955",
    },
  ]);

  await db.insert(Items).values([
    {
      id: "SEEDpjvi4sOgxeGP",
      sku: "TVM001",
      name: "32 - 55 TV Mount Installation",
      desc: "",
      price: 99.0,
    },
    {
      id: "SEEDoAMWHphnMink",
      sku: "TVM002",
      name: "56 - 75 TV Mount Installation",
      desc: "",
      price: 169.0,
    },
    {
      id: "SEEDrJNmkcYY49YZ",
      sku: "TVM003",
      name: "76 - 85 TV Mount Installation",
      desc: "",
      price: 239.0,
    },
    {
      id: "SEEDRUvtSnfeM6h5",
      sku: "CORD01",
      name: "Cord Masking (Up to 4 ft)",
      desc: "",
      price: 49.0,
    },
  ]);

  await db.insert(Invoices).values([
    {
      id: "SEED6cc5",
      number: "INV001",
      url: "https://example.com/invoices/INV001",
      customer: "SEEDLQLjMH4g9SlHdziwrHPzRy4RJqTC",
      dueDate: new Date(Date.now() + 10 * 86400000),
      total: 148.0,
      invItems: [
        {
          id: "SEEDpjvi4sOgxeGP",
          sku: "TVM001",
          name: "32 - 55 TV Mount Installation",
          desc: "",
          price: 99.0,
        },
        {
          id: "SEEDRUvtSnfeM6h5",
          sku: "CORD01",
          name: "Cord Masking (Up to 4 ft)",
          desc: "",
          price: 49.0,
        },
      ],
    },
    {
      id: "SEEDf748",
      number: "INV002",
      url: "https://example.com/invoices/INV002",
      customer: "SEED0lGzvC6ZC5wr24HZ74WmJK87agsQ",
      dueDate: new Date(Date.now() + 20 * 86400000),
      total: 239.0,
      invItems: [
        {
          id: "SEEDrJNmkcYY49YZ",
          sku: "TVM003",
          name: "76 - 85 TV Mount Installation",
          desc: "",
          price: 239.0,
        },
      ],
    },
  ]);
}
