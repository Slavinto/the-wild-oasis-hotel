import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;
const StyledSpinnerMini = styled(BiLoaderAlt)`
    width: 2.4rem;
    height: 2.4rem;
    animation: ${rotate} 1.5s infinite linear;
`;

const SpinnerMini = () => {
    return <StyledSpinnerMini />;
};

export default SpinnerMini;
