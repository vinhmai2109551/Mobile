import { useEffect, useState } from "react";

// Chỉ trả về giá trị mới sau khi value đứng yên đủ `delay` ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    // mỗi lần value đổi: đặt hẹn giờ mới, hàm dọn dẹp huỷ hẹn giờ cũ
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
