// Bài 1 — Screen 02/03: chọn màu rồi bấm XONG để quay lại Product với màu mới
import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS, safeColor } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? safeColor(phone.defaultColor)].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* chỉ hiện 3 dòng này SAU KHI đã chọn 1 màu */}
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.small, styles.bold]}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>

        {/* React Navigation tự merge params khi navigate về màn đã có sẵn trong stack (Product) */}
        <Pressable style={styles.doneBtn} onPress={() => navigation.navigate("Product", { color: picked })}>
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, gap: 12, alignItems: "flex-start" },
  thumb: { width: 72, height: 72 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 13, color: colors.text },
  bold: { fontWeight: "700" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 13, color: colors.muted, marginBottom: 12 },
  swatches: { gap: 12, alignItems: "center" }, // không set flexDirection:'row' -> 4 ô màu xếp dọc, căn giữa như thiết kế
  swatch: { width: 86, height: 80, borderWidth: 2, borderColor: "transparent" },
  swatchOn: { borderColor: colors.navy },
  doneBtn: {
    marginTop: 20,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
