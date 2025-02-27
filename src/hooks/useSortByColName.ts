import { makeLower } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";

// used in the SortBy component which is used to switch sort icons in the table header and set search params for further use in sorting functions

export const useSortByColName = (colName: string) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const orderParam = searchParams.get("order") ?? "asc";
    const sortParam = searchParams.get("sort");

    const sortColName = makeLower(colName);

    const showSortIcon = sortParam && sortParam === sortColName;
    const showAscSortIcon = showSortIcon && orderParam === "asc";
    // const showDescSortIcon = showSortIcon && orderParam === "desc";

    const handleClickColName = () => {
        setSearchParams((prev) => {
            prev.set("sort", sortColName);
            prev.set("order", orderParam === "asc" ? "desc" : "asc");
            return prev;
        });
    };

    return {
        handleClickColName,
        isSortColName: {
            sortIcon: !showSortIcon ? null : showAscSortIcon ? "asc" : "desc",
        },
    };
};
