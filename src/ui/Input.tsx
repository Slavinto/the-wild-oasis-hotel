import { InputIds } from "@/types/enums";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
`;

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
    isControlled?: boolean;
    defaultValue?: string | number;
    type?: HTMLInputElement["type"];
    placeholder?: string;
    id?: InputIds | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            isControlled = false,
            defaultValue,
            type = "text",
            placeholder = "Input something",
            id,
            onChange,
            value,
            disabled = false,
            ...props
        },
        ref
    ) => {
        return isControlled ? (
            <StyledInput
                ref={ref}
                id={id}
                disabled={disabled}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />
        ) : (
            <StyledInput
                ref={ref}
                id={id}
                disabled={disabled}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...props}
            />
        );
    }
);

export default Input;
