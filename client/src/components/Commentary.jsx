import Comment from "./Comment.jsx";
import { useGetCommentaryQuery } from "../store/commentaryApi.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocketContext } from "../context/useWebSocketContext.js";
import { setInitialCommentary } from "../store/commentarySlice.js";

const EMPTY_ARRAY = [];

export default function Commentary({ matchId }) {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetCommentaryQuery(matchId, {
    skip: !matchId,
  });
  const { sendMessage, isConnected } = useWebSocketContext();
  const comments = useSelector(
    (state) => state.liveCommentary.byMatchId[matchId] || EMPTY_ARRAY,
  );

  // REST se initial data aane pe Redux me daal do
  useEffect(() => {
    if (data?.data && matchId) {
      dispatch(setInitialCommentary({ matchId, comments: data.data }));
    }
  }, [data, matchId, dispatch]);
 
  
  useEffect(() => {
    if (!matchId || !isConnected) return;

    sendMessage({ type: "subscribe", matchId });

    return () => {
      sendMessage({ type: "unsubscribe", matchId });
    };
  }, [matchId, isConnected, sendMessage]);

  function renderContent() {
    if (isLoading) {
      return (
        <p className="text-gray-400 text-sm text-center">
          Loading commentary...
        </p>
      );
    } else if (!matchId) {
      return (
        <p className="text-gray-500 text-sm text-center">
          Click on match to view commentary
        </p>
      );
    } else if (error) {
      return (
        <p className="text-red-500 text-sm text-center">
          Failed to load commentary
        </p>
      );
    } else if (comments.length === 0) {
      return (
        <p className="text-gray-400 text-sm text-center">No commentary yet</p>
      );
    } else {
      return comments.map((comment) => (
        <Comment key={comment?.id} data={comment} />
      ));
    }
  }

  return (
    <div className="w-full max-w-md h-full min-h-0 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="bg-sky-200 flex items-center justify-between px-5! py-4! border-b-2 border-black">
        <h2 className="text-xl font-extrabold text-black">Live Commentary</h2>
        <div className="badge badge-outline bg-white border-2 border-gray-600 text-gray-700 font-bold px-3! py-3!">
          Real-time {isConnected}
        </div>
      </div>
      <div className="p-5! flex flex-col gap-10 flex-1 min-h-0 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
