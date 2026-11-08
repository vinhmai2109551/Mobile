import { Platform } from "react-native";

// Android emulator gọi máy tính qua 10.0.2.2, các nền tảng khác dùng localhost
const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";

// Điện thoại thật: đặt EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000 rồi chạy lại expo
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? `http://${host}:3000`).replace(/\/$/, "");
