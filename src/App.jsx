import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  const [sidebar, setSidebar] = useState(true);
  const [data, setdata] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      alert("Use in Pc for Better experiance");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
