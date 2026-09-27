// GIỜ 5 — Bài tập 1: Thanh Tab Bar dưới cùng (giao diện tĩnh)
// Kỹ thuật: container flexDirection 'row', mỗi mục flex:1 để chia đều 4 phần bằng nhau,
// mỗi mục flexDirection 'column' + alignItems/justifyContent 'center' để icon trên - chữ dưới.
// Đặt TabBar là 1 View bình thường (KHÔNG absolute) nằm cùng cấp, phía dưới vùng nội dung
// -> nội dung tự động không bị che, không cần tính paddingBottom thủ công.
// (Cách 2 - dùng position:'absolute' - phù hợp khi muốn nội dung tràn full màn hình phía
// sau tab bar mờ/trong suốt, nhưng khi đó phải tự chừa paddingBottom cho nội dung bên trên.)
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export type TabKey = "home" | "category" | "cart" | "account";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "home", label: "Trang chủ", icon: "🏠" },
  { key: "category", label: "Danh mục", icon: "📚" },
  { key: "cart", label: "Giỏ hàng", icon: "🛒" },
  { key: "account", label: "Tài khoản", icon: "👤" },
];

export function TabBar({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) {
  return (
    <View style={styles.bar}>
      {/* Lặp qua 4 mục cố định, mục nào trùng với "active" thì tô màu nổi bật */}
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable key={tab.key} style={styles.item} onPress={() => onChange(tab.key)}>
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Text style={styles.icon}>{tab.icon}</Text>
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row", // 4 mục nằm ngang
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingBottom: 10,
  },
  item: {
    flex: 1, // chia đều 4 phần bằng nhau
    flexDirection: "column", // icon trên, chữ dưới
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  iconWrap: {
    width: 32,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  iconWrapActive: {
    backgroundColor: "#E0E7FF", // nền nổi bật cho mục đang chọn
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
  },
  labelActive: {
    color: "#4338CA", // màu nổi bật cho mục đang chọn
    fontWeight: "700",
  },
});
