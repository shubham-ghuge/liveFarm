import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, PrivateRoute } from "./components";
import { PlaylistListing, Playlist } from "../Playlist";
import { Home } from "../Home";
import { Account } from "../Account";
import { NotFound } from "../NotFound";
import { VideoPlayer } from "../VideoPlayer";
import { Auth } from "../Auth";
import { Login, Register } from "../Auth/components";

export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <Route path="*" element={<NotFound />} />
        <PrivateRoute path="/playlist/:playlistId" element={<Playlist />} />
        <PrivateRoute path="/playlist" element={<PlaylistListing />} />
        <PrivateRoute path="/account" element={<Account />} />
      </Routes>
    </main>
  );
}
