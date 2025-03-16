import styled from "styled-components";
import LogoutButton from "./LogoutButton";
import AccountButton from "./AccountButton";
import UserAvatar from "@/features/authentication/UserAvatar";
const StyledList = styled.ul`
    display: flex;
    gap: 0.4rem;
    align-items: center;
`;

const StyledListItem = styled.li`
    /* max-width: 3rem; */
    max-height: 3rem;
`;

const HeaderMenu = () => {
    return (
        <StyledList>
            <StyledListItem style={{ marginRight: "1rem" }}>
                <UserAvatar />
            </StyledListItem>
            <StyledListItem>
                <AccountButton />
            </StyledListItem>
            <StyledListItem>
                <LogoutButton />
            </StyledListItem>
        </StyledList>
    );
};

export default HeaderMenu;
