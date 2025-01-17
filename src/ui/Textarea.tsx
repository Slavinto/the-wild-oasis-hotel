import { forwardRef } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea<TextareaProps>`
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    width: 100%;
    height: 8rem;
`;

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
    type?: HTMLTextAreaElement["type"];
    id?: string;
    defaultValue?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (props, ref) => {
        return <StyledTextarea ref={ref} {...props} />;
    }
);

export default Textarea;
