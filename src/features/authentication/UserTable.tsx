import { userTableColumns } from "@/types/constants";
import { AppTables } from "@/types/enums";
import { Spinner, Table } from "@/ui";
import { useGetAllUsers } from "./useGetAllUsers";
import UserRow from "./UserRow";
import { User } from "@supabase/supabase-js";
// import { useEffect } from "react";

const UserTable = () => {
    const { data, isLoading } = useGetAllUsers();
    const users = data?.users;
    const isUserArray = users?.length && users?.length > 0;
    console.log({ users });

    if (!users) {
        return null;
    }

    return isLoading ? (
        <Spinner />
    ) : (
        <Table
            tableType={AppTables.Users}
            columns='4rem 15rem 2fr 4fr 2fr 2rem'
            colNames={userTableColumns}
        >
            <Table.Header />
            {isUserArray && !isLoading ? (
                <Table.Body
                    data={users}
                    render={(user: User) => (
                        <UserRow key={user.email} user={user} />
                    )}
                />
            ) : (
                <Spinner />
            )}
        </Table>
    );
};

export default UserTable;
