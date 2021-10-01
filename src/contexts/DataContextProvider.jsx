import React from "react";
import axios from "axios";
import { useContext, createContext, useReducer, useEffect } from "react";
import { initialState, DataReducer } from "../reducers/DataReducer";
import { useAuthContext } from "./AuthContextProvider";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const { token } = useAuthContext();

  async function getVideoData() {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.get(
        "https://live-farm.herokuapp.com/videos"
      );
      if (data.success) {
        dispatch({
          type: "INITIALIZE_VIDEOS",
          payload: { videoData: data.response },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING" });
    }
  }
  async function getPlaylists() {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.get(
        "https://live-farm.herokuapp.com/playlists"
      );
      if (data.success) {
        dispatch({
          type: "INITIALIZE_PLAYLIST",
          payload: { playlistData: data.response },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING" });
    }
  }
  function getPlaylistId(name) {
    const [{ _id }] = state.playlistData.filter((i) => i.name === name);
    return _id;
  }
  async function toggleVideoInPlaylist(status, playlistId, videoId) {
    try {
      const { data } = await axios[status ? "patch" : "delete"](
        `https://live-farm.herokuapp.com/playlists/${playlistId}/${videoId}`
      );
      if (data.success) {
        dispatch({
          type: "TOGGLE_VIDEO_IN_PLAYLIST",
          payload: { status, playlistId, videoId },
        });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    token && getPlaylists();
  }, [token]);

  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        videoData: state.videoData,
        playlistData: state.playlistData,
        dispatch,
        toggleVideoInPlaylist,
        getPlaylistId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};
