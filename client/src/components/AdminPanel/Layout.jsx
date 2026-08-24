import { useState } from "react";
import { Sidebar, Dashboard, CreateMatch} from "../";

export default function Layout() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Create Match":
        return <CreateMatch onBack={() => setActivePage("Dashboard")} />;
      case "Logout":
        return <div className="p-6!">Logout ho gaye</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="py-2!">
      <div className="h-full w-full border-2 border-black rounded-2xl overflow-hidden flex ">
        <Sidebar active={activePage} onNavigate={setActivePage} />
        <div className="flex-1 min-h-0 w-full">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}