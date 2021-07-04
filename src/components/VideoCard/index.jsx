import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDataContext } from "../../contexts/DataContextProvider";

export function VideoCard({ videoDetails, showDelete, playlistId }){
  let navigation = useNavigate();
  const { dispatch } = useDataContext();
  function navigateToVideo() {
    return navigation(`/video/${videoDetails._id}`);
  }
  return (
    <figure className="video-card" key={videoDetails._id}>
      <img
        src={`https://img-assets.netlify.app/video-thumbnails/${videoDetails.thumbnail}`}
        alt="thumbnail"
        className="video-card-thumbnail"
        loading="lazy"
        onClick={navigateToVideo}
      />
      {showDelete && (
        <button
          className="btn-danger p-1 mx-1 close"
          onClick={() =>
            dispatch({
              type: "TOGGLE_VIDEO_IN_PLAYLIST",
              payload: {
                videoId: videoDetails._id,
                playlistId: playlistId,
                status: false,
              },
            })
          }
        >
          <AiOutlineDelete className="fsz-2" />
        </button>
      )}
      <figcaption className="video-card-details" onClick={navigateToVideo}>
        <p className="channel-name">
          User Name <span className="date">jan 12, 2021</span>
        </p>
        <h4 className="video-card-title">{videoDetails.name}</h4>
        <p className="video-card-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio magnam
          fuga voluptatum sunt at. Perferendis unde perspiciatis aliquam
          cupiditate id.
        </p>
        <div className="video-card-stats">
          <span className="count">
            <i className="icon bx bx-show-alt"></i>23 views
          </span>
          <span className="likes">
            <i className="icon bx bxs-heart"></i>23 likes
          </span>
        </div>
      </figcaption>
    </figure>
  );
};
