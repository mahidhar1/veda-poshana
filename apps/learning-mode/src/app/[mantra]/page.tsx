"use client";
import { mantras } from "@/lib/mantras";
import { AudioPlayer } from "@repo/ui/audio-player";
import { useParams } from "next/navigation";
import React from "react";

const MantraPage = () => {
  const params = useParams<{ mantra: string }>();
  const { mantra } = params;
  const mantraDetails = mantras.filter((obj) => obj.slug === `/${mantra}`)[0];
  return (
    <div>
      <h1>{mantraDetails.title}</h1>
      <main>
        <AudioPlayer
          timeJump={null}
          audioSrc={mantraDetails.audios?.complete}
        />
      </main>
    </div>
  );
};

export default MantraPage;
