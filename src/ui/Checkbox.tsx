import { forwardRef, ReactNode } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
    display: flex;
    gap: 1.6rem;

    & input[type="checkbox"] {
        cursor: pointer;
        height: 2.4rem;
        width: 2.4rem;
        outline-offset: 2px;
        transform-origin: 0;
        accent-color: var(--color-brand-600);
    }

    & input[type="checkbox"]:disabled {
        accent-color: var(--color-brand-600);
    }

    & label {
        flex: 1;

        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
`;

interface CheckboxProps {
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    disabled: boolean;
    id?: string;
    name: string;
    children: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function (
    { checked, onChange, onClick, disabled = false, id, name, children },
    ref
) {
    return (
        <StyledCheckbox onClick={onClick} className='test'>
            <input
                type='checkbox'
                name={name}
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
            />
            <label htmlFor={!disabled ? id : ""}>{children}</label>
        </StyledCheckbox>
    );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
