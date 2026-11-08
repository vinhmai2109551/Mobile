import { api } from "../api/client";
import type { Category } from "../types";

// GET /categories — cùng khuôn với getBooks
export async function getCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>("/categories");
  return res.data;
}
