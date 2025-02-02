"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  videoId: string;
}

const YouTubeEmbed = ({ videoId }: Props) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="w-full p-4 border border-gray-300 rounded-xl">
        <p className="text-gray-200 mb-2">Film jest niedostępny</p>
        <p className="text-gray-200 text-sm mb-3">Odtwarzanie na innych stronach zostało wyłączone przez właściciela</p>
        <Link 
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue hover:underline"
        >
          Obejrzyj na YouTube
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default YouTubeEmbed; 