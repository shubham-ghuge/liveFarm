import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDataContext } from "../../contexts/DataContextProvider";
import { Loader } from "../Loader";

export function VideoCard({ videoDetails, showDelete, playlistId }) {
  let navigation = useNavigate();
  const { toggleVideoInPlaylist, loading } = useDataContext();
  function navigateToVideo() {
    return navigation(`/video/${videoDetails._id}`);
  }
  return (
    <>
      {loading ? (
        <div className="d-flex jc-center ai-center nav-adjust h-30">
          <Loader />
        </div>
      ) : (
        <figure className="video-card" key={videoDetails._id}>
          <img
            src={videoDetails.thumbnail}
            alt="thumbnail"
            className="video-card-thumbnail"
            loading="lazy"
            onClick={navigateToVideo}
          />
          {showDelete && (
            <button
              className="btn-danger p-1 mx-1 close"
              onClick={() =>
                toggleVideoInPlaylist(false, playlistId, videoDetails._id)
              }
            >
              <AiOutlineDelete className="fsz-2" />
            </button>
          )}
          <figcaption className="video-card-details" onClick={navigateToVideo}>
            <h2 className="video-card-title">{videoDetails.name}</h2>
            <p className="video-card-description">{videoDetails.description}</p>
          </figcaption>
        </figure>
      )}
    </>
  );
}
