import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";
import { store, persistor } from "@/store";
import { Provider } from "react-redux";

import AppRouter from "@/routes/AppRouter";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/services/axios-default.service";
import "@/styles/global.styles.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
