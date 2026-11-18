import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props { label: string; hint?: string; selected: boolean; onPress: () => void; }

export function PaymentOption({ label, hint, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <View style={[styles.radio, selected && styles.radioSelected]} />
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.card },
  selected: { borderColor: colors.indigo, borderWidth: 2 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.muted },
  radioSelected: { borderColor: colors.indigo, backgroundColor: colors.indigo },
  copy: { flex: 1, gap: 2 },
  label: { fontSize: 13, fontWeight: "700", color: colors.text },
  hint: { fontSize: 11, color: colors.muted },
});
