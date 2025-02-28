import { DatePicker, Filter, TableOperations } from "@/ui";

function BookingTableOperations() {
    return (
        <TableOperations>
            <DatePicker />
            <Filter
                filterOptions={[
                    "all",
                    "checked-out",
                    "checked-in",
                    "unconfirmed",
                ]}
            />
        </TableOperations>
    );
}

export default BookingTableOperations;
