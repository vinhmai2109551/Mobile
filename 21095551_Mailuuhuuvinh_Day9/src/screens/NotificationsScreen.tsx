import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getErrorMessage } from "../api/client";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { NotificationItem } from "../components/NotificationItem";
import type { RootScreenProps } from "../navigation/types";
import { getNotifications, markAsRead } from "../services/notificationService";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import type { AppNotification } from "../types";

export function NotificationsScreen({ navigation }: RootScreenProps<"Notifications">) {
  const { user } = useAuth();
  const [data, setData] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true); setError(null);
    try { setData(await getNotifications(user.id)); } catch (e) { setError(getErrorMessage(e)); } finally { setLoading(false); }
  }, [user]);
  useEffect(() => { load(); }, [load]);
  const open = async (item: AppNotification) => {
    if (!item.read) {
      setData((prev) => prev.map((n) => n.id === item.id ? { ...n, read: true } : n));
      try { await markAsRead(item.id); } catch { setData((prev) => prev.map((n) => n.id === item.id ? { ...n, read: false } : n)); }
    }
    if (item.target?.screen === "Orders") navigation.navigate("Orders");
    else if (item.target?.screen === "BookDetail" && item.target.bookId) navigation.navigate("BookDetail", { bookId: item.target.bookId });
  };
  if (loading) return <LoadingView label="Đang tải thông báo…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;
  return <FlatList data={data} keyExtractor={(n) => String(n.id)} contentContainerStyle={styles.list} renderItem={({ item }) => <NotificationItem item={item} onPress={open} />} ListEmptyComponent={<EmptyState emoji="🔔" title="Chưa có thông báo nào" />} />;
}
const styles = StyleSheet.create({ list: { padding: 16, gap: 10, flexGrow: 1, backgroundColor: colors.bg } });
