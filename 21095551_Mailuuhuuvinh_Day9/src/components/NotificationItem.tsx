import { Pressable, StyleSheet, Text, View } from "react-native";
import type { AppNotification } from "../types";
import { colors } from "../theme";
import { formatDateTime } from "../utils/format";

export function NotificationItem({ item, onPress }: { item: AppNotification; onPress: (item: AppNotification) => void }) {
  return (
    <Pressable onPress={() => onPress(item)} style={[styles.card, !item.read && styles.unread]}>
      <View style={styles.top}>
        <Text style={styles.title}>{item.title}</Text>
        {!item.read && <View style={styles.dot} />}
      </View>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 5, borderWidth: 1, borderColor: colors.border },
  unread: { backgroundColor: "#E0F2FE" },
  top: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: "800", color: colors.text },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger },
  body: { fontSize: 12, color: colors.text },
  time: { fontSize: 11, color: colors.muted },
});
