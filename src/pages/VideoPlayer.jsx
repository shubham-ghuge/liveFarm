import channelLogo from "../assets/photo1.png";
import { useState } from "react";
import { Dropdown } from "../components";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContextProvider";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { AiOutlineClockCircle, AiFillClockCircle } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import isInPlaylist from "../hooks/functions";
export const VideoPlayer = () => {
  const [toggle, setToggle] = useState(false);
  const { videoId } = useParams();
  const { videoData, playlistData, dispatch } = useDataContext();
  const video = videoData.filter((vid) => vid.id === videoId);
  return (
    <>
      {video.map(({ id, url, name }) => (
        <section key={id} className="video-player nav-adjust">
          <iframe
            src={`https://www.youtube.com/embed/${url}`}
            title="YouTube video player"
            key={id}
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
                      videoId: id,
                      playlistId: "p1",
                      status: !isInPlaylist(playlistData, "p1", id)
                    }
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p1", id) ? (
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
                      videoId: id,
                      playlistId: "p3",
                      status: !isInPlaylist(playlistData, "p3", id)
                    }
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p3", id) ? (
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
                      videoId: id,
                      playlistId: "p2",
                      status: !isInPlaylist(playlistData, "p2", id)
                    }
                  })
                }
              >
                <span>
                  {isInPlaylist(playlistData, "p2", id) ? (
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
                  videoData={id}
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
};
