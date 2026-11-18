import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { AppHeader } from "../components/AppHeader";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import type { TabScreenProps } from "../navigation/types";
import { getCategories } from "../services/categoryService";
import { colors } from "../theme";
import type { Category } from "../types";

export function CategoriesScreen({ navigation }: TabScreenProps<"Categories">) {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Giống Home nhưng chỉ gọi một API
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getCategories());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={styles.root}>
      <AppHeader title="🗂️ Danh mục" />

      {loading ? (
        <LoadingView label="Đang tải danh mục…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            // bấm một danh mục: sang tab Home kèm categoryId để Home chọn sẵn chip đó
            <Pressable style={styles.row} onPress={() => navigation.navigate("Home", { categoryId: item.id })}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  emoji: { fontSize: 20 },
  name: { flex: 1, fontSize: 14, fontWeight: "700", color: colors.text },
  arrow: { fontSize: 20, color: colors.muted },
});
