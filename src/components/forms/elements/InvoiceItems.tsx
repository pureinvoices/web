import { initialItemState, type InvoiceItemsProps, type TItem } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InvoiceItems({
  items,
  setItems,
  availableItems,
}: InvoiceItemsProps) {
  const addItem = () => {
    setItems((prevItems) => [...prevItems, initialItemState]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    key: keyof TItem,
    value: string | number,
  ) => {
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
        return item;
      }),
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Select
              onValueChange={(value) => {
                handleItemChange(index, "id", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map((availableItem) => (
                  <SelectItem
                    key={availableItem.name}
                    value={availableItem.id || "NONE"}
                  >
                    {availableItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
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
      </div>
      <Button
        className="my-3"
        variant="outline"
        type="button"
        onClick={addItem}
      >
        <Plus size={16} /> <span className="ml-1">Add item</span>
      </Button>
    </>
  );
}
