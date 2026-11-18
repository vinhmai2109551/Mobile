import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { LoadingView } from "./src/components/LoadingView";
import { usePersistence } from "./src/hooks/usePersistence";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store";

// usePersistence cần dùng store nên phải nằm trong Provider => tách ra component Root
function Root() {
  const ready = usePersistence(); // false cho tới khi đọc xong AsyncStorage
  if (!ready) return <LoadingView label="Đang khởi động…" />;
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}

// Provider (Redux) bọc ngoài cùng để mọi màn đều đọc được store
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}
