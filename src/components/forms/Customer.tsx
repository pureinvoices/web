import type { ReactElement } from "react";
import type { TCustomerForm } from "./types";
import { useForm } from "@tanstack/react-form";
import { customerSchema } from "./validation/customerSchema";
import Input from "./elements/Input";
import SubmitButton from "./elements/SubmitButton";

export default function Customer(): ReactElement {
  const form = useForm<TCustomerForm>({
    defaultValues: {
      name: "",
      address: "",
      unit: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      Object.keys(value).forEach((key) => {
        formData.append(key, value[key as keyof TCustomerForm]);
      });
      try {
        const response = await fetch("/api/add_customer", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        form.reset();
        // window.location.href = "/";
      } catch (error) {
        console.error("Failed to add customer", error);
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
          schema={customerSchema.name}
          label="Name"
          placeholder="Bastinkie Thomson"
        />
        <Input
          form={form}
          name="address"
          schema={customerSchema.address}
          label="Address"
          placeholder="99 Main St, San Francisco, CA 94016"
        />
        <Input
          form={form}
          name="unit"
          schema={customerSchema.unit}
          label="Apt/Unit"
          placeholder="(Apt 2) or (Unit 2)"
        />
        <Input
          form={form}
          name="email"
          type="email"
          schema={customerSchema.email}
          label="Email"
          placeholder="name@email.com"
        />
        <Input
          form={form}
          name="phone"
          schema={customerSchema.phone}
          label="Phone"
          placeholder="555 123 4567"
        />
        <SubmitButton
          form={form}
          title="Create Client"
          submittingTitle="Creating..."
        />
      </form>
    </div>
  );
}
