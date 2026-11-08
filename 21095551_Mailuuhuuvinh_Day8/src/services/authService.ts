import { api } from "../api/client";
import type { User } from "../types";

// Bản ghi trong db.json có thêm password, KHÔNG được đưa vào store/AsyncStorage
interface UserRecord extends User { password: string; }

const normalizeEmail = (email: string) => email.trim().toLowerCase();

// Bỏ password trước khi trả về cho app
const toUser = ({ password: _password, ...user }: UserRecord): User => user;

// Token giả cho buổi học; hệ thống thật do server cấp
const makeToken = (user: User) => `fake-token-${user.id}-${Date.now()}`;

// GIẢ LẬP: app tự so mật khẩu. Hệ thống thật phải để server kiểm tra.
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  const res = await api.get<UserRecord[]>("/users", { params: { email: normalizeEmail(email) } });
  const found = res.data[0];
  if (!found || found.password !== password) throw new Error("Email hoặc mật khẩu không đúng");
  const user = toUser(found);
  return { user, token: makeToken(user) };
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ user: User; token: string }> {
  const normalized = normalizeEmail(email);
  const exists = await api.get<UserRecord[]>("/users", { params: { email: normalized } });
  if (exists.data.length > 0) throw new Error("Email này đã được đăng ký");
  const res = await api.post<UserRecord>("/users", { name: name.trim(), email: normalized, password });
  const user = toUser(res.data);
  return { user, token: makeToken(user) };
}
