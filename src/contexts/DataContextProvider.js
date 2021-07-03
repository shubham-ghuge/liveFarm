import { useContext, createContext, useReducer } from "react";
import { initialState, DataReducer } from "../reducers/DataReducer";
export const DataContext = createContext();
export default function DataContextProvider({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  return (
    <DataContext.Provider
      value={{
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
