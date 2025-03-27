import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useEffect, useState } from "react";
import { useThemeContext } from "./theme/ThemeContext";

const DarkModeToggle = () => {
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "true"
        : "false";
    const customDarkMode = localStorage.getItem("isDarkModeActive");
    const [isOn, setIsOn] = useState<string | null>(
        customDarkMode ?? systemDarkMode
    );
    const { setTheme } = useThemeContext();

    // a condition when dark mode is not on
    const isNotOn = isOn === "false" || isOn === null;
    const htmlElClassList = document.documentElement.classList;

    useEffect(() => {
        if (isNotOn && htmlElClassList.contains("dark")) {
            htmlElClassList.remove("dark");
            setTheme?.(false);
        } else if (isOn === "true" && !htmlElClassList.contains("dark")) {
            htmlElClassList.add("dark");
            setTheme?.(true);
        }
    }, [htmlElClassList, isNotOn, isOn, setTheme]);

    const handleToggleDark = () => {
        localStorage.setItem("isDarkModeActive", isNotOn ? "true" : "false");

        setIsOn(isNotOn ? "true" : "false");
    };

    return (
        <ButtonIcon onClick={handleToggleDark}>
            {isOn === "true" ? (
                <HiOutlineSun color='var(--color-grey-400)' size={25} />
            ) : (
                <HiOutlineMoon color='var(--color-grey-400)' size={25} />
            )}
        </ButtonIcon>
    );
};

export default DarkModeToggle;
