import styled from "styled-components";
import LogoutButton from "./LogoutButton";
import AccountButton from "./AccountButton";
import UserAvatar from "@/features/authentication/UserAvatar";
import DarkModeToggle from "./DarkModeToggle";
const StyledList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 1 25rem;
    gap: 2.4rem;
    margin-left: auto;
`;

const StyledListItem = styled.li`
    /* max-width: 3rem; */
    max-height: 3rem;
    display: flex;
    gap: 1.5rem;
`;

const HeaderMenu = () => {
    return (
        <StyledList>
            <StyledListItem>
                <AccountButton>
                    <UserAvatar />
                </AccountButton>
            </StyledListItem>
            <StyledListItem>
                <DarkModeToggle />
                <LogoutButton />
            </StyledListItem>
        </StyledList>
    );
};

export default HeaderMenu;
