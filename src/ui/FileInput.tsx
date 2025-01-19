import { forwardRef } from "react";
import styled from "styled-components";

const StyledFileInput = styled.input.attrs({ type: "file" })`
    font-size: 1.4rem;
    border-radius: var(--border-radius-sm);

    &::file-selector-button {
        font: inherit;
        font-weight: 500;
        padding: 0.8rem 1.2rem;
        margin-right: 1.2rem;
        border-radius: var(--border-radius-sm);
        border: none;
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);
        cursor: pointer;
        transition: color 0.2s, background-color 0.2s;

        &:hover {
            background-color: var(--color-brand-700);
        }
    }
`;

interface FileInputProps extends React.ComponentPropsWithoutRef<"input"> {
    type?: HTMLInputElement["type"];
    id: string;
    accept?: string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({ id, accept, disabled, onChange, ...props }, ref) => {
        return (
            <div style={{ display: "flex" }}>
                <StyledFileInput
                    ref={ref}
                    id={id}
                    accept={accept}
                    disabled={disabled}
                    onChange={onChange}
                    {...props}
                />
            </div>
        );
    }
);

export default FileInput;
// export default StyledFileInput;
