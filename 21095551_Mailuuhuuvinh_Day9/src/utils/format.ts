// 389000 -> "389.000 đ" (tự chèn dấu chấm, không phụ thuộc Intl của máy)
export const formatPrice = (n: number) =>
  `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
