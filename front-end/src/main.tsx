import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { setupAxiosInterceptors } from "./store/api/axiosInstance";
import { PostsProvider } from "./contexts/PostsContext";
import App from "./App.tsx";

setupAxiosInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PostsProvider>
          <App />
        </PostsProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
