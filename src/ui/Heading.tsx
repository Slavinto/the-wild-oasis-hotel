import { FC } from "react";
import styled, { css } from "styled-components";
import { Headings } from "../types/enums";

interface HeadingProps {
    as?: Headings;
    text: string;
}

const StyledHeading = styled.h1<Omit<HeadingProps, "text">>`
    ${(props) =>
        props.as === Headings.H1
            ? css`
                  font-size: 3rem;
                  font-weight: 600;
              `
            : props.as === Headings.H2
            ? css`
                  font-size: 2rem;
                  font-weight: 600;
              `
            : props.as === Headings.H3
            ? css`
                  font-size: 2rem;
                  font-weight: 500;
              `
            : ``}
`;

const Heading: FC<HeadingProps> = ({ as = Headings.H2, text }) => {
    return <StyledHeading as={as}>{text}</StyledHeading>;
};

export default Heading;
