import { ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const Theme = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    const setTheme = (arg: boolean) => setIsDark(arg);

    return (
        <ThemeContext.Provider value={{ isDark, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default Theme;
