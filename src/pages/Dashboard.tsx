import { Headings, RowOrientations } from "@/types/enums";
import { Row, Heading } from "@/ui";

function Dashboard() {
    return (
        <Row type={RowOrientations.Horizontal}>
            <Heading as={Headings.H1} text='Dashboard' />
        </Row>
    );
}

export default Dashboard;
