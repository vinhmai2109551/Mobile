import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export interface TabItem { key: string; label: string; emoji: string; badge?: number; }
interface Props { items: TabItem[]; activeKey: string; onPress: (key: string) => void; }

// TabBar chưa biết gì về thư viện điều hướng — chỉ vẽ items và báo onPress(key)
export function TabBar({ items, activeKey, onPress }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable key={item.key} style={styles.tab} onPress={() => onPress(item.key)}>
            <View>
              <Text style={[styles.emoji, !active && styles.emojiInactive]}>{item.emoji}</Text>
              {/* badge đỏ chỉ hiện khi có số > 0 */}
              {!!item.badge && item.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge > 99 ? "99+" : item.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: "center", gap: 2 },
  emoji: { fontSize: 22 },
  emojiInactive: { opacity: 0.5 },
  label: { fontSize: 11, color: colors.muted },
  labelActive: { color: colors.indigo, fontWeight: "700" },
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
