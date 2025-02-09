import { CabinRowFunctions } from "@/types/enums";
import CreateCabinForm from "./CreateCabinForm";
import {
    Dispatch,
    SetStateAction,
    useState,
    createContext,
    PropsWithChildren,
    FC,
    ReactNode,
} from "react";
import { Button, Modal } from "@/ui";
import { createPortal } from "react-dom";

const AddCabin = () => {
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>

            {/* <Modal.Open opens='table'>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CreateCabinForm />
            </Modal.Window>  */}
        </Modal>
    );
};

const Open = () => {
    return null;
};
Modal.Open = Open;

// const AddCabin = ({
//     setCurrentCabinId,
// }: {
//     setCurrentCabinId: (cabinId: number) => void;
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <>
//             {isOpen && (
//                 <Modal onClose={() => setIsOpen(false)}>
//                     <CreateCabinForm
//                         setCurrentCabinId={setCurrentCabinId}
//                         cabinFunction={CabinRowFunctions.Create}
//                         onCloseModal={() => setIsOpen(false)}
//                     />
//                 </Modal>
//             )}
//             <div>
//                 <Button onClick={() => setIsOpen(true)}>Add new cabin</Button>
//             </div>
//         </>
//     );
// };

// const AddCabin = ({
//     setCurrentCabinId,
// }: {
//     setCurrentCabinId: Dispatch<SetStateAction<number | undefined>>;
// }) => {
//     const [showModal, setShowModal] = useState(false);
//     const onCloseModal = () => setShowModal?.(false);
//     return (
//         <>
//             {showModal &&
//                 createPortal(
//                     <Modal onCloseModal={onCloseModal}>
// <CreateCabinForm
//     setCurrentCabinId={setCurrentCabinId}
//     cabinFunction={CabinRowFunctions.Create}
//     onCloseModal={onCloseModal}
// />
//                     </Modal>,
//                     document.body
//                 )}
//             <div>
//                 <Button onClick={() => setShowModal((prev) => !prev)}>
//                     {showModal ? "Hide Form" : "Add new cabin"}
//                 </Button>
//             </div>
//         </>
//     );
// };

export default AddCabin;
