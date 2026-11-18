import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { StatusBadge } from "../components/StatusBadge";
import type { RootScreenProps } from "../navigation/types";
import { getOrdersByUser } from "../services/orderService";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import type { Order, OrderStatus } from "../types";
import { formatDateTime, formatPrice } from "../utils/format";

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true); setError(null);
    try { setOrders((await getOrdersByUser(user.id)).sort((a, b) => b.createdAt.localeCompare(a.createdAt))); }
    catch (e) { setError(getErrorMessage(e)); } finally { setLoading(false); }
  }, [user]);
  useEffect(() => { load(); }, [load]);
  if (loading) return <LoadingView label="Đang tải đơn hàng…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;
  const visibleOrders = status === "all" ? orders : orders.filter((order) => order.status === status);
  const filters: Array<{ key: OrderStatus | "all"; label: string }> = [
    { key: "all", label: "Tất cả" }, { key: "pending", label: "Chờ xác nhận" },
    { key: "shipping", label: "Đang giao" }, { key: "completed", label: "Hoàn tất" }, { key: "cancelled", label: "Đã huỷ" },
  ];
  return (
    <FlatList
      data={visibleOrders} keyExtractor={(o) => String(o.id)} contentContainerStyle={styles.list}
      ListHeaderComponent={<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter) => <Pressable key={filter.key} onPress={() => setStatus(filter.key)} style={[styles.filter, status === filter.key && styles.filterActive]}><Text style={[styles.filterText, status === filter.key && styles.filterTextActive]}>{filter.label}</Text></Pressable>)}
      </ScrollView>}
      ListEmptyComponent={<EmptyState emoji="🧾" title="Bạn chưa có đơn hàng nào" actionLabel="Mua sắm ngay" onAction={() => navigation.navigate("Tabs", { screen: "Home" })} />}
      renderItem={({ item: o }) => {
        const open = openId === o.id;
        return <View style={styles.card}>
          <Pressable onPress={() => setOpenId(open ? null : o.id)} style={styles.summary}>
            <View style={styles.copy}><Text style={styles.title}>Đơn #{o.id}</Text><Text style={styles.muted}>{formatDateTime(o.createdAt)}</Text></View>
            <View style={styles.right}><Text style={styles.total}>{formatPrice(o.total)}</Text><StatusBadge status={o.status} /></View>
          </Pressable>
          <Text style={styles.detailButton} onPress={() => setOpenId(open ? null : o.id)}>Chi tiết {open ? "▲" : "▼"}</Text>
          {open && <View style={styles.details}>
            {o.items.map((item) => <Text key={item.bookId} style={styles.detail}>{item.title} × {item.quantity} · {formatPrice(item.price)}</Text>)}
            <Text style={styles.detail}>Giao tới: {o.address.name}, {o.address.phone}, {o.address.address}</Text>
            <Text style={styles.detail}>Thanh toán: {o.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}</Text>
          </View>}
        </View>;
      }}
    />
  );
}
const styles = StyleSheet.create({
  list: { padding: 16, gap: 10, flexGrow: 1, backgroundColor: colors.bg },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 14, gap: 8 },
  summary: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  copy: { flex: 1, gap: 4 }, title: { fontWeight: "800", color: colors.text }, muted: { fontSize: 11, color: colors.muted },
  right: { alignItems: "flex-end", gap: 6 }, total: { fontWeight: "800", color: colors.indigo },
  detailButton: { color: colors.indigo, fontSize: 12, fontWeight: "700" }, details: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, gap: 5 }, detail: { fontSize: 12, color: colors.text },
  filters: { gap: 8, paddingBottom: 4 }, filter: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }, filterActive: { backgroundColor: colors.indigo, borderColor: colors.indigo }, filterText: { fontSize: 11, color: colors.muted }, filterTextActive: { color: "#fff", fontWeight: "700" },
});
