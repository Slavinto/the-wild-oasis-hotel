import { ReactNode } from "react";
import Modal from "./modal/Modal";
import Menu from "./menu/Menu";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";
import { useSafeGlobalUserContext } from "./globalUser/useSafeGlobalUserContext";
import { ModalWindows } from "@/types/enums";

const AccountButton = ({ children }: { children: ReactNode }) => {
    const { user } = useSafeGlobalUserContext();

    return (
        <Modal>
            <Modal.Open opens={ModalWindows.UpdateUserForm}>
                <Menu.Button onClick={() => {}} disabled={false}>
                    {children}
                </Menu.Button>
            </Modal.Open>
            <Modal.Window name={ModalWindows.UpdateUserForm}>
                <UpdateUserDataForm userId={user?.id || ""} />
            </Modal.Window>
        </Modal>
    );
};

export default AccountButton;
