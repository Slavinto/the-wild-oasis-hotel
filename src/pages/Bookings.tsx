import { Headings, RowOrientations } from "@/types/enums";
import { Heading, Row } from "@/ui";

function Bookings() {
    return (
        <Row type={RowOrientations.Horizontal}>
            <Heading text='All Bookings' as={Headings.H1} />
            <p>TEST</p>
        </Row>
    );
}

export default Bookings;
