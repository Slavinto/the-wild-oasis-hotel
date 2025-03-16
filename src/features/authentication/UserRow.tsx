import { userTypeToTagName } from "@/types/constants";
import { Menu, Modal, Table, Tag } from "@/ui";
import { formatDistanceFromNow } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import {
    HiEllipsisVertical,
    HiOutlineEyeSlash,
    HiOutlineTrash,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import { AppEntities, AppOperations, ModalWindows } from "@/types/enums";
import ConfirmOperation from "@/ui/ConfirmOperation";
import { useDeleteUser } from "./useDeleteUser";

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Highlighted = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const UserRow = ({ user }: { user: User }) => {
    const { deleteUser, isDeleting } = useDeleteUser();

    const userType = user?.email_confirmed_at ? "user" : "unconfirmed";
    return (
        <Table.Row>
            <UserAvatar user={user} />
            <Stacked>{user.user_metadata.fullName}</Stacked>
            <Stacked>
                <Tag $type={userTypeToTagName[userType]}>{userType}</Tag>
                {user.role}
            </Stacked>
            <Stacked>
                <Highlighted>{user.email}</Highlighted>
            </Stacked>
            <Stacked>
                {userType === "user"
                    ? formatDistanceFromNow(user.last_sign_in_at || "")
                    : "Haven't logged in yet"}
            </Stacked>
            <Menu id={user.id}>
                <Menu.Toggle>
                    <HiEllipsisVertical />
                </Menu.Toggle>
                <Menu.List>
                    <Menu.Button onClick={() => {}} disabled={false}>
                        <HiOutlineUserCircle />
                        <span>Update</span>
                    </Menu.Button>
                    <Menu.Button disabled={false}>
                        <HiOutlineEyeSlash />
                        <span>Suspend</span>
                    </Menu.Button>
                    <Modal>
                        <Modal.Open opens={ModalWindows.DeleteUserConfirm}>
                            <Menu.Button onClick={() => {}} disabled={false}>
                                <HiOutlineTrash />
                                <span>Delete</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window name={ModalWindows.DeleteUserConfirm}>
                            <ConfirmOperation
                                onConfirm={() => deleteUser(user.id)}
                                disabled={isDeleting}
                                resourceName={AppEntities.User}
                                operation={AppOperations.Delete}
                            />
                        </Modal.Window>
                    </Modal>
                </Menu.List>
            </Menu>
        </Table.Row>
    );
};

export default UserRow;
