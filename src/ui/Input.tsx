import { FC, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
`;

interface InputProps {
    type?: HTMLInputElement["type"];
    placeholder?: string;
}

const Input: FC<InputProps> = ({
    type = "text",
    placeholder = "Input something",
}) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <StyledInput
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default Input;
