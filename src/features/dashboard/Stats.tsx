import Stat from "./Stat";
import {
    HiOutlineBriefcase,
    HiOutlineCalendarDateRange,
    HiOutlineChartBar,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { AppTables } from "@/types/enums";
import { formatCurrency } from "@/utils/helpers";
import { Tables } from "@/services/supabaseTypes";
import { RecentBookings } from "@/types/interfaces";

const Stats = ({
    bookings,
    stays,
    cabins,
    filter,
}: {
    bookings: RecentBookings[];
    stays: Tables<AppTables.Bookings>[];
    cabins: Tables<AppTables.Cabins>[];
    filter: number;
}) => {
    const numCabins = cabins?.length || 0;
    const numBookings = bookings?.length || 0;
    const sales =
        bookings?.reduce((prev, cur) => prev + (cur.total_price || 0), 0) || 0;
    const checkins = stays?.length || 0;

    // checked in nights / all available nights
    const checkedInNights =
        stays?.reduce((prev, stay) => stay.number_of_nights || 0 + prev, 0) ||
        0;
    const occupancyRate = Math.round(
        (checkedInNights / (filter * numCabins)) * 100
    );

    return (
        <>
            <Stat
                color='brand'
                value={numBookings}
                title={AppTables.Bookings}
                icon={<HiOutlineBriefcase />}
            />
            <Stat
                color='brand'
                value={formatCurrency(sales)}
                title='Sales'
                icon={<HiOutlineCurrencyDollar />}
            />
            <Stat
                color='brand'
                value={checkins}
                title='Check-ins'
                icon={<HiOutlineCalendarDateRange />}
            />
            <Stat
                color='brand'
                value={occupancyRate + "%"}
                title='Occupancy rate'
                icon={<HiOutlineChartBar />}
            />
        </>
    );
};

export default Stats;
