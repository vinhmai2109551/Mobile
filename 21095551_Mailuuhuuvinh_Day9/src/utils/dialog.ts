import { Alert, Platform } from "react-native";

// Hỏi xác nhận rồi mới chạy onConfirm.
// Alert.alert không chạy trên bản web nên web dùng window.confirm.
export function confirmDialog(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: "Hủy", style: "cancel" },
    { text: "Xóa", style: "destructive", onPress: onConfirm },
  ]);
}

export function showMessage(title: string, message: string, onOk?: () => void) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
    onOk?.();
    return;
  }
  Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
}
