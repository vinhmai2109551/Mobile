// 389000 -> "389.000 đ" (tự chèn dấu chấm, không phụ thuộc Intl của máy)
export const formatPrice = (n: number) =>
  `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
