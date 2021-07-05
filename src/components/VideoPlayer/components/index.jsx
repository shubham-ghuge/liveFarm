import axios from "axios";
import React from "react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDataContext } from "../../../contexts/DataContextProvider";
import isInPlaylist from "../../../utils";
import { Alert } from "../../Alert";

export const Dropdown = ({ videoData }) => {
  const { playlistData, dispatch, toggleVideoInPlaylist } = useDataContext();
  const [newPlaylist, setNewPlaylist] = useState("");
  const [message, setMessage] = useState(null);
  async function addNewPlaylist(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://live-farm.herokuapp.com/playlists",
        { videoId: videoData, name: newPlaylist }
      );
      if (data.success) {
        dispatch({
          type: "ADD_NEW_PLAYLIST",
          payload: {
            id: data.id,
            videoId: videoData,
            playlistName: newPlaylist,
          },
        });
        return setNewPlaylist("");
      }
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message && <Alert message={message} onClose={() => setMessage(null)} />}
      <div className="dropdown">
        <ul>
          {playlistData &&
            playlistData.map((playlist) => (
              <li className="list" key={playlist._id}>
                <label htmlFor={playlist._id}>
                  <input
                    type="checkbox"
                    checked={
                      isInPlaylist(playlistData, playlist._id, videoData)
                        ? true
                        : false
                    }
                    id={playlist._id}
                    onChange={(e) =>
                      toggleVideoInPlaylist(
                        e.currentTarget.checked,
                        playlist._id,
                        videoData
                      )
                    }
                  />
                  {playlist.name}
                </label>
              </li>
            ))}
          <li>
            <form
              className="input-addon"
              onSubmit={(evt) => addNewPlaylist(evt)}
            >
              <input
                type="text"
                value={newPlaylist}
                onChange={(e) => setNewPlaylist(e.target.value)}
                placeholder="Enter Here"
                required
              />
              <button>
                <FiPlusCircle className="icon" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
};
