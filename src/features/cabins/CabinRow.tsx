import {
    HiOutlineDocumentDuplicate,
    HiOutlinePencilSquare,
    HiEllipsisVertical,
    HiOutlineTrash,
} from "react-icons/hi2";
import { Tables } from "@/services/supabaseTypes";
import {
    AppEntities,
    AppTables,
    CabinRowFunctions,
    ModalWindows,
} from "@/types/enums";
import { ConfirmDelete, Modal, Table } from "@/ui";
import {
    createCabinFromSupabaseTableCabin,
    formatCurrency,
} from "@/utils/helpers";
import { FC } from "react";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabinRow } from "@/features/cabins/useDeleteCabinRow";
import { useCreateOrUpdateCabin } from "./useCreateOrUpdateCabin";
import { Menu } from "@/ui";

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
    cabin?: Tables<AppTables.Cabins>;
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

    const handleDuplicate: React.EventHandler<React.MouseEvent> = () => {
        duplicateCabin(createCabinFromSupabaseTableCabin(cabin!));
    };

    const handleConfirmDelete = () => {
        deleteCabin(cabin.id);
    };

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
                <Menu.Toggle>
                    <HiEllipsisVertical />
                </Menu.Toggle>
                <Menu.List>
                    <Modal>
                        {/* edit button */}
                        <Modal.Open opens={ModalWindows.UpdateCabin}>
                            <Menu.Button disabled={isDuplicating}>
                                <HiOutlinePencilSquare />
                                <span>Edit</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window name={ModalWindows.UpdateCabin}>
                            <CreateCabinForm
                                cabin={cabin}
                                cabinFunction={CabinRowFunctions.Update}
                            />
                        </Modal.Window>
                    </Modal>
                    {/* duplicate button - no modal */}
                    <Menu.Button
                        onClick={handleDuplicate}
                        disabled={isDuplicating}
                    >
                        <HiOutlineDocumentDuplicate />
                        <span>Duplicate</span>
                    </Menu.Button>
                    <Modal>
                        {/* delete button */}
                        <Modal.Open opens={ModalWindows.DeleteCabinConfirm}>
                            <Menu.Button disabled={isDeleting}>
                                <HiOutlineTrash />
                                <span>Delete</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window name={ModalWindows.DeleteCabinConfirm}>
                            <ConfirmDelete
                                onConfirm={handleConfirmDelete}
                                disabled={isDeleting}
                                resourceName={AppEntities.Cabin}
                            />
                        </Modal.Window>
                    </Modal>
                </Menu.List>
            </Menu>
        </Table.Row>
    );
};

export default CabinRow;

{
    /* <Modal>
    <Modal.Open opens={ModalWindows.UpdateCabin}>
        <Menu.Button
            onClick={() => {
                console.log("menu button clicked");
            }}
            disabled={isDuplicating}
        >
            <HiOutlinePencilSquare />
            <span>Edit</span>
        </Menu.Button>
    </Modal.Open>
    <Modal.Window name={ModalWindows.UpdateCabin}>
        <CreateCabinForm
            cabin={cabin}
            cabinFunction={CabinRowFunctions.Update}
        />
    </Modal.Window>
</Modal>; */
}
