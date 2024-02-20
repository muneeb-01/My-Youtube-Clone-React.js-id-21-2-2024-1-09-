import React, { useEffect, useState } from "react";
import { API_KEY, VALUE_CONVERTER } from "../Store/data";
import moment from "moment";
import { Link } from "react-router-dom";
import { fetchingRelatedVideos } from "../Store/Functions";

function RelatedVideoContainer({ CategoryId }) {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetchingRelatedVideos(CategoryId, API_KEY, setApiData);
  }, []);

  return (
    <div className=" w-[25%] flex flex-col ">
      {apiData &&
        apiData.map((item, idx) => {
          return (
            <Link
              onClick={() => (document.documentElement.scrollTop = 0)}
              to={`/Video/${item.snippet.categoryId}/${item.id}`}
              key={idx}
              className="w-full flex gap-[0.6vw] text-wrap mb-[1vw]"
            >
              <div className="max-w-[40%] rounded-md h-[6vw] ">
                <img
                  className="w-full"
                  src={item.snippet.thumbnails.medium.url}
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-medium text-[0.8vw]">
                  {item.snippet.title.slice(0, 30) +
                    (item.snippet.title.length >= 31 && "...")}
                </h3>
                <p className=" mt-2 font-normal text-[0.7vw]">
                  {item.snippet.channelTitle}
                </p>
                <p className="  font-normal text-[0.7vw] flex gap-[0.5vw]">
                  {VALUE_CONVERTER(item.statistics.likeCount)}{" "}
                  <span>{moment(item.snippet.publishedAt).fromNow()}</span>{" "}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default RelatedVideoContainer;
