import { CabinRowFunctions, ModalWindows } from "@/types/enums";
import CreateCabinForm from "./CreateCabinForm";
import { Button, Modal } from "@/ui";

const AddCabin = () => {
    return (
        <Modal>
            <Modal.Open opens={ModalWindows.CabinForm}>
                <Button>Add Cabin</Button>
            </Modal.Open>
            <Modal.Window name={ModalWindows.CabinForm}>
                <CreateCabinForm cabinFunction={CabinRowFunctions.Create} />
            </Modal.Window>
        </Modal>
    );
};

export default AddCabin;
