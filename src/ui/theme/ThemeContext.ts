import { IThemeContext } from "@/types/interfaces";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<IThemeContext>({ isDark: false });

export const useThemeContext = () => useContext(ThemeContext);
