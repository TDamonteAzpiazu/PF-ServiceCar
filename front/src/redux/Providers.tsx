'use client'
import React from "react";
import { Provider } from "react-redux";
import store from "./store"; 

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
