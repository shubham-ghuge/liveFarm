import React from "react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDataContext } from "../../../contexts/DataContextProvider";
import isInPlaylist from "../../../utils";

export const Dropdown = ({ videoData }) => {
  const { playlistData, dispatch } = useDataContext();
  const [newPlaylist, setNewPlaylist] = useState("");
  
  function addNewPlaylist(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_NEW_PLAYLIST",
      payload: { videoId: videoData, playlistName: newPlaylist },
    });
    return setNewPlaylist("");
  }

  return (
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
                    dispatch({
                      type: "TOGGLE_VIDEO_IN_PLAYLIST",
                      payload: {
                        videoId: videoData,
                        playlistId: playlist._id,
                        status: e.currentTarget.checked,
                      },
                    })
                  }
                />
                {playlist.name}
              </label>
            </li>
          ))}
        <li>
          <form className="input-addon" onSubmit={(evt) => addNewPlaylist(evt)}>
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
  );
};
