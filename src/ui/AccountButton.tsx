import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { headerButtonStyles } from "@/types/constants";
import { ButtonVariations } from "@/types/enums";
import { HiOutlineUser } from "react-icons/hi2";

const AccountButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAccountRoute = location.pathname === "/account";

    return (
        <Button
            disabled={isAccountRoute}
            onClick={() => {
                navigate("/account");
            }}
            $customstyles={headerButtonStyles}
            $variation={ButtonVariations.Secondary}
        >
            <HiOutlineUser
                size={20}
                color={
                    isAccountRoute
                        ? "var(--color-brand-600)"
                        : "var(--color-grey-400)"
                }
            />
        </Button>
    );
};

export default AccountButton;
