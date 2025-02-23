import { CabinFilters } from "@/types/enums";
import { Filter, TableOperations } from "@/ui";

const CabinTableOperations = () => {
    return (
        <TableOperations>
            <Filter filterOptions={Object.values(CabinFilters)} />
        </TableOperations>
    );
};

export default CabinTableOperations;
