import { ButtonSizes } from "@/types/enums";
import { Button } from "@/ui";
import { useCheckoutBooking } from "./useCheckoutBooking";
import { useGlobalSpinner } from "@/ui/globalSpinner/useGlobalSpinner";

function CheckoutButton({
    bookingId,
    guestName = "Guest",
}: {
    bookingId: number;
    guestName?: string;
}) {
    const { checkoutBooking, isCheckingOut } = useCheckoutBooking(
        bookingId,
        guestName
    );

    useGlobalSpinner(isCheckingOut);

    return (
        <Button
            size={ButtonSizes.Small}
            onClick={checkoutBooking}
            disabled={isCheckingOut}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
