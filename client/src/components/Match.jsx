export default function Match() {
  const sportName = "Cricket";
  const status = "finished";
  const homeTeam = "India";
  const awayTeam = "England";
  const homeScore = 200;
  const awayScore = 250;
  const time = "13:53";
  const viewing = false;
  return (
    <div className="w-full max-w-sm border-2 rounded-2xl p-3! shadow-sm ">
      <div className="flex items-center justify-between mb-4!">
        <div className="badge badge-outline border-2 border-gray-400 text-gray-600 font-bold px-3!  rounded-2xl">
          {sportName}
        </div>
        <span className="text-xs font-bold text-gray-500">{status}</span>
      </div>

      <div className="flex items-center justify-between mb-3!">
        <span className="font-bold text-black">{homeTeam}</span>
        <div className="border-2 border-gray-400 rounded-lg  font-bold text-lg min-w-15 text-center bg-gray-100">
          {homeScore}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4!">
        <span className="font-bold text-black">{awayTeam}</span>
        <div className="border-2 border-gray-400 rounded-lg  font-bold text-lg min-w-15 text-center bg-gray-100">
          {awayScore}
        </div>
      </div>
      <hr className="text-gray-200 mb-3!" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-bold">{time}</span>

        <div className="flex items-center gap-2">
          <button
            className={`${viewing ? " bg-sky-200 hover:bg-sky-300" : " bg-amber-200 hover:bg-amber-300"} btn btn-sm text-black border-2 border-black rounded-full font-bold p-2!`}
          >
            {viewing ? "Viewing Recape" : "View Recape"}
          </button>
          {viewing && (
            <button className="btn btn-sm bg-red-100 hover:bg-red-200 text-black border-2 border-black rounded-full font-bold p-2!">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
