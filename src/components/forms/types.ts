export interface TCustomerForm {
  name: string;
  address: string;
  unit: string;
  email: string;
  phone: string;
}

export interface TItemForm {
  name: string;
  desc: string;
  price: string;
  sku: string;
}

export interface TItem {
  id: string;
  sku?: string;
  name: string;
  desc?: string;
  price: number;
  quantity: number;
}

export interface TInvoiceForm {
  customer: string;
  date: string;
  dueDate: string;
  invItems: Array<TItem>;
}

export interface InvoiceItemsProps {
  items: TItem[];
  setItems: React.Dispatch<React.SetStateAction<TItem[]>>;
  availableItems: TItem[];
}

export const initialItemState: TItem = {
  id: "",
  sku: "",
  name: "",
  desc: "",
  price: 0,
  quantity: 0,
};
