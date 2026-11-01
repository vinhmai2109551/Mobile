import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { AppHeader } from "../components/AppHeader";
import { BookGrid } from "../components/BookGrid";
import { CategoryChips } from "../components/CategoryChips";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { LoadingView } from "../components/LoadingView";
import { PriceFilter } from "../components/PriceFilter";
import { SearchBar } from "../components/SearchBar";
import { SortBar, type SortOrder } from "../components/SortBar";
import { useDebounce } from "../hooks/useDebounce";
import type { TabScreenProps } from "../navigation/types";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { useCart } from "../store/hooks";
import { colors } from "../theme";
import type { Book, Category } from "../types";
import { filterBooks, type PriceRange } from "../utils/filters";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  // dữ liệu từ API + 3 trạng thái: đang tải / lỗi / có dữ liệu
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // các điều kiện lọc và sắp xếp
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<SortOrder>(null);

  const { totalQuantity } = useCart();

  // Hai API độc lập nên gọi song song bằng Promise.all
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Tab Danh mục gửi categoryId sang: chọn chip rồi xoá params để lần sau không bị áp lại
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // Chỉ lọc sau khi ngừng gõ 400ms; xoá hết chữ thì cập nhật ngay cho đỡ trễ
  const debouncedKeyword = useDebounce(keyword, 400);
  const effectiveKeyword = keyword === "" ? "" : debouncedKeyword;

  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: effectiveKeyword, categoryId, priceRange });
    if (sort === null) return filtered;
    // sắp xếp trên bản sao để không làm đổi mảng books gốc
    return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [books, effectiveKeyword, categoryId, priceRange, sort]);

  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };
  const closeSearch = () => {
    setSearching(false);
    setKeyword("");
  };

  const filters = (
    <View style={styles.filters}>
      <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      <PriceFilter value={priceRange} onChange={setPriceRange} />
      <SortBar value={sort} onChange={setSort} />
      {hasFilter && (
        <Pressable style={styles.clearBtn} onPress={clearFilters}>
          <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
        </Pressable>
      )}
    </View>
  );

  // Không có kết quả: nếu đang lọc thì gợi ý xoá bộ lọc, còn không thì kho đang trống
  const empty = hasFilter ? (
    <EmptyState
      emoji="🔎"
      title="Không tìm thấy sách phù hợp"
      message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
      actionLabel="Xóa bộ lọc"
      onAction={clearFilters}
    />
  ) : (
    <EmptyState emoji="📭" title="Chưa có sách nào" />
  );

  return (
    <View style={styles.root}>
      {searching ? (
        <AppHeader>
          <SearchBar value={keyword} onChangeText={setKeyword} onClose={closeSearch} />
        </AppHeader>
      ) : (
        <AppHeader title="📚 BookStore">
          <Pressable style={styles.searchBtn} onPress={() => setSearching(true)}>
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        </AppHeader>
      )}

      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={filters}
          ListEmptyComponent={empty}
        />
      )}

      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: { fontSize: 16 },
  filters: { paddingVertical: 12, gap: 10 },
  clearBtn: {
    alignSelf: "flex-start",
    marginLeft: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.dangerBg,
  },
  clearText: { fontSize: 12, fontWeight: "700", color: colors.danger },
});
