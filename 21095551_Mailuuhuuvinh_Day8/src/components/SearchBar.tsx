import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
}

// Ô tìm kiếm hiện thay cho tiêu đề header, có nút Đóng bên phải
export function SearchBar({ value, onChangeText, onClose }: Props) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm theo tên sách hoặc tác giả…"
        placeholderTextColor={colors.muted}
        autoFocus
        autoCorrect={false}
        returnKeyType="search"
      />
      <Pressable onPress={onClose} hitSlop={8}>
        <Text style={styles.close}>Đóng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    color: colors.text,
    fontSize: 14,
    outlineWidth: 0, // bỏ viền focus mặc định của trình duyệt khi chạy bản web
  },
  close: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
