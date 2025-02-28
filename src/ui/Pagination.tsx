import { CreateArrayOfNum } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

interface PaginationButtonProps {
    $active: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
    background-color: ${(props) =>
        props.$active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
    color: ${(props) => (props.$active ? " var(--color-brand-50)" : "inherit")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-400);
        color: var(--color-brand-50);
    }
`;

const Pagination = ({
    numItems = 0,
    itemsPerPage,
}: {
    numItems: number;
    itemsPerPage: number;
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1;
    const numPages = Math.ceil(numItems / itemsPerPage);

    const generatePages = () => {
        if (numPages <= 5) {
            return CreateArrayOfNum(numPages);
        }

        const pages: (number | string)[] = [1];
        if (activePage > 3) {
            pages.push("...");
        }

        // pages around the active page are rendered as buttons
        const middlePages: (number | string)[] = [
            activePage - 1,
            activePage,
            activePage + 1,
        ].filter((page) => page > 1 && page < numPages);

        pages.push(...middlePages);

        if (activePage < numPages - 2) {
            pages.push("...");
        }

        pages.push(numPages);

        return pages;
    };

    const handleClickPageButton = (
        e: React.MouseEvent<HTMLButtonElement>,
        pageIndex: number
    ) => {
        e.currentTarget.blur();
        setSearchParams((prev) => {
            prev.set("page", pageIndex.toString());
            return prev;
        });
    };

    return (
        <StyledPagination>
            <Buttons>
                {generatePages().map((page, index) => {
                    return typeof page === "number" ? (
                        <PaginationButton
                            key={index}
                            $active={page === activePage}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                handleClickPageButton(e, page)
                            }
                        >
                            {page}
                        </PaginationButton>
                    ) : (
                        <P key={index}>{page}</P>
                    );
                })}{" "}
            </Buttons>
        </StyledPagination>
    );
};

export default Pagination;
