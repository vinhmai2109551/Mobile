// Tab "Favorites": lọc PHONES theo ids đã lưu trong FavoritesContext
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favoritePhones = PHONES.filter((p) => ids.includes(p.id));

  if (favoritePhones.length === 0) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritePhones}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <Pressable style={s.row} onPress={() => navigation.navigate("ProductDetails", { id: item.id })}>
          <Text style={s.name}>{item.name.split(" - ")[0]}</Text>
          <Text style={s.price}>{formatPrice(item.price)}</Text>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  empty: { color: colors.muted, textAlign: "center" },
  row: { padding: 14, borderRadius: 8, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, gap: 4 },
  name: { fontSize: 14, fontWeight: "600", color: colors.text },
  price: { fontSize: 13, color: colors.red, fontWeight: "700" },
});
