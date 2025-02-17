import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Tables } from "@/services/supabaseTypes";
import {
    AppEntities,
    ButtonSizes,
    ButtonVariations,
    CabinRowFunctions,
    ModalWindows,
} from "@/types/enums";
import { Button, ConfirmDelete, Modal, Table } from "@/ui";
import { formatCurrency } from "@/utils/helpers";
import { cloneElement, FC, ReactNode } from "react";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabinRow } from "@/features/cabins/useDeleteCabinRow";
import { useCreateOrUpdateCabin } from "./useCreateOrUpdateCabin";
import { Menu } from "@/ui";
import { CabinRowMenuOptions } from "@/types/components";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);

    /* &.noImage {
        width: 6.4rem;
    } */
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

interface CabinRowProps {
    cabin?: Tables<"cabins">;
    setCurrentCabinId?: (id: number) => void;
}

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
    // logic for deleting form and form visibility extracted to useDeleteCabinRow
    // editing cabin data and creating cabin logic is in the createCabinForm
    const { mutate: deleteCabin, isDeleting } = useDeleteCabinRow(cabin!);
    // using hook for cabin duplication
    const { mutate: duplicateCabin, isUpdating: isDuplicating } =
        useCreateOrUpdateCabin(cabin!, CabinRowFunctions.Duplicate);

    if (!cabin) return null;

    const { name, image_url, max_capacity, regular_price, discount } = cabin;

    return (
        <Table.Row>
            <Img
                src={image_url || ""}
                className={image_url ? "hasImage" : ""}
            />
            <Cabin>{name}</Cabin>
            <div className=''>fits up to {max_capacity || 0} guests</div>
            <Price>{formatCurrency(regular_price || 0)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount || 0)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <Menu id={cabin.id}>
                <Modal>
                    <Modal.Open opens={ModalWindows.UpdateCabin}>
                        <Button
                            // update cabin button
                            size={ButtonSizes.Small}
                            $variation={ButtonVariations.Secondary}
                        >
                            {
                                <span style={{ fontSize: "1.8rem" }}>
                                    <HiOutlinePencilSquare />
                                </span>
                            }
                        </Button>
                    </Modal.Open>
                    <Modal.Window name={ModalWindows.UpdateCabin}>
                        <CreateCabinForm
                            cabin={cabin}
                            cabinFunction={CabinRowFunctions.Update}
                        />
                    </Modal.Window>
                </Modal>
                <Button
                    // duplicate cabin button
                    disabled={isDuplicating}
                    size={ButtonSizes.Small}
                    $variation={ButtonVariations.Secondary}
                    onClick={duplicateCabin}
                >
                    {
                        <span style={{ fontSize: "1.8rem" }}>
                            <HiOutlineDocumentDuplicate />
                        </span>
                    }
                </Button>
                <Modal>
                    <Modal.Open opens={ModalWindows.DeleteCabinConfirm}>
                        <Button
                            // delete cabin button
                            size={ButtonSizes.Small}
                            $variation={ButtonVariations.Danger}
                        >
                            Remove
                        </Button>
                    </Modal.Open>
                    <Modal.Window name={ModalWindows.DeleteCabinConfirm}>
                        <ConfirmDelete
                            onConfirm={deleteCabin as () => void}
                            disabled={isDeleting}
                            resourceName={AppEntities.Cabin}
                        />
                    </Modal.Window>
                </Modal>
                <Menu.Body>
                    <Menu.Toggle>
                        <HiEllipsisVertical />
                    </Menu.Toggle>
                    <Menu.List>
                        <Menu.Buttons
                            data={CabinRowMenuOptions}
                            render={(buttonContent: ReactNode) => (
                                <li
                                    key={
                                        buttonContent?.toString() +
                                        Math.random().toString()
                                    }
                                >
                                    <Menu.Button>{buttonContent}</Menu.Button>
                                </li>
                            )}
                        />
                    </Menu.List>
                </Menu.Body>
            </Menu>
        </Table.Row>
    );
};

export default CabinRow;
