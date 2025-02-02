"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  spotifyUrl: string;
}

const SpotifyEmbed = ({ spotifyUrl }: Props) => {
  const [isError, setIsError] = useState(false);

  // Przekształć URL Spotify na format embed
  const getEmbedUrl = (url: string) => {
    // Obsługa różnych formatów URL Spotify
    const trackMatch = url.match(/track\/([a-zA-Z0-9]+)/);
    const playlistMatch = url.match(/playlist\/([a-zA-Z0-9]+)/);
    const albumMatch = url.match(/album\/([a-zA-Z0-9]+)/);

    if (trackMatch) {
      return `https://open.spotify.com/embed/track/${trackMatch[1]}`;
    } else if (playlistMatch) {
      return `https://open.spotify.com/embed/playlist/${playlistMatch[1]}`;
    } else if (albumMatch) {
      return `https://open.spotify.com/embed/album/${albumMatch[1]}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(spotifyUrl);

  if (!embedUrl || isError) {
    return (
      <div className="w-full p-4 border border-gray-300 rounded-xl">
        <p className="text-gray-200 mb-2">Zawartość Spotify jest niedostępna</p>
        <Link 
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue hover:underline"
        >
          Otwórz w Spotify
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <iframe
        className="rounded-xl w-full"
        src={embedUrl}
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default SpotifyEmbed; 