import { useSortByColName } from "@/hooks/useSortByColName";
import { ReactNode } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import styled from "styled-components";

const StyledSortBy = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
`;

const SortBy = ({
    colName,
    children,
}: {
    colName: string;
    children: ReactNode;
}) => {
    const {
        handleClickColName,
        isSortColName: { sortIcon },
    } = useSortByColName(colName);

    return (
        <StyledSortBy onClick={handleClickColName}>
            {children}
            {!sortIcon ? null : sortIcon === "asc" ? (
                <HiMiniChevronUp size={20} />
            ) : (
                <HiMiniChevronDown size={20} />
            )}
        </StyledSortBy>
    );
};

export default SortBy;
