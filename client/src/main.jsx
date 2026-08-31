import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import router from "./router.jsx";
import {WebSocketProvider} from "./context/WebSocketProvider.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </Provider>
  </StrictMode>,
);
