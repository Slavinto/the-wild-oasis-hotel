import styled from "styled-components";
import RecentStays from "./RecentStays";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

const DashboardLayout = () => {
    return (
        <StyledDashboardLayout>
            <RecentStays />
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
