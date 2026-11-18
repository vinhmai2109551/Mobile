import { api } from "../api/client";
import type { Book } from "../types";

// Tham số lọc/sắp xếp mà json-server hiểu (?categoryId=1, ?q=..., ?_sort=price&_order=asc)
export interface BookQuery {
  categoryId?: number;
  q?: string;
  _sort?: keyof Book;
  _order?: "asc" | "desc";
}

// GET /books — danh sách sách (có thể kèm tham số lọc)
export async function getBooks(params?: BookQuery): Promise<Book[]> {
  const res = await api.get<Book[]>("/books", { params });
  return res.data;
}

// GET /books/:id — chi tiết một cuốn
export async function getBookById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}
