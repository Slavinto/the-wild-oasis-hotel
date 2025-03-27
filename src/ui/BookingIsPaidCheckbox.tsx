import Modal from "./modal/Modal";
import { AppEntities, AppOperations, ModalWindows } from "@/types/enums";
import Checkbox from "./Checkbox";
import ConfirmOperation from "./ConfirmOperation";

const BookingIsPaidCheckbox = ({
    confirmIsPaid,
    isUpdating,
    id,
    handleConfirmIsPaid,
}: {
    confirmIsPaid: boolean;
    isUpdating: boolean;
    id: number;
    handleConfirmIsPaid: () => void;
}) => {
    return (
        <Modal>
            <Modal.Open opens={ModalWindows.IsBookingPayedConfirm}>
                <Checkbox
                    name='ispaid-checkbox'
                    checked={confirmIsPaid}
                    disabled={confirmIsPaid || isUpdating}
                    id={`${id}`}
                    onChange={() => {}}
                    // onChange={handleConfirmIsPaid}
                >
                    Check for payed booking
                </Checkbox>
            </Modal.Open>
            <Modal.Window name={ModalWindows.IsBookingPayedConfirm}>
                <ConfirmOperation
                    operation={AppOperations.Payment}
                    onConfirm={handleConfirmIsPaid}
                    disabled={isUpdating}
                    resourceName={AppEntities.Booking}
                />
            </Modal.Window>
        </Modal>
    );
};

export default BookingIsPaidCheckbox;
