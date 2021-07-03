import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PlaylistListing, Playlist } from "../Playlist";
import { Home } from "../Home";
import { Account } from "../Auth";
import { NotFound } from "../NotFound";
import { VideoPlayer } from "../VideoPlayer";

export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<PlaylistListing />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
