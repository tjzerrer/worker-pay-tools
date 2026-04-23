export function parseNumberInput(value: string) {
  const number = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(number) ? number : 0;
}

export function formatNumberInput(value: string) {
  const sanitized = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  if (!sanitized) return "";

  const hasDecimal = sanitized.includes(".");
  const [rawInteger, ...decimalParts] = sanitized.split(".");
  const integer = (rawInteger || "0").replace(/^0+(?=\d)/, "");
  const groupedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!hasDecimal) return groupedInteger;

  return `${groupedInteger}.${decimalParts.join("")}`;
}

export function formatNumber(value: number, fractionDigits = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });
}

export function formatWholeNumber(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
}

export function formatMoney(value: number) {
  return `$${formatNumber(value, 2)}`;
}
