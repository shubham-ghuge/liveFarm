import React from "react";
import { FcVideoFile } from "react-icons/fc";
import { useDataContext } from "../../contexts/DataContextProvider";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";

export function PlaylistListing() {
  const { playlistData, loading } = useDataContext();
  let navigation = useNavigate();
  return (
    <section className="playlist nav-adjust">
      <h3 className="heading">All Playlists</h3>
      <div className="playlist-layout">
        {loading ? (
          <Loader />
        ) : (
          playlistData.map((item) => (
            <figure
              className="playlist-card"
              onClick={() => navigation(`/playlist/${item._id}`)}
              key={item._id}
            >
              <FcVideoFile className="icon-2x" />
              <figcaption className="playlist-title">
                <p className="playlist-heading">{item.name}</p>
                <p>{item.videos.length} videos</p>
              </figcaption>
            </figure>
          ))
        )}
      </div>
    </section>
  );
}
