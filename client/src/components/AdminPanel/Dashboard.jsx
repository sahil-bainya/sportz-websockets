import { Radio, Calendar, MessageSquare } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useGetDashboardQuery } from "../../store/adminApi.js";
import { formatTime } from "../../utils/formatTime.js";

export default function Dashboard() {
  const { data, isLoading, error } = useGetDashboardQuery();

  const navigate = useNavigate();

  const statusStyle = {
    finished: "bg-gray-100 text-gray-600 border-gray-300",
    live: "bg-green-50 text-green-600 border-green-300",
    scheduled: "bg-blue-50 text-blue-600 border-blue-300",
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
        <div>
          <h1 className="text-xl font-extrabold text-black">
            Welcome back, Admin 👋
          </h1>
          <p className="text-sm text-black/70">
            Here's what's happening with your matches today.
          </p>
        </div>
        <button onClick={() => navigate("/")}>
          <div className="flex items-center gap-2 bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Live Matches
          </div>
        </button>
      </div>
      {error && <div>{error?.data?.error || "My matches loading failed"}</div>}
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className="p-6! space-y-6!">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6!">
            <div className="bg-white border border-gray-200 rounded-2xl p-3! flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50">
                <Radio className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Live Matches</p>
                <p className="text-2xl font-extrabold text-black">
                  {data?.data?.counts?.live}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3! flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50">
                <Calendar className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Matches</p>
                <p className="text-2xl font-extrabold text-black">
                  {data?.data?.counts?.scheduled}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3! flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50">
                <Radio className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Matches</p>
                <p className="text-2xl font-extrabold text-black">
                  {data?.data?.counts?.finished}
                </p>
              </div>
            </div>
          </div>

          {/* Recent matches + Live Matches */}
          <div className="grid grid-cols-[3fr_2fr] gap-3! min-h-full w-full">
            <div className="bg-white border border-gray-200 rounded-2xl py-4! px-3! min-w-0">
              <div className="mb-4!">
                <h2 className="font-bold text-black">Recent Matches</h2>
              </div>

              <div className="pr-4! max-h-72 overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-2! font-medium">Match</th>
                      <th className="pb-2! font-medium">Sport</th>
                      <th className="pb-2! font-medium">Status</th>
                      <th className="pb-2! font-medium">Start Time</th>
                      <th className="pb-2! font-medium">Score</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.data?.matches?.map((match) => (
                      <tr
                        key={match.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3! font-semibold text-black">
                          {match.homeTeam}{" "}
                          <span className="text-gray-300 mx-1">vs</span>{" "}
                          {match.awayTeam}
                        </td>
                        <td className="py-3! text-gray-500">{match.sport}</td>
                        <td className="py-3!">
                          <span
                            className={`inline-block text-xs font-semibold px-2.5! py-1! rounded-full border ${statusStyle[match.status]}`}
                          >
                            {match.status}
                          </span>
                        </td>
                        <td className="py-3! text-gray-500">
                          {formatTime(match.startTime)}
                        </td>
                        <td className="py-3! font-semibold text-black">
                          {match.homeScore}
                          {match.sport === "cricket" &&
                            "/" + match.homeTeamWickets}{" "}
                          - {match.awayScore}
                          {match.sport === "cricket" &&
                            "/" + match.awayTeamWickets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-2! min-w-0">
              <h2 className="font-bold text-black mb-3! flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Matches
              </h2>

              <div className="space-y-3! ">
                {data.data.liveMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between border border-gray-200 rounded-xl p-2! w-full"
                  >
                    <div>
                      <p className="font-semibold text-black text-sm">
                        {match.homeTeam} vs {match.awayTeam}
                      </p>
                      <p className="text-xs text-gray-400">{match.sport}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="font-extrabold text-black text-lg leading-none">
                          {match.homeScore}
                          {match.sport === "cricket" &&
                            `-${match.homeTeamWickets}`}
                        </p>
                        <p className="text-xs text-gray-400 mt-1!">
                          {match.homeTeam}
                        </p>
                      </div>

                      <span className="font-bold text-gray-300">-</span>

                      <div className="text-center">
                        <p className="font-extrabold text-black text-lg leading-none">
                          {match.awayScore}
                          {match.sport === "cricket" &&
                            `-${match.awayTeamWickets}`}
                        </p>
                        <p className="text-xs text-gray-400 mt-1!">
                          {match.awayTeam}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="add-commentary"
                      state={{ match }} 
                      className="flex items-center gap-1.5 bg-yellow-200 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg border-2 border-black p-2! transition-colors duration-200"
                    >
                      <MessageSquare size={14} />
                      Add Commentary
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
