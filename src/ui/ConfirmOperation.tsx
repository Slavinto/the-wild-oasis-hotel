import styled from "styled-components";
import Button from "./Button";
import {
    AppEntities,
    AppOperations,
    ButtonVariations,
    Headings,
} from "@/types/enums";
import { Heading } from "@/ui";

const StyledConfirmOperation = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmOperation({
    resourceName,
    operation,
    onConfirm,
    onCloseModal,
    // onCancel,
    disabled,
}: {
    resourceName: AppEntities;
    operation: AppOperations;
    onConfirm: () => void;
    onCloseModal?: () => void;
    // onCancel: () => void;
    disabled: boolean;
}) {
    return (
        <StyledConfirmOperation>
            <Heading text={`${operation} ${resourceName}`} as={Headings.H3} />
            {getConfirmMessage(resourceName, operation)}

            <div>
                <Button
                    $variation={ButtonVariations.Secondary}
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    $variation={ButtonVariations.Danger}
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Confirm {operation}
                </Button>
            </div>
        </StyledConfirmOperation>
    );
}

export default ConfirmOperation;

function getConfirmMessage(
    resourceName: AppEntities,
    operation: AppOperations
): string {
    switch (operation) {
        case AppOperations.Delete:
            return `
            Are you sure you want to delete this ${resourceName} permanently?
            This action cannot be undone.
            `;
        case AppOperations.Payment:
            return `Are you sure you want to mark this ${resourceName} as "Payed"`;

        default:
            return `Unknown operation: ${operation}`;
    }
}
