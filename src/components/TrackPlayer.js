import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

function TrackPlayer({ track, initialVersion = "calm", volume, onTrackEnd }) {
  const [currentVersion, setCurrentVersion] = useState(initialVersion);
  const [isPlaying, setIsPlaying] = useState(false);
  const howlRef = useRef(null);

  // Lance la piste quand le composant est monté ou quand track/version change
  useEffect(() => {
    playVersion(currentVersion);

    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
      }
    };
  }, [track, currentVersion]);

  // Met à jour le volume si modifié
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
  }, [volume]);

  const playVersion = (versionKey) => {
    if (!track || !track.versions[versionKey]) return;

    const newHowl = new Howl({
      src: [track.versions[versionKey]],
      loop: true,
      volume: 0,
      onend: onTrackEnd,
    });

    // Fade in
    newHowl.play();
    newHowl.fade(0, volume, 1000);

    // Fade out ancien son
    if (howlRef.current) {
      howlRef.current.fade(volume, 0, 1000);
      setTimeout(() => {
        howlRef.current.stop();
        howlRef.current.unload();
      }, 1000);
    }

    howlRef.current = newHowl;
    setIsPlaying(true);
  };

  const pause = () => {
    if (howlRef.current) {
      howlRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (howlRef.current) {
      howlRef.current.play();
      setIsPlaying(true);
    }
  };

  const switchVersion = (versionKey) => {
    if (versionKey !== currentVersion) {
      setCurrentVersion(versionKey);
    }
  };

  return (
    <div className="track-player">
      <h2>Lecture : {track.title}</h2>
      <div>
        <button onClick={isPlaying ? pause : resume}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        {Object.keys(track.versions).map((versionKey) => (
          <button
            key={versionKey}
            onClick={() => switchVersion(versionKey)}
            disabled={versionKey === currentVersion}
          >
            {versionKey}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TrackPlayer;
