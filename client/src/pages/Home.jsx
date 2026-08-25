import { Header, Match, Commentary } from "../components";
import { useGetMatchesQuery } from "../store/matchesApi";

export default function Home() {
  const { data, isLoading, error } = useGetMatchesQuery();
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
                  time={match.startTime}
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
