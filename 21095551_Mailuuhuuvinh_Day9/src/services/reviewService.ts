import { api } from "../api/client";
import type { Review } from "../types";

export type NewReview = Omit<Review, "id" | "createdAt">;

// GET /reviews?bookId=... — đánh giá mới nhất đứng đầu
export async function getReviewsByBook(bookId: number): Promise<Review[]> {
  const res = await api.get<Review[]>("/reviews", { params: { bookId, _sort: "createdAt", _order: "desc" } });
  return res.data;
}

// POST /reviews — json-server trả về bản ghi vừa tạo (đã có id)
export async function addReview(payload: NewReview): Promise<Review> {
  const res = await api.post<Review>("/reviews", { ...payload, createdAt: new Date().toISOString() });
  return res.data;
}
