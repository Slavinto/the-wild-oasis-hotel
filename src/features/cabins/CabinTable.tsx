import { Spinner, Table } from "@/ui";
import { cabinTableColumns } from "@/types/constants";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import { Tables } from "@/services/supabaseTypes";
import { useSearchParams } from "react-router-dom";
import { CabinFilters } from "@/types/enums";

const CabinTable = () => {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    const filterParam = searchParams.get("filter") || CabinFilters.All;
    const sortParam = searchParams.get("sort") || "date";

    const isSortOrderAsc =
        (searchParams.get("order") ?? "asc") === "asc" ? 1 : -1;
    // const test = (searchParams.get("order") ?? "asc") === "asc";
    // console.log({ test });
    const cols = cabinTableColumns
        .filter((colName) => colName !== "")
        .map((colName) => colName.toLowerCase().replace(" ", "-"));

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
                case cols[0]:
                    // sorting by item name
                    return (
                        isSortOrderAsc *
                        (prevItem.name || "").localeCompare(item.name || "")
                    );
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
                    // sorting by cabin creation date
                    return (
                        new Date(prevItem.created_at).getTime() -
                        new Date(item.created_at).getTime()
                    );
            }
        });
    return (
        <Table
            columns='minmax(6.4rem, 1fr) minmax(5rem, 1.8fr) minmax(7rem, 2.2fr) minmax(5rem, 1fr) minmax(5rem, 1fr) minmax(15rem, 1fr)'
            colNames={cabinTableColumns}
        >
            <Table.Header />
            {isLoading ? (
                <Spinner />
            ) : sortedCabins ? (
                <Table.Body
                    data={sortedCabins}
                    render={(cabin: Tables<"cabins">) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            ) : (
                <Table.Empty />
            )}
        </Table>
    );
};
{
    /* <div className=''></div>
<div className=''>Cabin</div>
<div className=''>Capacity</div>
<div className=''>Price</div>
<div className=''>Discount</div>
<div className=''></div> */
}

export default CabinTable;
