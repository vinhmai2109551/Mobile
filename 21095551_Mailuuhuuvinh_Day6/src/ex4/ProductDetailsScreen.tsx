// Nhận id qua route.params, tìm sản phẩm, cho bấm Lưu/Bỏ yêu thích
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS, safeColor } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <View style={s.center}>
        <Text style={s.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  return (
    <ScrollView contentContainerStyle={s.root}>
      <Image source={PHONE_COLORS[safeColor(phone.defaultColor)].image} style={s.image} resizeMode="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.supplier}>Cung cấp bởi {phone.supplier}</Text>

      <Pressable style={[s.favBtn, saved && s.favBtnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[s.favBtnText, saved && s.favBtnTextOn]}>{saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { padding: 16, alignItems: "center", gap: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { color: colors.muted },
  image: { width: 220, height: 220, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: "700", color: colors.text, textAlign: "center" },
  price: { fontSize: 20, fontWeight: "700", color: colors.red },
  supplier: { fontSize: 13, color: colors.muted },
  favBtn: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
  },
  favBtnOn: { backgroundColor: colors.red },
  favBtnText: { color: colors.red, fontWeight: "700" },
  favBtnTextOn: { color: "#fff" },
});
