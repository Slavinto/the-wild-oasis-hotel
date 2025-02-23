import { useSearchParams } from "react-router-dom";

export const useSortByColName = (colName: string) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const orderParam = searchParams.get("order") ?? "asc";
    const sortParam = searchParams.get("sort");

    const sortColName = colName.toLowerCase().replace(" ", "-");

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
