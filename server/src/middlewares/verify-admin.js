import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { admin } from "../db/schema.js";

export async function verifyAdmin(req, _ , next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const [foundAdmin] = await db
      .select({
        id: admin.id,
        name: admin.name,
        email: admin.email,
      })
      .from(admin)
      .where(eq(admin.id, decoded?.id));

    if (!foundAdmin) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    req.admin = foundAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
}