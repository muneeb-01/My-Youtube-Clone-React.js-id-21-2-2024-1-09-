import React, { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { MdLibraryMusic } from "react-icons/md";
import {
  IoIosNotificationsOutline,
  IoMdNotificationsOff,
} from "react-icons/io";

import { API_KEY } from "../Store/data";
import moment from "moment";
import { VALUE_CONVERTER } from "../Store/data";
import { fetchingVideoData } from "../Store/Functions";
import { fetchingCommentInfo } from "../Store/Functions";
import { useParams } from "react-router-dom";

function VideoPlayerContainer() {
  const [subscribe, setSubscribe] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const { videoId } = useParams();

  useEffect(() => {
    fetchingVideoData(videoId, API_KEY, setApiData, setChannelId);
  }, [videoId]);

  useEffect(() => {
    fetchingCommentInfo(
      channelId,
      API_KEY,
      setChannelData,
      videoId,
      setComments
    );
  }, [apiData]);

  return (
    <div
      className=" w-[75%]
  "
    >
      <div className="w-full rounded-lg h-[70vh]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-[0.5vw]">
        <h3 className="text-[1.1vw] font-semibold">
          {apiData ? apiData.snippet.title : "Title Here"}
        </h3>
        <div className=" flex justify-between items-center">
          <div className="mt-[0.3vw] flex gap-[1.3vw] justify-start items-center">
            <div className="size-[2vw]  rounded-full overflow-hidden">
              <img
                src={channelData && channelData.snippet.thumbnails.default.url}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-[0.91vw] font-semibold">
                {apiData ? apiData.snippet.channelTitle : "Name"}
              </h3>
              <p className="text-[0.75vw] font-light">
                {channelData &&
                  VALUE_CONVERTER(channelData.statistics.subscriberCount) +
                    " Subscribers"}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSubscribe(!subscribe)}
                className={`bg-red-500 ${
                  subscribe
                    ? "bg-white text-black border border-black"
                    : " text-white"
                } text-[0.8vw] font-medium  px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              >
                <span>
                  {subscribe ? (
                    <IoIosNotificationsOutline className="text-[1.2vw]" />
                  ) : (
                    <IoMdNotificationsOff className="text-[1.2vw]" />
                  )}
                </span>{" "}
                {subscribe ? "subscribed" : "Subscribe"}
                {/* <span>
                  <IoIosArrowDown className="text-[1.2vw]" />
                </span> */}
              </button>
            </div>
          </div>
          <div className="font-medium flex justify-center items-center gap-3">
            <div className="flex justify-center items-center rounded-full overflow-hidden">
              <button
                onClick={() => {
                  setLike(!like);
                  setDisLike(like);
                }}
                className=" flex justify-center py-1 px-3 items-center text-[0.8vw] gap-2 bg-slate-100 hover:bg-slate-200"
              >
                {like ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}

                <span>
                  {apiData && VALUE_CONVERTER(apiData.statistics.likeCount)}
                </span>
              </button>
              <button
                onClick={() => {
                  setDisLike(!disLike);
                  setLike(!like);
                }}
                className="py-[5.5px] px-3 bg-slate-100 hover:bg-slate-200"
              >
                {disLike ? (
                  <AiFillDislike size={20} />
                ) : (
                  <AiOutlineDislike size={20} />
                )}
              </button>
            </div>
            <div className="flex justify-center items-center rounded-full overflow-hidden  py-1 px-3  text-[0.8vw] gap-2 bg-slate-100 hover:bg-slate-200">
              <RiShareForwardLine size={20} />
              <span>Share</span>
            </div>
            <div className="flex justify-center items-center rounded-full overflow-hidden  py-1 px-3  text-[0.8vw] gap-2 bg-slate-100 hover:bg-slate-200">
              <MdLibraryMusic size={20} />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg bg-slate-100 shadow-sm mt-[2vw] p-[1.5vw]">
        <p className=" text-zinc-600 font-medium flex gap-3">
          {apiData && VALUE_CONVERTER(apiData.statistics.viewCount) + " Views"}
          <span>
            {apiData && moment(apiData.snippet.publishedAt).fromNow()}
          </span>
        </p>
        <p className=" text-zinc-600 tracking-tight">
          {apiData
            ? apiData.snippet.localized.description.slice(0, 300)
            : "Discription Here"}
        </p>
      </div>
      <div className="p-4 py-[3vw]">
        <h2 className="text-[1vw] font-normal">
          <span>
            {apiData && VALUE_CONVERTER(apiData.statistics.commentCount)}
          </span>{" "}
          Comments
        </h2>
        <div className="w-full flex flex-col">
          {comments &&
            comments.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="CommentBox flex gap-[0.9vw] items-start p-3"
                >
                  <div className="size-[2.3vw] mt-[0.4vw] rounded-full overflow-hidden ">
                    <img
                      src={
                        item.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="flex font-medium items-end gap-[0.5vw]">
                      {item.snippet.topLevelComment.snippet.authorDisplayName}
                      <span className="font-light text-[0.7vw]">
                        {moment(
                          item.snippet.topLevelComment.snippet.publishedAt
                        ).fromNow()}
                      </span>
                    </h3>
                    <p className="text-[0.85vw]">
                      {item.snippet.topLevelComment.snippet.textDisplay}
                    </p>
                    <div className="mt-2 flex items-center gap-[1vw]">
                      <div className="flex">
                        <AiOutlineLike size={20} />
                        <span>
                          {" " +
                            VALUE_CONVERTER(
                              item.snippet.topLevelComment.snippet.likeCount
                            )}
                        </span>
                      </div>
                      <div className="flex">
                        <AiOutlineDislike size={20} />
                        <span>{" " + Math.floor(Math.random() * 200)}</span>
                      </div>
                      <p className="text-center">reply</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerContainer;
