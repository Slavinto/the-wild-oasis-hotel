import { useSortByColName } from "@/hooks/useSortByColName";
import { ReactNode } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import styled from "styled-components";

const StyledSortBy = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
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
            {!sortIcon ? null : sortIcon === "asc" ? (
                <HiMiniChevronUp size={20} />
            ) : (
                <HiMiniChevronDown size={20} />
            )}
            {children}
        </StyledSortBy>
    );
};

export default SortBy;
