import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [ addPhoto, results ] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4}/>;
  } else if (error) {
    content = <div>Error loading photos...</div>;
  } else {
    content = data.map(photo => {
      return <PhotosListItem key={photo.id} photo={photo}/>
    });
  }

  return <div>
    <div className="m-2 flex flex-row items-center justify-between">
      <div className="text-lg font-bold">Photos In {album.title}</div>
      <Button loading={results.isLoading} onClick={handleAddPhoto}>
        + Add Photo
      </Button>
    </div>
    <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
  </div>
};

export default PhotosList;