import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { admin, matches } from "../db/schema.js";
import { loginSchema } from "../validation/admin.js";
import {
  isPasswordCorrect,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.js";
import { cookieOptions } from "../utils/cookie-options.js";
import { verifyAdmin } from "../middlewares/verify-admin.js";

export const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid payload", details: parsed.error.issues });
  }

  const { email, password } = parsed.data;
  try {
    const [foundAdmin] = await db
      .select()
      .from(admin)
      .where(eq(admin.email, email));
    if (!foundAdmin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const valid = await isPasswordCorrect(password, foundAdmin.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(foundAdmin);
    const refreshToken = generateRefreshToken(foundAdmin);
    await db
      .update(admin)
      .set({ refreshToken })
      .where(eq(admin.id, foundAdmin.id));

    const safeAdmin = {
      id: foundAdmin.id,
      name: foundAdmin.name,
      email: foundAdmin.email,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({ data: safeAdmin });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

adminRouter.post("/logout", verifyAdmin, async (req, res) => {
  try {
    await db
      .update(admin)
      .set({ refreshToken: null })
      .where(eq(admin.id, req.admin.id));

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});

adminRouter.post("/refresh-token", async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    const [foundAdmin] = await db
      .select()
      .from(admin)
      .where(eq(admin.id, decoded?.id));

    if (!foundAdmin) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    
    if (foundAdmin.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ error: "Refresh token expired or already used" });
    }

    const newAccessToken = generateAccessToken(foundAdmin);
    const newRefreshToken = generateRefreshToken(foundAdmin); // rotation

    await db
      .update(admin)
      .set({ refreshToken: newRefreshToken })
      .where(eq(admin.id, foundAdmin.id));

    res
      .status(200)
      .cookie("accessToken", newAccessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token failed:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

adminRouter.get("/dashboard", verifyAdmin, async (req, res) => {
  try {
    const myMatches = await db
      .select()
      .from(matches)
      .where(eq(matches.createdBy, req.admin.id))
      .orderBy(desc(matches.createdAt));
    res.status(200).json({ data: myMatches });
  } catch (error) {
    console.error("Failed to fetch dashboard matches:", error);
    res.status(500).json({ error: "Failed to fetch dashboard matches" });
  }
});
