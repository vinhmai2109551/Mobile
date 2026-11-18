import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { getErrorMessage } from "../api/client";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import type { RootScreenProps } from "../navigation/types";
import { getBooks } from "../services/bookService";
import { useWishlist } from "../store/hooks";
import type { Book } from "../types";

export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Giống Home: gọi API với 3 trạng thái loading / lỗi / có dữ liệu
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBooks(await getBooks());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Không lưu bản sao sách: lấy tất cả từ API rồi lọc theo id trong store.
  // Bỏ tim thì ids đổi, cuốn đó tự biến mất khỏi danh sách.
  const favorites = useMemo(() => books.filter((b) => ids.includes(b.id)), [books, ids]);

  if (loading) return <LoadingView label="Đang tải…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      <BookGrid
        data={favorites}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState
            emoji="💔"
            title="Chưa có sách yêu thích"
            message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
            actionLabel="Khám phá sách"
            onAction={() => navigation.popTo("Tabs", { screen: "Home" })}
          />
        }
      />
    </View>
  );
}
