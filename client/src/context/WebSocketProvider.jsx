import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addLiveCommentary } from "../store/commentarySlice.js";
import { addLiveMatch } from "../store/liveMatchesSlice.js";
import { WebSocketContext } from "./WebSocketContext.js";
import { adminApi } from "../store/adminApi.js";
const WS_URL = import.meta.env.VITE_WS_URL;

export function WebSocketProvider({ children }) {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`${WS_URL}`);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "commentary") {
        dispatch(addLiveCommentary(message.data));
      }
      if (message.type === "match_created") {
        dispatch(addLiveMatch(message.data));
        dispatch(adminApi.util.invalidateTags(["Dashboard"]));
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, [dispatch]);

  const sendMessage = (data) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}
