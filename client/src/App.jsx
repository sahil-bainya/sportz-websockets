import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  transition-colors duration-300">
        <div className="flex flex-col items-center gap-4 text-3xl">
          <span className="loader">loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5!">
      <Outlet />
    </div>
  );
}

export default App;
