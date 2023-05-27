import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import useThunk from "../hooks/use-thunk";
import { removeUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

const UsersListItem = ({user}) => {
    const [onRemoveUser, isLoading, error] = useThunk(removeUser);

    const header = <>
        <Button className="m-3" loading={isLoading} onClick={() => onRemoveUser(user)}>
            <GoTrashcan/>
        </Button>
        {error && <div>Error deleting user</div>}
        {user.name}
    </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    );
}

export default UsersListItem;