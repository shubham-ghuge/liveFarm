export default function isInPlaylist(data, playlistId, videoId) {
  return data.find(
    (item) => item.id === playlistId && item.videos.includes(videoId)
  );
}
