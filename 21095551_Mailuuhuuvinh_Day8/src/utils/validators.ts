// Mỗi hàm trả về câu báo lỗi, hoặc null nếu hợp lệ

export const validateEmail = (v: string): string | null => {
  const s = v.trim();
  if (!s) return "Vui lòng nhập email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Email không đúng định dạng";
  return null;
};

export const validatePassword = (v: string): string | null => {
  if (!v) return "Vui lòng nhập mật khẩu";
  if (v.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
  return null;
};

// validateRequired("họ tên")(name) -> "Vui lòng nhập họ tên" nếu để trống
export const validateRequired = (label: string) => (v: string): string | null =>
  v.trim() ? null : `Vui lòng nhập ${label}`;
