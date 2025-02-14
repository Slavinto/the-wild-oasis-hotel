import styled from "styled-components";
import Button from "./Button";
import { AppEntities, ButtonVariations, Headings } from "@/types/enums";
import { Heading } from "@/ui";

const StyledConfirmDelete = styled.div`
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

function ConfirmDelete({
    resourceName,
    onConfirm,
    onCloseModal,
    // onCancel,
    disabled,
}: {
    resourceName: AppEntities;
    onConfirm: () => void;
    onCloseModal?: () => void;
    // onCancel: () => void;
    disabled: boolean;
}) {
    return (
        <StyledConfirmDelete>
            <Heading text={`Delete ${resourceName}`} as={Headings.H3} />
            <p>
                Are you sure you want to delete this {resourceName} permanently?
                This action cannot be undone.
            </p>

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
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
