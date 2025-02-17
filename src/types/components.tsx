import styled from "styled-components";
import {
    HiOutlineTrash,
    HiOutlineDocumentDuplicate,
    HiOutlinePencilSquare,
} from "react-icons/hi2";

const StyledMenuItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.8rem;
`;

export const CabinRowMenuOptions = [
    <StyledMenuItemContainer>
        <HiOutlineDocumentDuplicate />
        <span>Duplicate</span>
    </StyledMenuItemContainer>,
    <StyledMenuItemContainer>
        <HiOutlinePencilSquare />
        <span>Edit</span>
    </StyledMenuItemContainer>,
    <StyledMenuItemContainer>
        <HiOutlineTrash />
        <span>Remove</span>
    </StyledMenuItemContainer>,
];
