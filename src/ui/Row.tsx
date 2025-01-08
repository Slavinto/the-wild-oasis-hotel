import { RowOrientations } from "@/types/enums";
import { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const StyledRow = styled.div<RowProps>`
    display: flex;
    max-width: 100%;

    ${(props) =>
        props.type === RowOrientations.Horizontal &&
        css`
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        `}
    ${(props) =>
        props.type === RowOrientations.Vertical &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;

interface RowProps {
    type?: RowOrientations;
}

const Row: FC<PropsWithChildren<RowProps>> = ({
    children,
    type = RowOrientations.Vertical,
}) => {
    return <StyledRow type={type}>{children}</StyledRow>;
};

export default Row;
