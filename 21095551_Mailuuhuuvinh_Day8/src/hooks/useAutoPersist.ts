import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// value đổi thì tự ghi vào AsyncStorage.
// Chỉ ghi khi ready: lần render đầu giỏ còn rỗng, ghi ngay sẽ đè mất dữ liệu cũ chưa kịp đọc.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}
