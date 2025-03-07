import { ButtonSizes } from "@/types/enums";
import { Button } from "@/ui";

function CheckoutButton({
    bookingId,
    guestName = "Guest",
}: {
    bookingId: number;
    guestName?: string;
}) {
    return <Button size={ButtonSizes.Small}>Check out</Button>;
}

export default CheckoutButton;
