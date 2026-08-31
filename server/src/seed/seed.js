import "dotenv/config";
import fs from "fs/promises";

const API_URL = process.env.API_URL || "http://localhost:8000/api";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required in .env");
}

const DATA_FILE = new URL("../data/data.json", import.meta.url);

async function loadSeedData() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

// Login and capture the cookie header to reuse in later requests
async function login() {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const setCookieHeader = response.headers.get("set-cookie");
  if (!setCookieHeader) {
    throw new Error("No cookies received from login response.");
  }

  // Extract just the cookie name=value pairs (drop attributes like HttpOnly, Path, etc.)
  const cookies = setCookieHeader
    .split(/,(?=\s*\w+=)/) // split multiple Set-Cookie headers if combined
    .map((c) => c.split(";")[0].trim())
    .join("; ");

  console.log("✅ Logged in as admin");
  return cookies;
}

async function createMatch(cookies, match) {
  const response = await fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: cookies,
    },
    body: JSON.stringify({
      sport: match.sport,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      startTime: match.startTime,
      endTime: match.endTime,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeTeamWickets: match.homeTeamWickets ?? undefined,
      awayTeamWickets: match.awayTeamWickets ?? undefined,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create match: ${response.status} — ${errText}`);
  }

  const payload = await response.json();
  return payload.data;
}

async function createCommentary(cookies, matchId, entry) {
  const response = await fetch(`${API_URL}/matches/${matchId}/commentary`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: cookies,
    },
    body: JSON.stringify({
      minutes: entry.minute,
      sequence: entry.sequence,
      period: entry.period,
      eventType: entry.eventType,
      actor: entry.actor,
      team: entry.team,
      message: entry.message,
      tags: entry.tags,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create commentary: ${response.status} — ${errText}`);
  }

  const payload = await response.json();
  return payload.data;
}

async function seed() {
  console.log(`📡 Seeding via API: ${API_URL}`);

  const { matches, commentary } = await loadSeedData();
  const cookies = await login();

  // Map local JSON id -> actual DB id
  const idMap = new Map();

  for (const match of matches) {
    const created = await createMatch(cookies, match);
    idMap.set(match.id, created.id);
    console.log(`✅ Created match ${created.id}: ${match.homeTeam} vs ${match.awayTeam}`);
  }

  for (const entry of commentary) {
    const actualMatchId = idMap.get(entry.matchId);
    if (!actualMatchId) {
      console.warn(`⚠️  Skipping commentary — no match found for local id ${entry.matchId}`);
      continue;
    }
    const created = await createCommentary(cookies, actualMatchId, entry);
    console.log(`📣 [Match ${actualMatchId}] ${created.message}`);
  }

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});