import { useLogoutUser } from "@/features/authentication/useLogoutUser";
import { ButtonVariations } from "@/types/enums";
import { Button } from "@/ui";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { useGlobalSpinner } from "./globalSpinner/useGlobalSpinner";
import { headerButtonStyles } from "@/types/constants";

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
            $customstyles={headerButtonStyles}
        >
            <HiOutlineArrowRightStartOnRectangle
                size={20}
                color={"var(--color-grey-400)"}
            />
        </Button>
    );
};

export default LogoutButton;
