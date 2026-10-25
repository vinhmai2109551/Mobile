import React from "react";
import { Text } from "react-native";
import { colors } from "../theme";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  // dữ liệu từ API có thể ngoài khoảng 0-5 -> ép về đúng khoảng trước khi repeat()
  // (repeat() với số âm sẽ ném lỗi RangeError, làm crash app)
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {"★".repeat(full)}
      <Text style={{ color: colors.line }}>{"★".repeat(5 - full)}</Text>
    </Text>
  );
}
