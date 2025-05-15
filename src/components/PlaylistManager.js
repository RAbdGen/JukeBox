import React, { useEffect, useState } from "react";

function PlaylistManager({ onPlaylistChange }) {
  const [playlist, setPlaylist] = useState([]);
  const [title, setTitle] = useState("");
  const [calmFile, setCalmFile] = useState(null);
  const [intenseFile, setIntenseFile] = useState(null);

  // Charger la playlist sauvegardée
  useEffect(() => {
    const saved = localStorage.getItem("jukebox-playlist");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPlaylist(parsed);
      onPlaylistChange(parsed);
    }
  }, [onPlaylistChange]);

  // Sauvegarder à chaque modification
  useEffect(() => {
    localStorage.setItem("jukebox-playlist", JSON.stringify(playlist));
    onPlaylistChange(playlist);
  }, [playlist, onPlaylistChange]);

  const handleAddTrack = () => {
    if (!title || !calmFile || !intenseFile) return;

    const newTrack = {
      id: Date.now(),
      title,
      versions: {
        calm: URL.createObjectURL(calmFile),
        intense: URL.createObjectURL(intenseFile),
      },
    };

    setPlaylist((prev) => [...prev, newTrack]);
    setTitle("");
    setCalmFile(null);
    setIntenseFile(null);
  };

  const handleRemoveTrack = (id) => {
    setPlaylist((prev) => prev.filter((track) => track.id !== id));
  };

  return (
    <div className="playlist-manager">
      <h2>Ajouter une musique</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label>Version calme:</label>
        <input
          type="file"
          accept="audio/mp3"
          onChange={(e) => setCalmFile(e.target.files[0])}
        />
      </div>
      <div>
        <label>Version intense:</label>
        <input
          type="file"
          accept="audio/mp3"
          onChange={(e) => setIntenseFile(e.target.files[0])}
        />
      </div>
      <button onClick={handleAddTrack}>Ajouter</button>

      <h3>Playlist</h3>
      <ul>
        {playlist.map((track) => (
          <li key={track.id}>
            {track.title}{" "}
            <button onClick={() => handleRemoveTrack(track.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistManager;
