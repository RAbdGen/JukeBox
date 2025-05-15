import React, { useState } from "react";
import "./App.css";
import PlaylistManager from "./components/PlaylistManager";
import TrackList from "./components/Tracklist";
import TrackPlayer from "./components/TrackPlayer";
import PlaylistControls from "./components/PlaylistControls";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const [isRepeatOne, setRepeatOne] = useState(false);
  const [isRepeatAll, setRepeatAll] = useState(false);
  const [isShuffle, setShuffle] = useState(false);

  const currentIndex = playlist.findIndex((t) => t.id === currentTrackId);
  const currentTrack = playlist.find((t) => t.id === currentTrackId);

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const playNext = () => {
    if (isRepeatOne) return;

    if (isShuffle) {
      const otherTracks = playlist.filter((_, i) => i !== currentIndex);
      if (otherTracks.length > 0) {
        const randomTrack =
          otherTracks[Math.floor(Math.random() * otherTracks.length)];
        setCurrentTrackId(randomTrack.id);
      }
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < playlist.length) {
        setCurrentTrackId(playlist[nextIndex].id);
      } else if (isRepeatAll) {
        setCurrentTrackId(playlist[0]?.id);
      }
    }
  };

  const playPrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTrackId(playlist[prevIndex].id);
    } else if (isRepeatAll) {
      setCurrentTrackId(playlist[playlist.length - 1]?.id);
    }
  };

  return (
    <div className="App">
      <h1>Jukebox JDR</h1>

      <PlaylistManager onPlaylistChange={setPlaylist} />

      <TrackList
        playlist={playlist}
        currentTrackId={currentTrackId}
        onSelectTrack={setCurrentTrackId}
      />

      {currentTrack && (
        <TrackPlayer
          track={currentTrack}
          initialVersion="calm"
          volume={volume}
          onTrackEnd={playNext}
        />
      )}

      <PlaylistControls
        onNext={playNext}
        onPrev={playPrev}
        isRepeatOne={isRepeatOne}
        isRepeatAll={isRepeatAll}
        isShuffle={isShuffle}
        setRepeatOne={setRepeatOne}
        setRepeatAll={setRepeatAll}
        setShuffle={setShuffle}
      />

      <div style={{ marginTop: "1rem" }}>
        <label>Volume: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default App;
