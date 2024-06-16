import { type ReactElement } from "react";
import { type ZodSchema } from "astro/zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { FieldApi, FormApi, type DeepKeys } from "@tanstack/react-form";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps<TFormData> {
  form: FormApi<TFormData>;
  name: DeepKeys<TFormData>;
  schema: ZodSchema;
  label?: string;
  type?: string;
  placeholder: string;
}

export default function Input<TFormData>({
  form,
  name,
  schema,
  label,
  type = "text",
  placeholder,
}: FormFieldProps<TFormData>): ReactElement {
  return (
    <div className="mb-3 flex flex-col">
      <form.Field
        name={name}
        validatorAdapter={zodValidator}
        validators={{ onChange: schema }}
        children={(field: FieldApi) => (
          <div className="grid gap-1.5">
            <Label htmlFor={field.name as string}>{label}</Label>
            <ShadcnInput
              type={type}
              name={field.name as string}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={placeholder}
            />
            {field.state.meta.errors ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      />
    </div>
  );
}
