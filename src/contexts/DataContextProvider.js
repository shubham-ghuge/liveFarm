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
      dispatch({ type: "LOADING" })
      const { data } = await axios.get("https://live-farm.herokuapp.com/videos");
      if (data.sucess) {
        dispatch({ type: "INITIALIZE_VIDEOS", payload: { videoData: data.response } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING" })
    }
  }
  async function getPlaylists() {
    console.log("in playlist call");
    try {
      console.log(axios.defaults.headers.common["Authorization"]);
      const { data } = await axios.get("https://live-farm.herokuapp.com/playlists");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    token && getPlaylists();
  }, [])

  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        videoData: state.videoData,
        playlistData: state.playlistData,
        dispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};
