import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage chỉ lưu chuỗi nên đổi qua lại bằng JSON
export async function saveJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ghi lỗi thì bỏ qua, app vẫn chạy bình thường
  }
}

// Không có dữ liệu hoặc dữ liệu hỏng thì trả về null
export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // bỏ qua
  }
}
