import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { colors } from "../theme";
import type { CartItem } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // Số lượng giữ ở state cục bộ để nút phản hồi ngay, rồi "lắng" 300ms mới ghi vào store
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // Chỉ phụ thuộc debouncedQty: nếu thêm item.quantity thì khi store đổi từ nơi khác,
  // debouncedQty còn giữ số cũ sẽ bị ghi đè ngược lên store
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQty]);

  // Store đổi từ nơi khác (nạp giỏ đã lưu, thêm từ trang chi tiết) thì đồng bộ lại số trên nút
  useEffect(() => { setQty(item.quantity); }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock; // không vượt tồn kho

  return (
    <View style={styles.row}>
      <View style={[styles.thumb, { backgroundColor: item.color }]}>
        <Text style={styles.thumbEmoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.stepper}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            accessibilityLabel="Giảm"
            style={[styles.stepBtn, !canDec && styles.stepOff]}
          >
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            accessibilityLabel="Tăng"
            style={[styles.stepBtn, !canInc && styles.stepOff]}
          >
            <Text style={styles.stepText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>

      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
  },
  thumb: { width: 48, height: 48, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  thumbEmoji: { fontSize: 24 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 13, fontWeight: "700", color: colors.text },
  price: { fontSize: 12, fontWeight: "700", color: colors.indigo },
  stepper: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  stepOff: { opacity: 0.35 },
  stepText: { fontSize: 16, fontWeight: "700", color: colors.indigo, lineHeight: 20 },
  qty: { fontSize: 13, fontWeight: "700", color: colors.text, minWidth: 20, textAlign: "center" },
  stock: { fontSize: 11, color: colors.muted },
  trash: { fontSize: 18 },
});
