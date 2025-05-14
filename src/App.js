import React, { useState } from "react";
import "./App.css";
import { Howl } from "howler";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const calmTrack = new Howl({ src: ["calm.mp3"], loop: true, volume });
  const intenseTrack = new Howl({ src: ["intense.mp3"], loop: true, volume });

  const playTrack = (track) => {
    if (track === "calm") {
      calmTrack.play();
      setCurrentTrack("calm");
    } else {
      intenseTrack.play();
      setCurrentTrack("intense");
    }
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    calmTrack.pause();
    intenseTrack.pause();
    setIsPlaying(false);
  };

  const changeVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    calmTrack.volume(newVolume);
    intenseTrack.volume(newVolume);
  };

  return (
    <div className="App">
      <h1>Jukebox JDR</h1>
      <div>
        <button onClick={() => playTrack("calm")}>Play Calme</button>
        <button onClick={() => playTrack("intense")}>Play Intense</button>
        <button onClick={pauseTrack}>Pause</button>
      </div>
      <div>
        <label>Volume: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={changeVolume}
        />
      </div>
      <div>{isPlaying ? <p>Playing: {currentTrack}</p> : <p>Paused</p>}</div>
    </div>
  );
}

export default App;
