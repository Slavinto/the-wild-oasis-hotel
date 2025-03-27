import { BookingStatus, ButtonSizes, ButtonVariations } from "@/types/enums";
import { BookingsWithRelatedFull } from "@/types/types";
import { Button, Flag, Tag } from "@/ui";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 8rem 2rem 1fr 6rem 9rem;
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

const TodayItem = ({ item }: { item: BookingsWithRelatedFull }) => {
    const { id, status, guests, number_of_nights, start_date } = item;
    const today = new Date().toLocaleDateString().split("T")[0];
    const navigate = useNavigate();
    const statusTag =
        new Date(start_date!).toLocaleDateString().split("T")[0] === today
            ? "green"
            : "blue";
    const statusText =
        new Date(start_date!).toLocaleDateString().split("T")[0] === today
            ? "Arriving"
            : "Departing";
    return (
        <StyledTodayItem>
            <Tag $type={statusTag}>{statusText}</Tag>
            <Flag
                src={guests?.country_flag || ""}
                alt={`Flag of ${guests?.nationality}`}
            />
            <Guest>{guests?.full_name}</Guest>
            <span>{number_of_nights} nights</span>
            {status === BookingStatus.Unconfirmed ? (
                <Button
                    $variation={ButtonVariations.Primary}
                    size={ButtonSizes.Small}
                    onClick={() => navigate(`/bookings/check-in/${id}`)}
                >
                    Check in
                </Button>
            ) : status !== BookingStatus.CheckedOut ? (
                <CheckoutButton
                    bookingId={id}
                    guestName={guests?.full_name || ""}
                />
            ) : (
                <Button
                    $customstyles={{ fontSize: "12px", padding: "4px" }}
                    disabled
                    $variation={ButtonVariations.Secondary}
                >
                    checked out
                </Button>
            )}
        </StyledTodayItem>
    );
};

export default TodayItem;
