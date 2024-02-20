import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Main from "./Routes/Main.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import YoutubeContextProvider from "./Store/MyYoutubeStore.jsx";
import Video from "./Routes/Video.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/Video/:CategoryId/:videoId", element: <Video /> },
    ],
  },
  ,
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <YoutubeContextProvider>
      <RouterProvider router={route} />
    </YoutubeContextProvider>
  </React.StrictMode>
);
