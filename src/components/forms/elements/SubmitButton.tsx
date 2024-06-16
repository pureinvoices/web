import { type ReactElement } from "react";
import { FormApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormFieldProps<TFormData> {
  form: FormApi<TFormData>;
  title: string;
  submittingTitle: string;
}

export default function SubmitButton<TFormData>({
  form,
  title,
  submittingTitle,
}: FormFieldProps<TFormData>): ReactElement {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button
          variant="secondary"
          type="submit"
          disabled={!canSubmit}
          className="w-full"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? submittingTitle : title}
        </Button>
      )}
    />
  );
}
