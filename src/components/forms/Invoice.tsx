import { type ReactElement, useState, useEffect } from "react";
import { initialItemState, type TInvoiceForm, type TItem } from "./types";
import { useForm } from "@tanstack/react-form";
import { navigate } from "astro:transitions/client";
import { invoiceSchema } from "./validation/invoiceSchema";
import Input from "./elements/Input";
import SubmitButton from "./elements/SubmitButton";
import InvoiceItems from "./elements/InvoiceItems";

export default function Invoice(): ReactElement {
  const [availableItems, setAvailableItems] = useState<Array<TItem>>([]);
  const [items, setItems] = useState<TItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const form = useForm<TInvoiceForm>({
    defaultValues: {
      customer: "",
      date: "",
      dueDate: "",
      invItems: [],
    },
    onSubmit: async ({ value }) => {
      value.invItems = items;
      const invoiceData = {
        ...value,
        total,
      };

      const formData = new FormData();
      Object.keys(invoiceData).forEach((key) => {
        if (key !== "invItems") {
          const value = invoiceData[key as keyof typeof invoiceData];
          formData.append(key, value.toString());
        }
      });
      formData.append("invItems", JSON.stringify(invoiceData.invItems));

      try {
        const response = await fetch("/api/add_invoice", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        setItems([initialItemState]);
        form.reset();
        navigate("/invoices/view");
      } catch (error) {
        console.error("Failed to add invoice", error);
      }
    },
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/get_items");
        const items = await response.json();
        setAvailableItems(items);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = items.reduce((sum, item) => {
        const selectedItem = availableItems.find(
          (availableItem) => availableItem.id === item.id,
        );
        return sum + (selectedItem ? selectedItem.price * item.quantity : 0);
      }, 0);
      setTotal(newTotal);
    };

    calculateTotal();
  }, [items, availableItems]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Input
          form={form}
          name="customer"
          schema={invoiceSchema.customer}
          label="Customer"
          placeholder="Customer ID"
        />
        <Input
          form={form}
          name="date"
          schema={invoiceSchema.date}
          label="Date"
          placeholder="Date"
        />
        <Input
          form={form}
          name="dueDate"
          schema={invoiceSchema.dueDate}
          label="Due Date"
          placeholder="Due Date"
        />
        <InvoiceItems
          items={items}
          setItems={setItems}
          availableItems={availableItems}
        />
        <SubmitButton
          form={form}
          title="Create Invoice"
          submittingTitle="Creating..."
        />
      </form>
    </div>
  );
}
