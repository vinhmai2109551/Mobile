// Màn chờ dùng chung khi đang gọi API (Bài 2)
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#fff" },
  text: { color: colors.muted, fontSize: 14 },
});
