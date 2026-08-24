import {
  Radio,
  Calendar,
  Flag,
  MessageSquare,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Live Matches", value: 3, icon: Radio, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Upcoming Matches", value: 5, icon: Calendar, color: "text-green-500", bg: "bg-green-50" },
    { label: "Completed Matches", value: 12, icon: Flag, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Commentary", value: 256, icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const recentMatches = [
    {
      teamA: "South Africa",
      teamB: "New Zealand",
      sport: "CRICKET",
      status: "Finished",
      time: "14 May, 13:30",
      score: "162 - 200",
    },
    {
      teamA: "AC Milan",
      teamB: "Inter Milan",
      sport: "FOOTBALL",
      status: "Finished",
      time: "14 May, 12:00",
      score: "146 - 114",
    },
    {
      teamA: "India",
      teamB: "Australia",
      sport: "CRICKET",
      status: "Live",
      time: "14 May, 14:00",
      score: "331 - 400",
    },
    {
      teamA: "LA Lakers",
      teamB: "Boston Celtics",
      sport: "BASKETBALL",
      status: "Finished",
      time: "13 May, 11:30",
      score: "263 - 263",
    },
    {
      teamA: "Real Madrid",
      teamB: "Barcelona",
      sport: "FOOTBALL",
      status: "Scheduled",
      time: "15 May, 20:00",
      score: "-",
    },
  ];

  const liveMatches = [
    { teamA: "India", teamB: "Australia", sport: "CRICKET", score: "331 - 400" },
    { teamA: "Pak", teamB: "England", sport: "CRICKET", score: "210 - 198" },
    { teamA: "CSK", teamB: "RCB", sport: "CRICKET", score: "128 - 132" },
  ];

  const statusStyle = {
    Finished: "bg-gray-100 text-gray-600 border-gray-300",
    Live: "bg-green-50 text-green-600 border-green-300",
    Scheduled: "bg-blue-50 text-blue-600 border-blue-300",
  };

  return (
    <div className="    ">
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
        <div className="flex items-center gap-2 bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          ONLINE
        </div>
      </div>

      <div className="p-6! space-y-6!">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4!">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-3! flex items-center gap-4"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-extrabold text-black">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent matches + Live Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6!">
          {/* Recent Matches */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5!">
            <div className="mb-4!">
              <h2 className="font-bold text-black">Recent Matches</h2>
            </div>

            <div className="pr-7! max-h-72 overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-2! font-medium">Match</th>
                    <th className="pb-2! font-medium">Sport</th>
                    <th className="pb-2! font-medium">Status</th>
                    <th className="pb-2! font-medium">Start Time</th>
                    <th className="pb-2! font-medium">Score</th>
                    <th className="pb-2! font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0">
                      <td className="py-3! font-semibold text-black">
                        {match.teamA} <span className="text-gray-300 mx-1">vs</span> {match.teamB}
                      </td>
                      <td className="py-3! text-gray-500">{match.sport}</td>
                      <td className="py-3!">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5! py-1! rounded-full border ${statusStyle[match.status]}`}
                        >
                          {match.status}
                        </span>
                      </td>
                      <td className="py-3! text-gray-500">{match.time}</td>
                      <td className="py-3! font-semibold text-black">{match.score}</td>
                      <td className="py-3! text-right">
                        <button className="text-xs font-bold border-2 border-black rounded-lg px-3! py-1.5! hover:bg-yellow-100">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Matches */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5!">
            <h2 className="font-bold text-black mb-4! flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Live Matches
            </h2>

            <div className="space-y-3!">
              {liveMatches.map((match, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-2! w-full"
                >
                  <div>
                    <p className="font-semibold text-black text-sm">
                      {match.teamA} vs {match.teamB}
                    </p>
                    <p className="text-xs text-gray-400">{match.sport}</p>
                  </div>
                  <button className="flex items-center gap-1.5 bg-yellow-200 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg border-2 border-black p-2! transition-colors duration-200">
                    <MessageSquare size={14} />
                    Add Commentary
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}