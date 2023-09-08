"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";
import AuthPages from "@/components/AuthPages";


export function Providers({ children }) {

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navbar />
        <AuthPages>
        
        {children}
        </AuthPages>
        
      </PersistGate>
    </Provider>
  );
}
