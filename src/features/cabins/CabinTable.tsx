import { Spinner, Table } from "@/ui";
import { cabinTableColumns } from "@/types/constants";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import { Tables } from "@/services/supabaseTypes";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get("filter");

    const sortedCabins = cabins
        ?.filter((cabin) => {
            switch (filterParam) {
                case "no-discount":
                    return cabin.discount ? null : cabin;
                case "discount":
                    return cabin.discount ? cabin : null;
                default:
                    // return all by default
                    return cabin;
            }
        })
        .sort(
            (prevItem, item) =>
                new Date(prevItem.created_at).getTime() -
                new Date(item.created_at).getTime()
        );
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
