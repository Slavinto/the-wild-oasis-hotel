import styled from "styled-components";
import { Logo, MainNav } from "@/ui";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    border: solid silver 1px;
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
`;

const Sidebar = () => {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
        </StyledSidebar>
    );
};

export default Sidebar;
