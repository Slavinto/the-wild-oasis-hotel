import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import { CabinFilters } from "@/types/enums";
import { cabinTableColumns } from "@/types/constants";
import { makeLower } from "@/utils/helpers";

export const useSortCabinsClient = () => {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    const filterParam = searchParams.get("filter") || CabinFilters.All;
    const sortParam = searchParams.get("sort") || "date";

    const isSortOrderAsc =
        (searchParams.get("order") ?? "asc") === "asc" ? 1 : -1;

    const cols = cabinTableColumns
        .filter((colName) => colName !== "")
        .map((colName) => makeLower(colName));

    const sortedCabins = cabins
        ?.filter((cabin) => {
            switch (filterParam) {
                case CabinFilters.NoDiscount:
                    return cabin.discount ? null : cabin;
                case CabinFilters.Discount:
                    return cabin.discount ? cabin : null;
                default:
                    // return all by default
                    return cabin;
            }
        })
        .sort((prevItem, item) => {
            if (!prevItem || !item) {
                return 0;
            }

            switch (sortParam) {
                case cols[1]:
                    // sorting by capacity
                    return (
                        isSortOrderAsc *
                        ((prevItem.max_capacity ?? 0) -
                            (item.max_capacity ?? 0))
                    );
                case cols[2]:
                    // sorting by cabin price
                    return (
                        isSortOrderAsc *
                        ((prevItem.regular_price ?? 0) -
                            (item.regular_price ?? 0))
                    );
                case cols[3]:
                    // sorting by discount
                    return (
                        isSortOrderAsc *
                        ((prevItem.discount ?? 0) - (item.discount ?? 0))
                    );
                default:
                    // sorting by item name
                    return (
                        isSortOrderAsc *
                        (prevItem.name || "").localeCompare(item.name || "")
                    );
            }
        });

    return { isLoading, sortedCabins };
};
