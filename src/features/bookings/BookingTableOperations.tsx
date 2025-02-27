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

{
    /* <SortBy
options={[
    {
        value: "startDate-desc",
        label: "Sort by date (recent first)",
    },
    {
        value: "startDate-asc",
        label: "Sort by date (earlier first)",
    },
    {
        value: "totalPrice-desc",
        label: "Sort by amount (high first)",
    },
    {
        value: "totalPrice-asc",
        label: "Sort by amount (low first)",
    },
]}
/> */
}

export default BookingTableOperations;
