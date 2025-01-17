import { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const StyledContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "maxWidth",
})<StyledContainerProps>`
    ${(props) =>
        css`
            max-width: ${props.maxWidth};
        `}
    /* max-width: 100rem; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

interface StyledContainerProps {
    maxWidth?: string;
}

const ContentContainer: FC<PropsWithChildren<StyledContainerProps>> = ({
    children,
    maxWidth = "100rem",
}) => {
    return <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>;
};

export default ContentContainer;
