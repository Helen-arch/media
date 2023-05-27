import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import {useRemoveAlbumMutation} from "../store";
import PhotosList from "./PhotosList";

const AlbumsListItem = ({ album }) => {
    const [ removeAlbum, results ] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = <>
        <Button className="m-3" onClick={handleRemoveAlbum} loading={results.isLoading}>
            <GoTrashcan/>
        </Button>
        {album.title}
    </>

    return <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}/>
    </ExpandablePanel>
}

export default AlbumsListItem;