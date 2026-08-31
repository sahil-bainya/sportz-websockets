import { formatTime } from "../utils/formatTime.js";
export default function Match({
  sportName,
  status,
  homeTeam,
  awayTeam,
  homeScore = 0,
  awayScore = 0,
  homeTeamWickets=null,
  awayTeamWickets=null,
  startTime,
  endTime,
  viewing = false,
  onViewCommentary,
  onCloseCommentary
}) {

  let result;
  if(status==="finished"){
    if(homeScore===awayScore){
      result ="Match drawn" 
    }else if(homeScore>awayScore){
      result = homeTeam + " won"
    }else{
        result = awayTeam + " won"
    }
  }
  return (
    <div className="w-full max-w-sm border-2 rounded-2xl p-3! shadow-sm ">
      <div className="flex items-center justify-between mb-4!">
        <div className="badge badge-outline border-2 border-gray-400 text-gray-600 font-bold px-3!  rounded-2xl">
          {sportName}
        </div>
        {status === "live" && (
          <span className="text-xs font-bold text-green-600">
            <span className="inline-block w-2 h-2 rounded-full bg-green-600 " />{" "}
            {status}
          </span>
        )}
        {status === "scheduled" && (
          <span className="text-xs font-bold text-blue-500">{status}</span>
        )}
        {status === "finished" && (
          <span className="text-xs font-bold text-gray-500">{status}</span>
        )}
      </div>

      <div className="flex items-center justify-between mb-3!">
        <span className="font-bold text-black">{homeTeam}</span>
        <div className="border-2 border-gray-400 rounded-lg  font-bold text-lg min-w-15 text-center bg-gray-100">
          {homeScore}{sportName==="cricket" && "/"+homeTeamWickets}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4!">
        <span className="font-bold text-black">{awayTeam}</span>
        <div className="border-2 border-gray-400 rounded-lg  font-bold text-lg min-w-15 text-center bg-gray-100">
          {awayScore}{sportName==="cricket" && "/"+awayTeamWickets}
        </div>
      </div>
     <p
  className={`text-sm font-medium ${
    result === "Match drawn"
      ? "text-gray-500"
      : "text-green-600"
  }`}
>
  {status === "finished" && result}
</p>
      <hr className="text-gray-200 mb-3!" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-bold">
          {status === "live"
            ? ""
            : status === "finished"
              ? formatTime(endTime)
              : formatTime(startTime)}
        </span>

        <div className="flex items-center gap-2">
          <button
            className={`${viewing ? " bg-sky-200 hover:bg-sky-300" : " bg-amber-200 hover:bg-amber-300"} btn btn-sm text-black border-2 border-black rounded-full font-bold p-2!`}
          onClick={onViewCommentary}
          >
            {viewing ? "Viewing Recape" : "View Recape"}
          </button>
          {viewing && (
            <button className="btn btn-sm bg-red-100 hover:bg-red-200 text-black border-2 border-black rounded-full font-bold p-2!" onClick={onCloseCommentary}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
