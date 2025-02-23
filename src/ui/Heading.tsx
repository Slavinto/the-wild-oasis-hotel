import styled, { css } from "styled-components";
import { Headings } from "../types/enums";

interface HeadingProps {
    as?: Headings;
}

const StyledHeading = styled.h1<HeadingProps>`
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

const Heading = ({
    as = Headings.H2,
    text,
}: {
    as: Headings;
    text: string;
}) => {
    return <StyledHeading as={as}>{text}</StyledHeading>;
};

export default Heading;
