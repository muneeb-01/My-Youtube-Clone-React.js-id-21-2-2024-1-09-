import React, { useState } from "react";
import VideoPlayerContainer from "../Components/VideoPlayerContainer";
import RelatedVideoContainer from "../Components/RelatedVideoContainer";
import { useParams } from "react-router-dom";
function Video() {
  const { CategoryId, videoId } = useParams();
  return (
    <div className="px-[4vw] py-[2vw] flex gap-[2vw]">
      <VideoPlayerContainer videoId={videoId} />
      <RelatedVideoContainer CategoryId={CategoryId} />
    </div>
  );
}

export default Video;
