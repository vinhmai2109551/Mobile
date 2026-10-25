// Menu chọn bài 1 -> 5. Mỗi bài tự có NavigationContainer riêng, App.tsx chỉ
// hiển thị MỘT bài tại 1 thời điểm (không bao giờ lồng 2 NavigationContainer cùng lúc).
import React, { useState } from "react";
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { PHONES } from "./src/data/phones";
import { colors } from "./src/theme";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

type LabKey = "menu" | "ex1" | "ex2" | "ex3" | "ex4" | "ex5";

const ITEMS: { key: LabKey; label: string }[] = [
  { key: "ex1", label: "Bài 1 — Select Phone (Stack)" },
  { key: "ex2", label: "Bài 2 — Select Phone + API" },
  { key: "ex3", label: "Bài 3 — Bottom Tab" },
  { key: "ex4", label: "Bài 4 — Stack + Tab + Params" },
  { key: "ex5", label: "Bài 5 — Drawer" },
];

function renderLab(key: LabKey) {
  switch (key) {
    case "ex1":
      return <SelectPhoneApp phone={PHONES[0]} />;
    case "ex2":
      return <SelectPhoneApi />;
    case "ex3":
      return <BottomTabApp />;
    case "ex4":
      return <StackTabApp />;
    case "ex5":
      return <DrawerApp />;
    default:
      return null;
  }
}

export default function App() {
  const [active, setActive] = useState<LabKey>("menu");

  if (active === "menu") {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Lab 06 — Navigation</Text>
        <Text style={styles.subtitle}>Chọn 1 bài để xem</Text>
        {ITEMS.map((item) => (
          <Pressable key={item.key} style={styles.item} onPress={() => setActive(item.key)}>
            <Text style={styles.itemText}>{item.label}</Text>
          </Pressable>
        ))}
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderLab(active)}
      {/* nút nổi quay lại menu, đặt góc trên-phải để không che tab bar / nút CHỌN MUA / nút drawer */}
      <Pressable style={styles.backFab} onPress={() => setActive("menu")}>
        <Text style={styles.backFabText}>‹ Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: "700", color: colors.text },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 8 },
  item: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.bg },
  itemText: { fontSize: 15, fontWeight: "600", color: colors.navy },
  backFab: {
    position: "absolute",
    right: 12,
    top: (StatusBar.currentHeight ?? 44) + 6,
    backgroundColor: colors.navy,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backFabText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
