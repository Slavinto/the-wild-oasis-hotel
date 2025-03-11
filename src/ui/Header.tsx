import { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
`;

interface HeaderProps {
    placeholder?: string;
    children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
    return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
