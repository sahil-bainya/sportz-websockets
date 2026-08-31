import { useContext } from "react";
import { WebSocketContext } from "./WebSocketContext.js";
export function useWebSocketContext() {
  return useContext(WebSocketContext);
}
