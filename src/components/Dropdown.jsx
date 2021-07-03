import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDataContext } from "../contexts/DataContextProvider";
import isInPlaylist from "../hooks/functions";
export const Dropdown = ({ customStyle, videoData }) => {
  const { playlistData, dispatch } = useDataContext();
  const [newPlaylist, setNewPlaylist] = useState("");
  function addNewPlaylist(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_NEW_PLAYLIST",
      payload: { videoId: videoData, playlistName: newPlaylist }
    });
    return setNewPlaylist("");
  }
  return (
    <>
      <div className="dropdown" style={customStyle}>
        <ul>
          {playlistData && playlistData.map((playlist) => (
            <li className="list" key={playlist.id}>
              <label htmlFor={playlist.id}>
                <input
                  type="checkbox"
                  checked={isInPlaylist(playlistData, playlist.id, videoData) ? true : false}
                  id={playlist.id}
                  onChange={(e) =>
                    dispatch({
                      type: "TOGGLE_VIDEO_IN_PLAYLIST",
                      payload: {
                        videoId: videoData,
                        playlistId: playlist.id,
                        status: e.currentTarget.checked
                      }
                    })
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
