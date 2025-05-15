import React from "react";

function TrackList({ playlist, currentTrackId, onSelectTrack }) {
  if (!playlist || playlist.length === 0) {
    return <p>Aucune piste dans la playlist.</p>;
  }

  return (
    <div className="track-list">
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track) => (
          <li
            key={track.id}
            style={{
              fontWeight: track.id === currentTrackId ? "bold" : "normal",
              cursor: "pointer",
            }}
            onClick={() => onSelectTrack(track.id)}
          >
            🎵 {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
