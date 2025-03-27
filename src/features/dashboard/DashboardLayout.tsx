import styled from "styled-components";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import { Spinner } from "@/ui";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

const DashboardLayout = () => {
    const {
        bookings,
        filter,
        isLoading: isLoadingBookings,
        headerText: bookingsHeader,
    } = useRecentBookings();
    const {
        stays,
        isLoading: isLoadingStays,
        headerText: staysHeader,
    } = useRecentStays();
    const { cabins, isLoading: isLoadingCabins } = useCabins();

    const isBusy = isLoadingBookings || isLoadingStays || isLoadingCabins;
    if (!bookings || !stays || !cabins) {
        return null;
    }
    return (
        <StyledDashboardLayout>
            {isBusy ? (
                <Spinner />
            ) : (
                <>
                    <Stats
                        bookings={bookings}
                        stays={stays}
                        cabins={cabins}
                        filter={filter}
                    />
                    <SalesChart
                        bookings={bookings}
                        bookingsHeader={bookingsHeader}
                    />
                    <TodayActivity />
                    <DurationChart stays={stays} staysHeader={staysHeader} />
                </>
            )}
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
