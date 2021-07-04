import React from "react";
import channelLogo from "../../assets/photo1.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { AiOutlineClockCircle, AiFillClockCircle } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { Dropdown } from "./components";
import { useDataContext } from "../../contexts/DataContextProvider";
import isInPlaylist from "../../utils";

export function VideoPlayer() {
  const [toggle, setToggle] = useState(false);
  const { videoId } = useParams();
  const { videoData, playlistData, dispatch } = useDataContext();
  const video = videoData.filter((vid) => vid._id === videoId);

  return (
    <>
      {video.map(({ _id, url, name }) => (
        <section key={_id} className="video-player nav-adjust">
          <iframe
            src={`https://www.youtube.com/embed/${url}`}
            title="YouTube video player"
            key={_id}
            allowFullScreen
          ></iframe>
          <div className="video-player-description">
            <div className="video-player-actions">
              <button
                className="icon-btn-base btn-addon"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_VIDEO_IN_PLAYLIST",
                    payload: {
                      videoId: _id,
                      playlistId: "p1",
                      status: !isInPlaylist(playlistData, "p1", _id),
                    },
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p1", _id) ? (
                    <IoMdHeart className="icon" />
                  ) : (
                    <IoMdHeartEmpty className="icon" />
                  )}
                </span>
                <span className="text">Like</span>
              </button>
              <button
                className="icon-btn-base btn-addon"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_VIDEO_IN_PLAYLIST",
                    payload: {
                      videoId: _id,
                      playlistId: "p3",
                      status: !isInPlaylist(playlistData, "p3", _id),
                    },
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p3", _id) ? (
                    <AiFillClockCircle className="icon" />
                  ) : (
                    <AiOutlineClockCircle className="icon" />
                  )}
                </span>
                <span className="text">later</span>
              </button>
              <button
                className="icon-btn-base btn-addon"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_VIDEO_IN_PLAYLIST",
                    payload: {
                      videoId: _id,
                      playlistId: "p2",
                      status: !isInPlaylist(playlistData, "p2", _id),
                    },
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p2", _id) ? (
                    <BsBookmarkFill className="icon" />
                  ) : (
                    <BsBookmark className="icon" />
                  )}
                </span>
                <span className="text">save</span>
              </button>
              <button
                className="icon-btn-base btn-addon"
                onClick={() => setToggle((curr) => (curr = !curr))}
              >
                <span>
                  <FiPlusCircle
                    className="icon"
                    style={toggle && { transform: "rotate(45deg)" }}
                  />
                </span>
                <span className="text">{toggle ? "close" : "add"}</span>
              </button>
              {
                <Dropdown
                  videoData={_id}
                  customStyle={
                    toggle ? { display: "block" } : { display: "none" }
                  }
                />
              }
            </div>
            <div className="video-player-user">
              <div className="u-info">
                <img src={channelLogo} alt="channel logo" />
                <h4 className="channel-name">Lorem, ipsum.</h4>
                <p className="sub-count">25k Subscribers</p>
              </div>
            </div>
            <div className="wrapper">
              <h3 className="video-player-title">{name}</h3>
              <p className="video-player-desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                in, aperiam animi, modi similique odio itaque ipsam doloribus
                temporibus exercitationem neque non perspiciatis maiores facere?
                Voluptates pariatur nemo adipisci voluptatem!
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
