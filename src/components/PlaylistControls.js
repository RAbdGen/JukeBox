import React from "react";

function PlaylistControls({
  onNext,
  onPrev,
  isRepeatOne,
  isRepeatAll,
  isShuffle,
  setRepeatOne,
  setRepeatAll,
  setShuffle,
}) {
  const toggleRepeat = () => {
    if (!isRepeatOne && !isRepeatAll) {
      setRepeatOne(true);
      setRepeatAll(false);
    } else if (isRepeatOne) {
      setRepeatOne(false);
      setRepeatAll(true);
    } else {
      setRepeatOne(false);
      setRepeatAll(false);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!isShuffle);
  };

  return (
    <div className="playlist-controls">
      <h3>Contrôles Playlist</h3>
      <button onClick={onPrev}>⏮ Précédente</button>
      <button onClick={onNext}>⏭ Suivante</button>
      <button onClick={toggleRepeat}>
        🔁 Repeat: {isRepeatOne ? "1" : isRepeatAll ? "All" : "Off"}
      </button>
      <button onClick={toggleShuffle}>
        🔀 Shuffle: {isShuffle ? "On" : "Off"}
      </button>
    </div>
  );
}

export default PlaylistControls;
