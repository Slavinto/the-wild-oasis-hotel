import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import {
    Row,
    Heading,
    Tag,
    ButtonGroup,
    Button,
    ButtonText,
    Spinner,
} from "@/ui";

import { useMoveBack } from "../../hooks/useMoveBack";
import { ButtonVariations, Headings, RowOrientations } from "@/types/enums";
import { useParams } from "react-router-dom";
import { useBookingDetails } from "./useBookingDetails";
import { statusToTagName } from "@/types/constants";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { id } = useParams();
    const { bookingDetails, isLoading: isLoadingDetails } = useBookingDetails(
        Number(id)
    );
    const status = "checked-in";

    const moveBack = useMoveBack();

    return (
        <>
            <Row type={RowOrientations.Horizontal}>
                <HeadingGroup>
                    <Heading as={Headings.H1} text='Booking #X' />
                    <Tag $type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            {isLoadingDetails ? (
                <Spinner />
            ) : (
                <BookingDataBox booking={bookingDetails} />
            )}

            <ButtonGroup>
                <Button
                    $variation={ButtonVariations.Secondary}
                    onClick={moveBack}
                >
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
