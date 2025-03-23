import { dashboardFilters } from "@/types/constants";
import { Filter } from "@/ui";

function DashboardFilter() {
    return (
        <Filter
            // filterField='last'
            filterOptions={dashboardFilters}
        />
    );
}

export default DashboardFilter;
