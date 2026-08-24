import { Header, Match, Commentary } from "../components";

export default function Home() {
  const api = 7;
  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      
      <div className="px-6! pb-0!">
        <Header />
      </div>

      
      <div className="flex-1 min-h-0 flex gap-6 p-6!">
        
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between mb-4!">
            <div className="flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-200 rounded-full"></span>
              <h2 className="text-xl font-bold text-black">Current Matches</h2>
            </div>
            <div className="badge bg-black text-white font-semibold px-3! py-3!">
              API: {api}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
          </div>
        </div>

      
        <div className="w-full max-w-md min-h-0">
          <Commentary />
        </div>
      </div>
    </div>
  );
}