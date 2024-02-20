import React, { useContext, useEffect } from "react";
import { YoutubeContext } from "../Store/MyYoutubeStore";
import { Link } from "react-router-dom";
import { VALUE_CONVERTER } from "../Store/data";
import moment from "moment";
function HomeVideosContainer() {
  const { data } = useContext(YoutubeContext);
  console.log(data);

  return (
    <div className="w-[100%] p-[3vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 bg-slate-50">
      {data.map((item, idx) => {
        return (
          <Link
            onClick={() => (document.documentElement.scrollTop = 0)}
            key={idx}
            to={`Video/${item.snippet.categoryId}/${item.id}`}
            className="card p-3 "
          >
            <div className="image-container w-[full] object-cover object-center bg-slate-300 rounded-md overflow-hidden">
              <img
                src={item.snippet.thumbnails.medium.url}
                alt=""
                className="w-full"
              />
            </div>
            <div className="pl-2">
              <h2 className="titles text-[1vw] font-semibold">
                {item.snippet.title}
              </h2>
              <h3 className="flex justify-start items-center gap-1 text-[0.8vw] text-slate-600">
                <div className="size-[1.2vw] rounded-full bg-slate-400 overflow-hidden">
                  <img
                    src={item.snippet.thumbnails.default.url}
                    className="w-100% object-cover object-center"
                    alt=""
                  />
                </div>{" "}
                {item.snippet.channelTitle}
              </h3>
              <p className="text-[0.7vw] flex gap-2">
                {VALUE_CONVERTER(item.statistics.viewCount)}
                <span>{moment(item.snippet.publishedAt).fromNow()}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HomeVideosContainer;
