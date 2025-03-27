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
    Modal,
    Empty,
} from "@/ui";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
    AppEntities,
    AppOperations,
    BookingStatus,
    ButtonVariations,
    Headings,
    ModalWindows,
    RowOrientations,
} from "@/types/enums";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingDetails } from "./useBookingDetails";
import { statusToTagName } from "@/types/constants";
import ConfirmOperation from "@/ui/ConfirmOperation";
import { useDeleteBooking } from "./useDeleteBooking";

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
    const moveBack = useMoveBack();
    const { status } = bookingDetails || {};

    const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
    const handleConfirmDelete = () => {
        deleteBooking(Number(id), { onSuccess: () => navigate(`/bookings`) });
    };

    console.log({ bookingDetails });

    const isBusy = isDeleting || isLoadingDetails;

    if (!isBusy && !bookingDetails) {
        return <Empty resource={AppEntities.Booking} />;
    }

    return isBusy ? (
        <Spinner />
    ) : (
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

            <BookingDataBox booking={bookingDetails} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens={ModalWindows.DeleteBookingConfirm}>
                        <Button $variation={ButtonVariations.Danger}>
                            Delete Booking
                        </Button>
                    </Modal.Open>
                    <Modal.Window name={ModalWindows.DeleteBookingConfirm}>
                        <ConfirmOperation
                            operation={AppOperations.Delete}
                            onConfirm={handleConfirmDelete}
                            disabled={isBusy}
                            resourceName={AppEntities.Booking}
                        />
                    </Modal.Window>
                </Modal>
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
