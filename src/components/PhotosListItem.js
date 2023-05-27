import {useRemovePhotoMutation} from "../store";
import {GoTrashcan} from "react-icons/go";

const PhotosListItem = ({photo}) => {
  const [ removePhoto ] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return <div key={photo.id} className="m-2 relative cursor-pointer" onClick={handleRemovePhoto} >
    <img alt='photo' src={photo.url} className="h-20 w-20"/>
    <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-70">
      <GoTrashcan className="text-3xl"/>
    </div>
  </div>
};

export default PhotosListItem;