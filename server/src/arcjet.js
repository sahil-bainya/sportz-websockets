import arcjet, { detectBot, shield } from "@arcjet/node";
import { RateLimiterMemory } from "rate-limiter-flexible";

const arcjetKey = process.env.ARCJET_KEY;
const arcjetMode = process.env.ARCJET_MODE === "DRY_RUN" ? "DRY_RUN" : "LIVE";

if (!arcjetKey) throw new Error("ARCJET_KEY environment variable is missing");

export const httpArcjet = arcjetKey
  ? arcjet({
      key: arcjetKey,
      rules: [
        shield({ mode: arcjetMode }),
        detectBot({
          mode: arcjetMode,
          allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
        }),
      ],
    })
  : null;

export const wsArcjet = arcjetKey
  ? arcjet({
      key: arcjetKey,
      rules: [
        shield({ mode: arcjetMode }),
        detectBot({
          mode: arcjetMode,
          allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
        }),
      ],
    })
  : null;

const httpLimiter = new RateLimiterMemory({ points: 50, duration: 10 });
export const wsLimiter = new RateLimiterMemory({ points: 5, duration: 2 });

export function securityMiddleware() {
  return async (req, res, next) => {
    try {
      await httpLimiter.consume(req.ip);
    } catch {
      return res.status(429).json({ error: "Too many requests" });
    }

    if (!httpArcjet) return next();
    try {
      const decision = await httpArcjet.protect(req);
      if (decision.isDenied()) {
        return res.status(403).json({ error: "Forbidden" });
      }
    } catch (err) {
      console.error("Arcjet middleware error", err);
      return res.status(503).json({ error: "Service Unavailable" });
    }
    next();
  };
}
