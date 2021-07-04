export default function isInPlaylist(data, playlistId, videoId) {
  return data.find(
    (item) => item._id === playlistId && item.videos.includes(videoId)
  );
}
