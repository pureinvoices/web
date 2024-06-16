import { type ReactElement, useState, useEffect } from "react";
import type { TInvoiceForm, TItem } from "./types";
import { useForm } from "@tanstack/react-form";
import { invoiceSchema } from "./validation/invoiceSchema";
import Input from "./elements/Input";
import { Input as ShadcnInput } from "@/components/ui/input";
import SubmitButton from "./elements/SubmitButton";
import { Button } from "@/components/ui/button";
import { Plus, Trash2Icon } from "lucide-react";

const initialItemState: TItem = {
  id: "",
  sku: "",
  name: "",
  desc: "",
  price: 0,
  quantity: 0,
};

export default function Invoice(): ReactElement {
  const [availableItems, setAvailableItems] = useState<Array<TItem>>([]);
  const [items, setItems] = useState<TItem[]>([initialItemState]);
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
        setAvailableItems([initialItemState]);
        form.reset();

        // window.location.href = "/";
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

  const handleItemChange = (
    index: number,
    key: keyof TItem,
    value: string | number,
  ) => {
    console.log("item updated");
    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          if (key === "id") {
            const selectedItem = availableItems.find(
              (availableItem) => availableItem.id === value,
            );
            if (selectedItem) {
              return { ...selectedItem, quantity: item.quantity };
            }
          }
          return { ...item, [key]: value };
        }
        console.log("item >> ", item);
        return item;
      }),
    );
  };

  const addItem = () => {
    setItems((prevItems) => [...prevItems, { ...initialItemState }]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

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

        <div>
          {items.map((item, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <select
                className="w-full border bg-gray-50 p-2"
                value={item.id}
                onChange={(e) => handleItemChange(index, "id", e.target.value)}
              >
                <option value="" disabled>
                  Select an item
                </option>
                {availableItems.map((availableItem) => (
                  <option key={availableItem.id} value={availableItem.id}>
                    {availableItem.name}
                  </option>
                ))}
              </select>

              <ShadcnInput
                className="w-1/4"
                placeholder="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", parseInt(e.target.value))
                }
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => removeItem(index)}
              >
                <Trash2Icon size={22} />
              </Button>
            </div>
          ))}
          <Button
            className="mb-3 pb-3"
            variant="outline"
            type="button"
            onClick={addItem}
          >
            <Plus size={16} /> <span className="ml-1">Add item</span>
          </Button>
        </div>
        <SubmitButton
          form={form}
          title="Create Invoice"
          submittingTitle="Creating..."
        />
      </form>
    </div>
  );
}
