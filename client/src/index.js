import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 引入 Context Providers
import { LoginContextProvider } from './context/LoginContext';
import { OptionsContextProvider } from './context/OptionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OptionsContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </OptionsContextProvider>
  </React.StrictMode>
);

// React.StrictMode：一個幫助發現潛在問題的工具，會額外執行一些檢查和警告，但不會影響生產環境。
// OptionsContextProvider 和 LoginContextProvider：將這些 Context Provider 組件包裹在 App 組件外部，使得 App 和其子組件可以訪問這些 Context 提供的數據和方法。

