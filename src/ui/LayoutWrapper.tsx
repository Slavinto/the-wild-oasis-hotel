import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLayoutWrapper = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100dvh;
`;

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <StyledLayoutWrapper>{children}</StyledLayoutWrapper>;
};

export default LayoutWrapper;
