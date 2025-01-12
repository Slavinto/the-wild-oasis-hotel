import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    max-width: 100rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

interface StyledContainerProps {
    tmp?: string;
}

const ContentContainer: FC<PropsWithChildren<StyledContainerProps>> = ({
    children,
}) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default ContentContainer;
