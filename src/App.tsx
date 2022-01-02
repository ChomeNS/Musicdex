import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Playlist } from "./pages/Playlist";

import Frame from "./components/layout/Frame";
import styled from "@emotion/styled";
import { Song } from "./pages/Song";
import { History } from "./pages/History";
import { Search } from "./pages/Search";
import { LikedSongs } from "./pages/LikedSongs";
import { Video } from "./pages/Video";
import { Settings } from "./pages/Settings";
import { Channel } from "./pages/Channel";

function App(this: any) {
  return (
    <Router>
      <Frame>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/playlists/:playlistId" element={<Playlist />}></Route>
          <Route path="/song/:songId" element={<Song />}></Route>
          <Route
            path="/playlists"
            element={
              <InProgress>My Playlists page under construction</InProgress>
            }
          />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/history" element={<History />} />
          <Route path="/search" element={<Search></Search>} />
          <Route path="/video/:id" element={<Video></Video>} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Frame>
    </Router>
  );
}

const InProgress = styled.div`
  font-size: 20px;
`;
export default App;
