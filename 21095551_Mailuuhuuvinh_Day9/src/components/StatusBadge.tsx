import { StyleSheet, Text } from "react-native";
import type { OrderStatus } from "../types";
import { colors } from "../theme";

const labels: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận", shipping: "Đang giao", completed: "Hoàn tất", cancelled: "Đã huỷ",
};
const tones: Record<OrderStatus, { bg: string; fg: string }> = {
  pending: { bg: "#FEF3C7", fg: "#92400E" }, shipping: { bg: "#DBEAFE", fg: "#1D4ED8" },
  completed: { bg: "#DCFCE7", fg: "#166534" }, cancelled: { bg: "#FEE2E2", fg: colors.danger },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <Text style={[styles.badge, { backgroundColor: tones[status].bg, color: tones[status].fg }]}>{labels[status]}</Text>;
}

const styles = StyleSheet.create({ badge: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, fontWeight: "700" } });
