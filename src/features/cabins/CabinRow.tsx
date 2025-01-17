import { removeCabin } from "@/services/apiCabins";
import { Tables } from "@/services/supabaseTypes";
import { ButtonSizes, ButtonVariations } from "@/types/enums";
import { Button } from "@/ui";
import { formatCurrency } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

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
}

type MutateContextType =
    | {
          prevCabins: Tables<"cabins"> | undefined;
      }
    | undefined;

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
    const queryClient = useQueryClient();

    if (!cabin) throw new Error(`Error. Invalid cabin object: ${cabin}`);
    if (!cabin.id || !cabin.name)
        throw new Error("Error. Invalid cabin name or id.");

    const { name, id } = cabin;

    const { mutate, isPending } = useMutation({
        mutationFn: () => removeCabin(id),
        onMutate: async (cabinId) => {
            const confirmed = window.confirm(
                `Are you sure you want to remove this cabin?`
            );
            if (!confirmed) {
                throw new Error("Error. Cancelled by user");
            }

            // optimistically update the UI
            const prevCabins = queryClient.getQueryData(["cabins"]);
            queryClient.setQueryData(
                ["cabins"],
                (oldCabins: Tables<"cabins">[]) =>
                    oldCabins.filter((oldCabin) => oldCabin.id !== cabinId)
            );

            // return context to rollback
            return { prevCabins } as MutateContextType;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success("Cabin successfully deleted");
        },
        onError: (
            error: Error,
            cabinId: number,
            context: MutateContextType
        ) => {
            // rollback UI changes if update failed
            if (context?.prevCabins) {
                queryClient.setQueryData(["cabins"], context.prevCabins);
            }
            toast.error(error.message);
            throw new Error(
                `Error. Failed to remove a cabin ${cabinId}: ${JSON.stringify(
                    error
                )}`
            );
        },
    });
    const { image_url, max_capacity, regular_price, discount } = cabin;

    return (
        <TableRow role='row'>
            <Img
                src={image_url || ""}
                className={image_url ? "hasImage" : ""}
            />
            <Cabin>{name}</Cabin>
            <div className=''>fits up to {max_capacity || 0} guests</div>
            <Price>{formatCurrency(regular_price || 0)}</Price>
            <Discount>{formatCurrency(discount || 0)}</Discount>
            <Button
                disabled={isPending}
                onClick={mutate}
                size={ButtonSizes.Small}
                variation={ButtonVariations.Danger}
            >
                Remove
            </Button>
        </TableRow>
    );
};

export default CabinRow;
