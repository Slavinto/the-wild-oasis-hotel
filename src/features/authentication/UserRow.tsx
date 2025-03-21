import { userTypeToTagName } from "@/types/constants";
import { Menu, Modal, Table, Tag } from "@/ui";
import {
    formatDistanceFromNow,
    getUserRole,
    getUserStatus,
} from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import {
    HiEllipsisVertical,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineTrash,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import {
    AppEntities,
    AppOperations,
    ModalWindows,
    UserRoles,
    UserStatus,
} from "@/types/enums";
import ConfirmOperation from "@/ui/ConfirmOperation";
import { useDeleteUser } from "./useDeleteUser";
import UpdateUserDataForm from "./UpdateUserDataForm";
import { useUpdateUser } from "./useUpdateUser";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";

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
    const { updateUser, isUpdating } = useUpdateUser();
    const { user: currentUser } = useSafeGlobalUserContext();

    if (!currentUser) {
        return null;
    }

    const userTag =
        user?.user_metadata.userStatus === UserStatus.Suspended
            ? "suspended_user"
            : user?.user_metadata.userRole === UserRoles.AdvancedUser
            ? UserRoles.AdvancedUser
            : UserRoles.CommonUser;

    const userType =
        user?.user_metadata.userRole === UserRoles.AdvancedUser
            ? UserRoles.AdvancedUser
            : UserRoles.CommonUser;

    const isBusy = isDeleting || isUpdating;

    // allow suspend/activate advanced users only to advanced users
    const allowAdvanced =
        getUserStatus(currentUser) === UserStatus.Active &&
        (getUserRole(user) === UserRoles.CommonUser ||
            (getUserRole(user) === UserRoles.AdvancedUser &&
                getUserRole(currentUser) === UserRoles.AdvancedUser));

    const handleClickSuspend = () => {
        // toggling userStatus between active and suspended
        updateUser({
            userId: user.id,
            userUpdate: {
                userStatus:
                    user.user_metadata.userStatus === UserStatus.Active
                        ? UserStatus.Suspended
                        : UserStatus.Active,
            },
        });
    };

    return user ? (
        <Table.Row>
            <UserAvatar user={user} />
            <Stacked>{user.user_metadata.fullName}</Stacked>
            <Stacked>
                <Tag $type={userTypeToTagName[userTag]}>
                    {userType.replace("_", " ")}
                </Tag>
                {user.user_metadata.userStatus}
            </Stacked>
            <Stacked>
                <Highlighted>{user.email}</Highlighted>
            </Stacked>
            <Stacked>
                {user.last_sign_in_at
                    ? formatDistanceFromNow(user.last_sign_in_at || "")
                    : "Haven't logged in yet"}
            </Stacked>
            {allowAdvanced && (
                <Menu id={user.id}>
                    <Menu.Toggle>
                        <HiEllipsisVertical />
                    </Menu.Toggle>
                    <Menu.List>
                        <Modal>
                            <Modal.Open opens={ModalWindows.UpdateUserForm}>
                                <Menu.Button
                                    onClick={() => {}}
                                    disabled={isBusy}
                                >
                                    <HiOutlineUserCircle />
                                    <span>Update</span>
                                </Menu.Button>
                            </Modal.Open>
                            <Modal.Window name={ModalWindows.UpdateUserForm}>
                                <UpdateUserDataForm userId={user.id} />
                            </Modal.Window>
                        </Modal>
                        {currentUser.email === user.email ? (
                            <></>
                        ) : (
                            <Menu.Button
                                disabled={isBusy}
                                onClick={handleClickSuspend}
                            >
                                {user.user_metadata.userStatus ===
                                UserStatus.Active ? (
                                    <>
                                        <HiOutlineEyeSlash />
                                        <span>Suspend</span>
                                    </>
                                ) : (
                                    <>
                                        <HiOutlineEye />
                                        <span>Activate</span>
                                    </>
                                )}
                            </Menu.Button>
                        )}
                        {
                            // allow deleting users only to advanced user and user
                            // can not delete himself
                            allowAdvanced &&
                                currentUser.email !== user.email && (
                                    <Modal>
                                        <Modal.Open
                                            opens={
                                                ModalWindows.DeleteUserConfirm
                                            }
                                        >
                                            <Menu.Button
                                                onClick={() => {}}
                                                disabled={isBusy}
                                            >
                                                <HiOutlineTrash />
                                                <span>Delete</span>
                                            </Menu.Button>
                                        </Modal.Open>
                                        <Modal.Window
                                            name={
                                                ModalWindows.DeleteUserConfirm
                                            }
                                        >
                                            <ConfirmOperation
                                                onConfirm={() =>
                                                    deleteUser(user.id)
                                                }
                                                disabled={isDeleting}
                                                resourceName={AppEntities.User}
                                                operation={AppOperations.Delete}
                                            />
                                        </Modal.Window>
                                    </Modal>
                                )
                        }
                    </Menu.List>
                </Menu>
            )}{" "}
        </Table.Row>
    ) : null;
};

export default UserRow;
