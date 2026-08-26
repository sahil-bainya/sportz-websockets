import { useState } from "react";
import { Header, Match, Commentary } from "../components";
import { useGetMatchesQuery } from "../store/matchesApi";

export default function Home() {
  const { data, isLoading, error } = useGetMatchesQuery();
  const [filter, setFilter] = useState(null);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
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
            <div className="flex gap-2">
              
              <div className="flex gap-2">
                <select
                  className="w-full bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-lg px-2! py-1! text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  defaultValue={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="" defaultChecked>All</option>
                  <option value="cricket">Cricket</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                </select>
              </div>
              <div className="bg-gray-300 border-2 border-gray-500 rounded-lg px-2! pb-1! font-bold">
                Total Matches : {data.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {data?.map((match) => (
              <div key={match.id}>
                <Match
                  sportName={match.sport}
                  status={match.status}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  homeScore={match.homeScore}
                  awayScore={match.awayScore}
                  startTime={match.startTime}
                  endTime={match.endTime}
                  homeTeamWickets={match.homeTeamWickets}
                  awayTeamWickets={match.awayTeamWickets}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md min-h-0">
          <Commentary />
        </div>
      </div>
    </div>
  );
}
