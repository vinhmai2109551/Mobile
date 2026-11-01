import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { EmptyState } from "../components/EmptyState";
import type { TabScreenProps } from "../navigation/types";
import { useCart } from "../store/hooks";
import { colors, RADIUS } from "../theme";
import { formatPrice } from "../utils/format";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const empty = items.length === 0;

  return (
    <View style={styles.root}>
      <AppHeader title="🛒 Giỏ hàng" />

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
            {/* bấm − khi còn 1 cuốn thì bỏ sách khỏi giỏ; + bị chặn ở mức stock */}
            <View style={styles.stepper}>
              <Pressable
                style={styles.stepBtn}
                onPress={() => (item.quantity > 1 ? setQty(item.bookId, item.quantity - 1) : remove(item.bookId))}
              >
                <Text style={styles.stepText}>−</Text>
              </Pressable>
              <Text style={styles.qty}>x{item.quantity}</Text>
              <Pressable
                style={[styles.stepBtn, item.quantity >= item.stock && styles.stepDisabled]}
                onPress={() => setQty(item.bookId, item.quantity + 1)}
              >
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy thêm vài cuốn sách vào giỏ nhé."
            actionLabel="Xem sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Tổng cộng: {formatPrice(totalPrice)}</Text>
        <Pressable
          disabled={empty}
          style={[styles.button, empty && styles.buttonDisabled]}
          onPress={() => navigation.navigate("Checkout", { total: totalPrice })} // gửi tổng tiền sang Thanh toán
        >
          <Text style={styles.buttonText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 10, flexGrow: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
  },
  thumb: { width: 44, height: 44, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  thumbEmoji: { fontSize: 22 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 13, fontWeight: "700", color: colors.text },
  price: { fontSize: 12, fontWeight: "700", color: colors.indigo },
  stepper: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDisabled: { opacity: 0.35 },
  stepText: { fontSize: 16, fontWeight: "700", color: colors.indigo, lineHeight: 20 },
  qty: { fontSize: 13, fontWeight: "700", color: colors.text, minWidth: 24, textAlign: "center" },
  footer: {
    backgroundColor: colors.bg,
    padding: 16,
    gap: 10,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
  },
  total: { fontSize: 14, fontWeight: "800", color: colors.text },
  button: { backgroundColor: colors.indigo, borderRadius: 12, paddingVertical: 13, alignItems: "center" },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
