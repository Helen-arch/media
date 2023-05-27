import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreatingUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector(state => {
        return state.users;
    });

    useEffect(() => {
        doFetchUsers();
    }, []);

    const handleUserAdd = () => {
        doCreatingUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full"/>;
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else content = data.map(user => {
        return <UsersListItem key={user.id} user={user}/>;
    });

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
                {creatingUserError && 'Creating user error...'}
            </div>
            {content}
        </div>
    );
};

export default UsersList;