// Màn hình tạm cho tab "Danh mục" và "Tài khoản" — không nằm trong yêu cầu layout của đề,
// chỉ dựng để 4 mục trong TabBar đều bấm chuyển được, tránh màn trắng.
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "#6B7280" },
});
