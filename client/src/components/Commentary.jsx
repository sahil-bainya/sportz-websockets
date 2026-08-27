import Comment from "./Comment.jsx";
import { useGetCommentaryQuery } from "../store/commentaryApi.js";

export default function Commentary({ matchId }) {
  const { data, isLoading, error } = useGetCommentaryQuery(matchId);
  const commentary = data?.data || [];
  function renderContent() {
    if (isLoading) {
      return <p className="text-gray-400 text-sm text-center">Loading commentary...</p>;
    }else if(!matchId){
       return (
        <p className="text-gray-500 text-sm text-center">
          Click on match to view commentary
        </p>
      );
    } 
    else if (error) {
      return (
        <p className="text-red-500 text-sm text-center">
          Failed to load commentary
        </p>
      );
    } else if (commentary.length === 0) {
      return (
        <p className="text-gray-400 text-sm text-center">
          No commentary yet
        </p>
      );
    } else {
      return commentary.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ));
    }
  }


  return (
    <div className="w-full max-w-md h-full min-h-0 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="bg-sky-200 flex items-center justify-between px-5! py-4! border-b-2 border-black">
        <h2 className="text-xl font-extrabold text-black">Live Commentary</h2>
        <div className="badge badge-outline bg-white border-2 border-gray-600 text-gray-700 font-bold px-3! py-3!">
          Real-time
        </div>
      </div>
      <div className="p-5! flex flex-col gap-10 flex-1 min-h-0 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
