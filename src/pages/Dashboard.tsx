import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import { Headings, RowOrientations } from "@/types/enums";
import { Row, Heading } from "@/ui";

function Dashboard() {
    return (
        <>
            <Row type={RowOrientations.Horizontal}>
                <Heading as={Headings.H1} text='Dashboard' />
                <DashboardFilter />
            </Row>
            <DashboardLayout />
        </>
    );
}

export default Dashboard;
