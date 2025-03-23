import { userTableColumns } from "@/types/constants";
import { AppTables } from "@/types/enums";
import { Spinner, Table } from "@/ui";
import { useGetAllUsers } from "./useGetAllUsers";
import UserRow from "./UserRow";
import { User } from "@supabase/supabase-js";
import styled, { css } from "styled-components";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";

const CurrentUserWrapper = styled.div<{ $isVisible: boolean }>`
    ${(props) =>
        props.$isVisible &&
        css`
            background-color: var(--color-grey-50);
        `}
`;

const UserTable = () => {
    const { data, isLoading } = useGetAllUsers();
    const users = data?.users;
    const isUserArray = users?.length && users?.length > 0;
    const { user: currentUser } = useSafeGlobalUserContext();

    if (!users) {
        return null;
    }

    return isLoading ? (
        <Spinner />
    ) : (
        <Table
            tableType={AppTables.Users}
            columns='4rem 13rem 12rem 4fr 2fr 2rem'
            colNames={userTableColumns}
        >
            <Table.Header />
            {isUserArray && !isLoading ? (
                <Table.Body
                    data={users}
                    render={(user: User) => (
                        <CurrentUserWrapper
                            $isVisible={
                                user.email === currentUser?.email || false
                            }
                        >
                            <UserRow key={user.email} user={user} />
                        </CurrentUserWrapper>
                    )}
                />
            ) : (
                <Spinner />
            )}
        </Table>
    );
};

export default UserTable;
