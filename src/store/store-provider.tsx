"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "./index";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => createStore());

  return <Provider store={store}>{children}</Provider>;
};
