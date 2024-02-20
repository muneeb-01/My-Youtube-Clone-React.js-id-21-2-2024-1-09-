import { createContext, useEffect, useState } from "react";
import { API_KEY } from "./data";
import axios from "axios";
import { PiCheckLight } from "react-icons/pi";

export const YoutubeContext = createContext({});
const YoutubeContextProvider = ({ children }) => {
  //Home Videos Fetching
  const [sidebar, setSidebar] = useState(true);
  const [category, setCategory] = useState(0);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(10);

  const fetchingState = async () => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${result}&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );
      setData(response.data.items);
    } catch {
      console.warn("Something went wrong");
    }
  };

  useEffect(() => {
    setData([]);
    fetchingState();
  }, [category]);

  useEffect(() => {
    fetchingState();
  }, [result]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.scrollHeight
      ) {
        setResult(result + 10);
      }
    } catch (error) {
      console.warn("something went wrong");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [result]);

  return (
    <YoutubeContext.Provider
      value={{ sidebar, setSidebar, setCategory, category, data }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};

export default YoutubeContextProvider;
