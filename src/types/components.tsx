import styled from "styled-components";
import {
    HiOutlineTrash,
    HiOutlineDocumentDuplicate,
    HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useDeleteCabinRow } from "@/features/cabins/useDeleteCabinRow";
import { Tables } from "@/services/supabaseTypes";
import { useCreateOrUpdateCabin } from "@/features/cabins/useCreateOrUpdateCabin";
import { CabinRowFunctions } from "./enums";
import { Menu } from "@/ui";
import { createCabinFromSupabaseTableCabin } from "@/utils/helpers";

// interface StyledMenuItemContainerProps {
//     disabled;
// }

const StyledMenuItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.8rem;
`;

{
    /* <Button
// duplicate cabin button
disabled={isDuplicating}
size={ButtonSizes.Small}
$variation={ButtonVariations.Secondary}
onClick={duplicateCabin}
> */
}
export const useCabinRowMenuOptions = (cabin: Tables<"cabins">) => {
    const { mutate: deleteCabin, isDeleting } = useDeleteCabinRow(cabin!);
    const { mutate: duplicateCabin, isUpdating: isDuplicating } =
        useCreateOrUpdateCabin(cabin!, CabinRowFunctions.Duplicate);

    const handleDuplicate = () => {
        console.log("running duplicate handler");
        duplicateCabin(createCabinFromSupabaseTableCabin(cabin));
    };

    const CabinRowMenuOptions = [
        <Menu.Button onClick={() => console.log("test")}>
            <StyledMenuItemContainer>
                <HiOutlineDocumentDuplicate />
                <span>Duplicate</span>
            </StyledMenuItemContainer>
        </Menu.Button>,
        <StyledMenuItemContainer>
            <HiOutlinePencilSquare />
            <span>Edit</span>
        </StyledMenuItemContainer>,
        <StyledMenuItemContainer>
            <HiOutlineTrash />
            <span>Remove</span>
        </StyledMenuItemContainer>,
    ];

    return { CabinRowMenuOptions, isDeleting, isDuplicating };
};
