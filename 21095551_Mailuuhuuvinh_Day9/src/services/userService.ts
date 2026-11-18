import { api } from "../api/client";
import type { User } from "../types";

interface UserRecord extends User { password?: string; }

export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<UserRecord>(`/users/${id}`, data);
  const { password: _password, ...user } = res.data;
  return user;
}
