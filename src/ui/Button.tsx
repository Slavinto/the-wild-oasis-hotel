import { Tables } from "@/services/supabaseTypes";
import { ButtonSizes, ButtonVariations } from "@/types/enums";
import { Cabin } from "@/types/interfaces";
import { UseMutateFunction } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
        font-weight: 500;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1.2rem 2.4rem;
        font-weight: 500;
    `,
};

const variations = {
    primary: css`
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);

        &:hover {
            background-color: var(--color-brand-700);
        }
    `,
    secondary: css`
        color: var(--color-grey-600);
        background: var(--color-grey-0);
        border: 1px solid var(--color-grey-200);

        &:hover {
            background-color: var(--color-grey-50);
        }
    `,
    danger: css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);

        &:hover {
            background-color: var(--color-red-800);
        }
    `,
};

const StyledButton = styled.button<ButtonProps>`
    border: none;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    ${(props) => props.size && sizes[props.size]}
    ${(props) => props.$variation && variations[props.$variation]}
    ${(props) => props.$customstyles && { ...props.$customstyles }}
`;

interface ButtonProps {
    disabled?: boolean;
    size?: ButtonSizes;
    onClick?:
        | React.MouseEventHandler<HTMLButtonElement>
        | ((id: number) => void)
        | UseMutateFunction<Tables<"cabins">, Error, Cabin>;
    type?: HTMLButtonElement["type"];
    $variation?: ButtonVariations;
    $customstyles?: React.CSSProperties;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    disabled = false,
    size = ButtonSizes.Medium,
    onClick,
    type = "button",
    $variation = ButtonVariations.Primary,
    $customstyles,
}) => {
    return (
        <StyledButton
            disabled={disabled}
            type={type}
            size={size}
            onClick={onClick}
            $variation={$variation}
            $customstyles={$customstyles}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
