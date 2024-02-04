import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./toggletheme";
import refreshsidebar from "./sidebarrefresh";
import shrinksbar from "./shrink";

export const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshsidebar,
    shrinkKey: shrinksbar,
  },
});