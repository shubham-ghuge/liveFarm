import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcVideoFile } from "react-icons/fc";
import { useDataContext } from "../../contexts/DataContextProvider";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { Modal } from "../Modal";
import { Alert } from "../Alert";
import axios from "axios";

export function PlaylistListing() {
  const { playlistData, loading, dispatch } = useDataContext();
  const [message, setMessage] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [userAction, setUserAction] = useState(false);

  let navigation = useNavigate();
  async function deletePlaylist(id) {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.delete(
        `https://live-farm.herokuapp.com/playlists/${id}`
      );
      if (data.success) {
        setAlertMessage(data.message);
        dispatch({ type: "REMOVE_PLAYLIST", payload: { playlistId: id } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING" });
    }
  }
  if (userAction && !message) {
    deletePlaylist(playlistId);
    return setUserAction(false);
  }

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {message && (
        <Modal
          heading="Are You Sure?"
          message="if you delete this playlist, it will be permanently lost!"
          confirmAction={() => setUserAction(true)}
          onClose={() => setMessage(null)}
        />
      )}

      <section className="playlist nav-adjust">
        <h3 className="heading">All Playlists</h3>
        <div className="playlist-layout">
          {loading ? (
            <Loader />
          ) : playlistData.length !== 0 ? (
            playlistData.map((item) => (
              <div className="wrapper" key={item._id}>
                {item.name === "liked videos" ||
                item.name === "saved videos" ||
                item.name === "watch later" ? (
                  ""
                ) : (
                  <button
                    className="btn-danger p-1 mx-1 close"
                    onClick={() => {
                      setMessage(true);
                      return setPlaylistId(item._id);
                    }}
                  >
                    <AiOutlineDelete className="fsz-2" />
                  </button>
                )}
                <figure
                  className="playlist-card"
                  onClick={() => navigation(`/playlist/${item._id}`)}
                >
                  <FcVideoFile className="icon-2x" />
                  <figcaption className="playlist-title">
                    <p className="playlist-heading">{item.name}</p>
                    <p>{item.videos.filter((i) => i !== null).length} videos</p>
                  </figcaption>
                </figure>
              </div>
            ))
          ) : (
            <h2 className="c-theme">No playlists found</h2>
          )}
        </div>
      </section>
    </>
  );
}
