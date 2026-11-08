import type { ReactElement } from "react";
import { FlatList, StyleSheet } from "react-native";
import type { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook: (book: Book) => void;
  ListHeaderComponent?: ReactElement;
  ListEmptyComponent?: ReactElement;
}

// Lưới 2 cột; thẻ rộng 48% + space-between nên cuốn lẻ cuối vẫn nằm bên trái
export function BookGrid({ data, onPressBook, ListHeaderComponent, ListEmptyComponent }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(b) => String(b.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => <BookCard book={item} onPress={() => onPressBook(item)} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      keyboardShouldPersistTaps="handled" // bấm chip khi đang mở bàn phím vẫn ăn ngay
    />
  );
}

const styles = StyleSheet.create({
  row: { justifyContent: "space-between", paddingHorizontal: 16 },
  content: { paddingBottom: 90 }, // chừa chỗ cho nút giỏ nổi
});
