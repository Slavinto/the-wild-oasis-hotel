import { ButtonSizes } from "@/types/enums";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
    return <Button size={ButtonSizes.Small}>Check out</Button>;
}

export default CheckoutButton;
