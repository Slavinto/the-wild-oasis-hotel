import { Filter, TableOperations } from "@/ui";

const CabinTableOperations = () => {
    return (
        <TableOperations>
            <Filter active={false}>By discount</Filter>
            <Filter active={false}>By price</Filter>
        </TableOperations>
    );
};

export default CabinTableOperations;
