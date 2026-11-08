import type { Book } from "../types";

// Bỏ dấu tiếng Việt + về chữ thường để "DAC NHAN" khớp "Đắc Nhân Tâm"
// NFD tách dấu ra khỏi chữ, ̀-ͯ là dải ký tự dấu; đ/Đ không tách được nên thay riêng
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null; // null = không lọc giá

export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

export interface BookFilter {
  keyword: string;
  categoryId: number | null; // null = tất cả danh mục
  priceRange: PriceRange;
}

// Giá có nằm trong khoảng đã chọn không (không chọn khoảng nào = luôn đúng)
export const inRange = (p: number, r: PriceRange) =>
  r === null || (r === "lt100" ? p < 100000 : r === "100to300" ? p >= 100000 && p <= 300000 : p > 300000);

// Lọc kết hợp: từ khoá, danh mục, khoảng giá phải đúng CÙNG LÚC (AND)
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const k = normalize(f.keyword); // từ khoá rỗng = giữ tất cả
  return books.filter((b) =>
    (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
    (f.categoryId === null || b.categoryId === f.categoryId) &&
    inRange(b.price, f.priceRange));
}
