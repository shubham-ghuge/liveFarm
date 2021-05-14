export const initialState = {
  videoData: [
    {
      id: "1",
      name: "Modern Farming Technology & Amazing Agriculture Machines",
      url: "TVCGdjqHJW4",
      thumbnail: "amazing-ideas.png"
    },
    {
      id: "2",
      name: "Amazing Farming ideas for Your Home & Garden",
      url: "YDcakKDJWv0",
      thumbnail: "farm-techniques.png"
    },
    {
      id: "3",
      name: "Awesome Hydroponic Strawberries Farming",
      url: "1IwKWYNycj8",
      thumbnail: "strawberries.png"
    },
    {
      id: "4",
      name: "15 Modern Farming Technologies that are NEXT LEVEL",
      url: "DoVGbPa0jHw",
      thumbnail: "farming-tech.png"
    }
  ],
  playlistData: [
    {
      name: "Liked Videos",
      id: "p1",
      videos: []
    },
    {
      name: "Saved Videos",
      id: "p2",
      videos: []
    },
    {
      name: "Watch Later",
      id: "p3",
      videos: []
    }
  ]
};

export function DataReducer(state, action) {

  function addToPlaylist(videoId, playlistId) {
    return {
      ...state,
      playlistData: state.playlistData.map((item) => {
        return item.id === playlistId
          ? { ...item, videos: [...item.videos, videoId] }
          : item;
      })
    };
  }

  function removeFromPlaylist(videoId, playlistId) {
    return {
      ...state,
      playlistData: state.playlistData.map((item) => {
        return item.id === playlistId
          ? {
              ...item,
              videos: item.videos.filter((video) => video !== videoId)
            }
          : item;
      })
    };
  }
  
  switch (action.type) {
    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        playlistData: [
          ...state.playlistData,
          {
            id: `${Date.now()}`,
            name: action.payload.playlistName,
            videos: [action.payload.videoId]
          }
        ]
      };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlistData: state.playlistData.filter(
          ({ id }) => id !== action.payload.playlistId
        )
      };

    case "TOGGLE_VIDEO_IN_PLAYLIST":
      return action.payload.status
        ? addToPlaylist(action.payload.videoId, action.payload.playlistId)
        : removeFromPlaylist(action.payload.videoId, action.payload.playlistId);
    
    case "ADD_VIDEO":
      return state;

    default:
      return state;
  }
}
