import { Headings, ModalWindows } from "@/types/enums";
import Heading from "../ui/Heading";
import { Button, Modal } from "@/ui";
import SignupForm from "@/features/authentication/SignupForm";
import UserTable from "@/features/authentication/UserTable";

function NewUsers() {
    return (
        <>
            <UserTable />
            <Heading as={Headings.H2} text='Users management' />
            <Modal>
                <Modal.Open opens={ModalWindows.UserLoginForm}>
                    <Button>Create</Button>
                </Modal.Open>
                <Modal.Window name={ModalWindows.UserLoginForm}>
                    <SignupForm />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default NewUsers;
