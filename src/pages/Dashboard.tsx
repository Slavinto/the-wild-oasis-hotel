import { Headings, RowOrientations } from "@/types/enums";
import { Row, Heading } from "@/ui";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";

function Dashboard() {
    const { user } = useSafeGlobalUserContext();

    return (
        <Row type={RowOrientations.Horizontal}>
            <Heading as={Headings.H1} text='Dashboard' />
            <p>Welcome {user?.email}</p>
        </Row>
    );
}

export default Dashboard;
