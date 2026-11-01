import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent gọi AppRegistry.registerComponent('main', () => App)
// nên app chạy được cả trong Expo Go lẫn bản build thật
registerRootComponent(App);
