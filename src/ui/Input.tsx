import { InputIds } from "@/types/enums";
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
    isControlled?: boolean;
    defaultValue?: string | number;
    type?: HTMLInputElement["type"];
    placeholder?: string;
    id?: InputIds | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    disabled?: boolean;
}
const Input: FC<InputProps> = ({
    isControlled = false,
    defaultValue = "",
    type = "text",
    placeholder = "Input something",
    id = "",
    onChange,
    value = "",
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState("");

    return isControlled ? (
        <StyledInput
            id={id}
            disabled={disabled}
            type={type}
            value={onChange ? value : inputValue}
            onChange={
                onChange ? onChange : (e) => setInputValue(e.target.value)
            }
            placeholder={placeholder}
        />
    ) : (
        <StyledInput
            id={id}
            disabled={disabled}
            type={type}
            defaultValue={typeof defaultValue === "string" ? "" : 0}
            placeholder={placeholder}
        />
    );
};

export default Input;
