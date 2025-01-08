import { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const StyledMain = styled.main`
    padding: 4rem 4.8rem 6.4rem;
    background-color: var(--color-grey-50);

    ${css``}
`;
interface MainProps {
    temp?: string;
}

const Main: FC<PropsWithChildren<MainProps>> = ({ children }) => {
    return <StyledMain>{children}</StyledMain>;
};

export default Main;
