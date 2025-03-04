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
import {
    BookingStatus,
    ButtonVariations,
    Headings,
    RowOrientations,
} from "@/types/enums";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const { status } = bookingDetails || {};
    const moveBack = useMoveBack();

    return (
        <>
            <Row type={RowOrientations.Horizontal}>
                <HeadingGroup>
                    <Heading
                        as={Headings.H1}
                        text={`Booking ${bookingDetails?.bookingId}`}
                    />
                    <Tag
                        $type={
                            statusToTagName[status || BookingStatus.Unconfirmed]
                        }
                    >
                        {status?.replace("-", " ")}
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
                {status === BookingStatus.Unconfirmed && (
                    <Button
                        onClick={() => navigate(`/bookings/check-in/${id}`)}
                    >
                        Check in booking #{id}
                    </Button>
                )}
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
