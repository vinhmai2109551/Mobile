// Tab "Products": bấm 1 sản phẩm -> navigate sang ProductDetails kèm id
import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import { TabProps } from "./types";

function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
    </Pressable>
  );
}

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
    />
  );
}

const s = StyleSheet.create({
  row: { padding: 14, borderRadius: 8, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, gap: 4 },
  name: { fontSize: 14, fontWeight: "600", color: colors.text },
  price: { fontSize: 13, color: colors.red, fontWeight: "700" },
});
