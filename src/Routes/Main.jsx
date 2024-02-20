import React, { useContext, useState } from "react";
import SideBar from "../Components/SideBar";
import HomeVideosContainer from "../Components/HomeVideosContainer";
import { YoutubeContext } from "../Store/MyYoutubeStore";
import Loading from "../Components/Loading";
function Main() {
  const { data } = useContext(YoutubeContext);
  return (
    <div className="flex ">
      <SideBar />
      {data.length === 0 ? <Loading /> : <HomeVideosContainer />}
    </div>
  );
}

export default Main;
