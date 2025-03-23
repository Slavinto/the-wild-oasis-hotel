import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [isOn, setIsOn] = useState<string | null>(
        localStorage.getItem("isDarkModeActive")
    );

    // a condition when dark mode is not on
    const isNotOn = isOn === "false" || isOn === null;
    const htmlElClassList = document.documentElement.classList;

    useEffect(() => {
        if (isNotOn && htmlElClassList.contains("dark")) {
            htmlElClassList.remove("dark");
        } else if (isOn === "true" && !htmlElClassList.contains("dark")) {
            htmlElClassList.add("dark");
        }
    }, [htmlElClassList, isNotOn, isOn]);

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
