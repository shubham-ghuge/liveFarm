import channelLogo from "../../assets/photo1.png";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { AiOutlineClockCircle, AiFillClockCircle } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { Dropdown } from "./components";
import { useDataContext } from "../../contexts/DataContextProvider";
import isInPlaylist from "../../utils";
import { Alert } from "../Alert";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import { Loader } from "../Loader";

export function VideoPlayer() {
  const { videoId } = useParams();
  const { userDetails } = useAuthContext();
  const [video, setVideo] = useState(null);
  const [smallLoader, setSmallLoader] = useState(false);
  const {
    videoData,
    playlistData,
    getPlaylistId,
    toggleVideoInPlaylist,
    loading,
  } = useDataContext();
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState(null);
  let navigate = useNavigate();
  const { isUserLoggedIn } = userDetails || {};
  useEffect(() => {
    if (!loading) {
      const video = videoData.filter((vid) => vid._id === videoId);
      setVideo(video);
    }
  }, [loading]);

  async function videoInplaylistHandler(status, playlistId, videoId) {
    try {
      setSmallLoader(true);
      const data = await toggleVideoInPlaylist(status, playlistId, videoId);
      if (data.success) {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSmallLoader(false);
    }
  }

  return (
    <>
      {message && <Alert message={message} onClose={() => setMessage(null)} />}
      {loading ? (
        <div className="d-flex jc-center ai-center h-30">
          <Loader />
        </div>
      ) : (
        video &&
        video.map(({ _id, url, name }) => (
          <section key={_id} className="video-player nav-adjust">
            <iframe
              src={`https://www.youtube.com/embed/${url}`}
              title="YouTube video player"
              key={_id}
              allowFullScreen
            ></iframe>
            <div className="video-player-description">
              {smallLoader ? (
                <Loader size="sm" />
              ) : (
                <div className="video-player-actions">
                  <button
                    className="icon-btn-base btn-addon"
                    onClick={() =>
                      isUserLoggedIn
                        ? videoInplaylistHandler(
                            !isInPlaylist(
                              playlistData,
                              getPlaylistId("liked videos"),
                              _id
                            ),
                            getPlaylistId("liked videos"),
                            _id
                          )
                        : navigate("/auth")
                    }
                  >
                    <span>
                      {isUserLoggedIn &&
                      isInPlaylist(
                        playlistData,
                        getPlaylistId("liked videos"),
                        _id
                      ) ? (
                        <IoMdHeart className="icon" />
                      ) : (
                        <IoMdHeartEmpty className="icon" />
                      )}
                    </span>
                    <span className="text">like</span>
                  </button>
                  <button
                    className="icon-btn-base btn-addon"
                    onClick={() =>
                      isUserLoggedIn
                        ? videoInplaylistHandler(
                            !isInPlaylist(
                              playlistData,
                              getPlaylistId("watch later"),
                              _id
                            ),
                            getPlaylistId("watch later"),
                            _id
                          )
                        : navigate("/auth")
                    }
                  >
                    <span>
                      {isUserLoggedIn &&
                      isInPlaylist(
                        playlistData,
                        getPlaylistId("watch later"),
                        _id
                      ) ? (
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
                      isUserLoggedIn
                        ? videoInplaylistHandler(
                            !isInPlaylist(
                              playlistData,
                              getPlaylistId("saved videos"),
                              _id
                            ),
                            getPlaylistId("saved videos"),
                            _id
                          )
                        : navigate("/auth")
                    }
                  >
                    <span>
                      {isUserLoggedIn &&
                      isInPlaylist(
                        playlistData,
                        getPlaylistId("saved videos"),
                        _id
                      ) ? (
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
                  {toggle && <Dropdown videoData={_id} />}
                </div>
              )}
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
                  temporibus exercitationem neque non perspiciatis maiores
                  facere? Voluptates pariatur nemo adipisci voluptatem!
                </p>
              </div>
            </div>
          </section>
        ))
      )}
    </>
  );
}
