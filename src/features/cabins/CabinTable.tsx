import { Table } from "@/ui";
import { cabinTableColumns } from "@/types/constants";
import CabinRow from "./CabinRow";
import { AppTables } from "@/types/enums";
import { Tables } from "@/services/supabaseTypes";

const CabinTable = ({ cabins }: { cabins?: Tables<AppTables.Cabins>[] }) => {
    return (
        <Table
            columns='minmax(6.4rem, 1fr) minmax(5rem, 1.8fr) minmax(7rem, 2.2fr) minmax(5rem, 1fr) minmax(5rem, 1fr) minmax(15rem, 1fr)'
            colNames={cabinTableColumns}
            tableType={AppTables.Cabins}
        >
            <Table.Header />
            {cabins ? (
                <Table.Body
                    data={cabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            ) : (
                <Table.Empty />
            )}
        </Table>
    );
};

export default CabinTable;
