import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Tables } from "@/services/supabaseTypes";
import {
    ButtonSizes,
    ButtonVariations,
    CabinRowFunctions,
} from "@/types/enums";
import { Button } from "@/ui";
import { formatCurrency } from "@/utils/helpers";
import { FC } from "react";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabinRow } from "@/features/cabins/useDeleteCabinRow";
// import { useCabins } from "./useCabins";
import { useCreateOrUpdateCabin } from "./useCreateOrUpdateCabin";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 6.4rem 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

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

const CabinRow: FC<CabinRowProps> = ({ cabin, setCurrentCabinId }) => {
    // logic for deleting form and form visibility extracted to useCabinRow
    // editing cabin data and creating cabin logic is in the createCabinForm
    const {
        showForm,
        setShowForm,
        mutate: deleteCabin,
        isDeleting,
    } = useDeleteCabinRow(cabin!);
    // using hook for cabin duplication
    const { mutate: duplicateCabin, isUpdating: isDuplicating } =
        useCreateOrUpdateCabin(cabin!, CabinRowFunctions.Duplicate);

    // const { isPending: isLoading } = useCabins();

    if (!cabin) return null;

    const { name, image_url, max_capacity, regular_price, discount } = cabin;

    return (
        <>
            <TableRow role='row'>
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
                <div className='' style={{ display: "flex", gap: "1rem" }}>
                    <Button
                        // update cabin button
                        size={ButtonSizes.Small}
                        variation={ButtonVariations.Secondary}
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        {
                            <span style={{ fontSize: "1.8rem" }}>
                                <HiOutlinePencilSquare />
                            </span>
                        }
                    </Button>
                    <Button
                        // duplicate cabin button
                        disabled={isDuplicating}
                        size={ButtonSizes.Small}
                        variation={ButtonVariations.Secondary}
                        onClick={duplicateCabin}
                    >
                        {
                            <span style={{ fontSize: "1.8rem" }}>
                                <HiOutlineDocumentDuplicate />
                            </span>
                        }
                    </Button>
                    <Button
                        // delete cabin button
                        disabled={isDeleting}
                        onClick={deleteCabin}
                        size={ButtonSizes.Small}
                        variation={ButtonVariations.Danger}
                    >
                        Remove
                    </Button>
                </div>
            </TableRow>
            {showForm && (
                <CreateCabinForm
                    onCloseModal={setShowForm}
                    cabin={cabin}
                    setCurrentCabinId={setCurrentCabinId}
                    cabinFunction={CabinRowFunctions.Update}
                />
            )}
        </>
    );
};

export default CabinRow;
