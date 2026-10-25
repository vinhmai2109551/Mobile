// Bài 1 — Screen 01/04: xem sản phẩm, bấm vào nút màu để sang ChooseColor
import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PHONE_COLORS, safeColor } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? safeColor(phone.defaultColor);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.infoDot}>
            <Text style={styles.infoDotText}>?</Text>
          </View>
        </View>

        {/* nút viền xám, bo góc 6; chữ đổi theo đã chọn màu hay chưa; dấu ">" sát lề phải */}
        <Pressable style={styles.chooseBtn} onPress={() => navigation.navigate("ChooseColor", { color: picked })}>
          <Text style={styles.chooseBtnText}>4 MÀU-{picked ? "CHỌN LOẠI" : "CHỌN MÀU"}</Text>
          <Text style={styles.chooseBtnArrow}>{">"}</Text>
        </Pressable>
      </View>

      {/* nút CHỌN MUA nằm NGOÀI khối info, sát đáy màn hình (nhờ imageWrap có flex:1 đẩy nó xuống) */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "80%", height: "80%" },
  info: { gap: 8, paddingBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text },
  review: { fontSize: 12, color: colors.muted },
  price: { fontSize: 20, fontWeight: "700", color: "#000" },
  oldPrice: { fontSize: 13, color: colors.muted, textDecorationLine: "line-through" },
  badge: { fontSize: 12, color: colors.red, fontWeight: "700" },
  infoDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  infoDotText: { fontSize: 10, color: colors.muted },
  chooseBtn: {
    marginTop: 4,
    height: 44,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  chooseBtnText: { fontSize: 13, fontWeight: "600", color: colors.text },
  chooseBtnArrow: { position: "absolute", right: 12, fontSize: 16, color: colors.muted },
  buyBtn: {
    height: 48,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
