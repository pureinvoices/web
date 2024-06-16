import type { ReactElement } from "react";
import type { TItemForm } from "./types";
import { useForm } from "@tanstack/react-form";
import { itemSchema } from "./validation/itemSchema";
import Input from "./elements/Input";
import SubmitButton from "./elements/SubmitButton";

export default function Item(): ReactElement {
  const form = useForm<TItemForm>({
    defaultValues: {
      name: "",
      desc: "",
      price: "",
      sku: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      Object.keys(value).forEach((key) => {
        formData.append(key, value[key as keyof TItemForm]);
      });
      try {
        const response = await fetch("/api/add_item", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        form.reset();
        // window.location.href = "/";
      } catch (error) {
        console.error("Failed to add item", error);
      }
    },
  });

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
          name="name"
          schema={itemSchema.name}
          label="Name"
          placeholder="32 - 55 TV Mount Installation"
        />
        <Input
          form={form}
          name="desc"
          schema={itemSchema.desc}
          label="Description"
          placeholder="Item description"
        />
        <Input
          form={form}
          name="price"
          schema={itemSchema.price}
          label="Price"
          placeholder="$119.00"
        />
        <Input
          form={form}
          name="sku"
          schema={itemSchema.sku}
          label="Stock Keeping Unit"
          placeholder="SKU034"
        />
        <SubmitButton
          form={form}
          title="Create Item"
          submittingTitle="Creating..."
        />
      </form>
    </div>
  );
}
