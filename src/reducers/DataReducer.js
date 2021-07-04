export const initialState = {
  videoData: [
    {
      _id: "1",
      description: "lorem in",
      name: "Modern Farming Technology & Amazing Agriculture Machines",
      url: "TVCGdjqHJW4",
      thumbnail: "amazing-ideas.png"
    },
    {
      _id: "2",
      description: "lorem in",
      name: "Amazing Farming ideas for Your Home & Garden",
      url: "YDcakKDJWv0",
      thumbnail: "farm-techniques.png"
    },
    {
      _id: "3",
      description: "lorem in",
      name: "Awesome Hydroponic Strawberries Farming",
      url: "1IwKWYNycj8",
      thumbnail: "strawberries.png"
    },
    {
      _id: "4",
      description: "lorem in",
      name: "15 Modern Farming Technologies that are NEXT LEVEL",
      url: "DoVGbPa0jHw",
      thumbnail: "farming-tech.png"
    }
  ],
  playlistData: [
    {
      name: "Liked Videos",
      _id: "p1",
      videos: []
    },
    {
      name: "Saved Videos",
      _id: "p2",
      videos: []
    },
    {
      name: "Watch Later",
      _id: "p3",
      videos: []
    }
  ],
  loading: false
};

export function DataReducer(state, action) {

  switch (action.type) {

    case "LOADING":
      return { ...state, loading: !state.loading };

    case "INITIALIZE_VIDEOS":
      const { videoData } = action.payload;
      return { ...state, videoData };

    case "INITIALIZE_PLAYLIST":
      const { playlistData } = action.payload;
      return { ...state, playlistData }

    default:
      return state;
  }
}
