import {
    CreateCabinRowLabels,
    CreateUserFormRowLabels,
    UpdateSettingsFormLabels,
} from "@/types/enums";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { FieldError } from "react-hook-form";

const StyledFormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr;
    /* 1.2fr; */
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const StyledLabel = styled.label`
    font-weight: 500;
`;

const StyledError = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

interface FormRowProps {
    htmlFor?: string;
    label?:
        | CreateCabinRowLabels
        | UpdateSettingsFormLabels
        | CreateUserFormRowLabels;
    error?: FieldError;
}

const FormRow: FC<PropsWithChildren<FormRowProps>> = ({
    children,
    htmlFor,
    label,
    error,
}) => {
    return (
        <StyledFormRow>
            {label && <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>}
            {children}
            {error?.message && <StyledError>{error.message}</StyledError>}
        </StyledFormRow>
    );
};

export default FormRow;
