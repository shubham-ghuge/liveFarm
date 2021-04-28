import { useParams, Link } from "react-router-dom";
import { useDataContext } from "../contexts/DataContextProvider";
import { VideoCard } from "../components";
import { FiTrash2 } from "react-icons/fi";
export const Playlist = () => {
  const { playlistId } = useParams();
  const { videoData, playlistData } = useDataContext();
  const [{ videos: playlistVideos }] = playlistData.filter(
    ({ id }) => id === playlistId
  );
  const videosInPlaylist = videoData.filter((item) =>
    playlistVideos.includes(item.id)
  );
  const [playlistName] = playlistData.filter((i) => i.id === playlistId);

  return (
    <section className="playlist nav-adjust">
      <h3 className="heading d-flex jc-space-between mb-2">
        {playlistName.name}
        <button className="btn-danger btn-addon">
          <FiTrash2 />
        </button>
      </h3>
      {videosInPlaylist.length !== 0 ? (
        videosInPlaylist.map((video, idx) => (
          <VideoCard videoDetails={video} key={idx} />
        ))
      ) : (
        <div className="d-block text-center">
          <h4 className="text-primary mt-4 mb-7">No videos in here</h4>
          <Link className="btn-primary" to="/">
            Explore
          </Link>
        </div>
      )}
    </section>
  );
};
