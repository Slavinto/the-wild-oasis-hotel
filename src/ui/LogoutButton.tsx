import { useLogoutUser } from "@/features/authentication/useLogoutUser";
import { ButtonVariations } from "@/types/enums";
import { Button } from "@/ui";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { useGlobalSpinner } from "./globalSpinner/useGlobalSpinner";

const LogoutButton = () => {
    const { logout, isLoading } = useLogoutUser();

    useGlobalSpinner(isLoading);
    const handleClickLogout = () => {
        logout();
    };

    return (
        <Button
            onClick={handleClickLogout}
            disabled={isLoading}
            $variation={ButtonVariations.Secondary}
            $customstyles={{
                width: "4rem",
                height: "4rem",
                padding: "0",
                // borderRadius: "",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <HiOutlineArrowRightStartOnRectangle size={25} />
        </Button>
    );
};

export default LogoutButton;
