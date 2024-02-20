export const fetchingRelatedVideos = async (
  CategoryId,
  API_KEY,
  setApiData
) => {
  try {
    const data =
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=42&regionCode=US&videoCategoryId=${CategoryId}&key=${API_KEY} 
    `)
        .then((res) => res.json())
        .then((res) => {
          setApiData(res.items);
        });
  } catch {
    console.warn("Something went wrong");
  }
};

export const fetchingVideoData = async (
  videoId,
  API_KEY,
  setApiData,
  setChannelId
) => {
  try {
    const data = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=US&key=${API_KEY}
    `;
    await fetch(data)
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.items[0]);
        setChannelId(res.items[0].snippet.channelId);
      });
  } catch {
    console.warn("Something went wrong");
  }
};

export const fetchingCommentInfo = async (
  channelId,
  API_KEY,
  setChannelData,
  videoId,
  setComments
) => {
  try {
    if (channelId) {
      const channelInfo =
        await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}
 
      `)
          .then((res) => res.json())
          .then((data) => {
            setChannelData(data.items[0]);
          });
      const CommentData =
        await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}
   
        `)
          .then((res) => res.json())
          .then((data) => {
            setComments(data.items);
          });
    }
  } catch {
    console.warn("Data delay");
  }
};
