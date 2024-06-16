export function generateId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function trimFormData(
  data: FormData,
  fields: string[],
): Record<string, string> {
  const trimmedData: Record<string, string> = {};
  fields.forEach((field) => {
    const value = data.get(field) as string;
    trimmedData[field] = value ? value.trim() : "";
  });
  return trimmedData;
}

export const getFullAddress = (address: string, unit: string) => {
  return `${address.trim()} ${unit ? unit.trim() : ""}`.trim();
};
