
# 🏏⚽ **Sportz**

> Real-time sports match & commentary WebSocket server — built to learn WebSockets in production-like conditions.

---

## 📌 **Overview**

Sportz is a backend server that delivers **live match updates** and **real-time commentary** for sports like cricket and football.

- 📡 **REST API** — Create matches, fetch commentary history
- 🔌 **WebSocket Server** — Subscribe to matches, receive live commentary
- 🔒 **Security** — Rate limiting + Arcjet bot detection
- 📊 **Monitoring** — Site24x7 APM Insight

---

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     HTTP Server (Express)                    │
│                         Port 8000                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│   │  /matches   │    │  /commentary│    │  /ws        │   │
│   │  (REST API) │    │  (REST API) │    │ (WebSocket) │   │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘   │
│          │                  │                  │           │
│          └──────────────────┼──────────────────┘           │
│                             │                              │
│                     ┌───────▼───────┐                      │
│                     │  Security     │                      │
│                     │  Middleware   │                      │
│                     │ • Rate Limit  │                      │
│                     │ • Arcjet      │                      │
│                     └───────┬───────┘                      │
│                             │                              │
│                     ┌───────▼───────┐                      │
│                     │  Database     │                      │
│                     │  (PostgreSQL) │                      │
│                     └───────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Core Flows**

### 📡 **1. Match Creation Flow**

```
┌──────────┐     POST /matches      ┌──────────┐
│  Client  │ ──────────────────────▶│  Server  │
└──────────┘                        └────┬─────┘
                                         │
                                     ┌────▼─────┐
                                     │ Save to  │
                                     │ Database │
                                     └────┬─────┘
                                         │
                              ┌──────────▼──────────┐
                              │  Broadcast to ALL   │
                              │  connected clients  │
                              │  {type: "match_     │
                              │   created", data}   │
                              └─────────────────────┘
```

---

### 💬 **2. Commentary Flow (WebSocket)**

```
┌──────────┐     POST /matches/1/commentary    ┌──────────┐
│  Admin   │ ──────────────────────────────────▶│  Server  │
└──────────┘                                   └────┬─────┘
                                                     │
                                                 ┌────▼─────┐
                                                 │ Save to  │
                                                 │ Database │
                                                 └────┬─────┘
                                                     │
                                          ┌──────────▼──────────┐
                                          │  Get subscribers    │
                                          │  for matchId = 1    │
                                          └──────────┬──────────┘
                                                     │
                              ┌──────────────────────▼──────────────────────┐
                              │  Broadcast to SUBSCRIBED clients only      │
                              │  {type: "commentary", data: {...}}         │
                              └─────────────────────────────────────────────┘
```

---

### 🔌 **3. WebSocket Subscription Flow**

```
┌──────────┐                      ┌──────────┐
│  Client  │  1. Connect to /ws   │  Server  │
└────┬─────┘ ─────────────────────▶└────┬─────┘
     │                                   │
     │  2. Send subscribe message        │
     │  {type:"subscribe", matchId:1}    │
     │───────────────────────────────────▶│
     │                                   │
     │  3. Server adds to subscription   │
     │     registry for matchId=1        │
     │                                   │
     │  4. New commentary arrives        │
     │     (via POST /matches/1/         │
     │      commentary)                  │
     │                                   │
     │  5. Server broadcasts only to     │
     │     subscribers of matchId=1      │
     │◀───────────────────────────────────│
     │  {type:"commentary", data:{...}}  │
     │                                   │
```

---

## 🛠️ **Tech Stack**

| Technology | Why Used | What For |
|------------|----------|----------|
| **Node.js** | JavaScript runtime | Server platform |
| **Express 5** | Lightweight framework | REST API routing |
| **ws** | Native WebSocket library | Real-time bidirectional communication |
| **PostgreSQL** | Reliable relational DB | Persistent data storage |
| **Drizzle ORM** | Type-safe SQL | Database operations & migrations |
| **Zod** | Schema validation | Request validation & type safety |
| **Arcjet** | Security SDK | Bot detection & request shielding |
| **rate-limiter-flexible** | Lightweight limiter | HTTP + WebSocket rate limiting |
| **Site24x7** | APM monitoring | Production performance monitoring |
| **dotenv** | Environment config | Secure config management |

---

## 🔌 **WebSocket — How It Works**

### **What is it doing?**
The WebSocket server maintains persistent connections with clients. When a client subscribes to a match, the server stores that connection. Later, when new commentary is added for that match, the server immediately pushes it to all subscribed clients.

### **Key Events**

#### Client → Server (Subscribe/Unsubscribe)
```json
// Subscribe to match
{ "type": "subscribe", "matchId": 1 }

// Unsubscribe from match
{ "type": "unsubscribe", "matchId": 1 }
```

#### Server → Client (Broadcasts)
```json
// New match created (all clients)
{ "type": "match_created", "data": { ...match } }

// New commentary (subscribed clients only)
{ "type": "commentary", "data": { ...comment } }
```

### **Subscription Registry**

```
matchSubscribers = {
  1: [socketA, socketB, socketC],   // Match 1 has 3 subscribers
  2: [socketD],                     // Match 2 has 1 subscriber
  3: []                              // Match 3 has 0 subscribers
}
```

### **Keep-Alive**
- Server sends `ping` every 30 seconds
- Client responds with `pong`
- If no `pong`, connection is terminated

---

## 🔒 **Security**

| Layer | Protection | Limits |
|-------|-----------|--------|
| **HTTP API** | Rate Limiter (Memory) | 50 reqs / 10s per IP |
| **WebSocket** | Rate Limiter + Arcjet | 5 connections / 2s per IP |
| **Bot Detection** | Arcjet | Blocks automated bots |
| **Request Shielding** | Arcjet | Protects against attacks |

---

## 📊 **Database Schema**

### **Matches** (Static/Anchor)
```
┌─────────────┬──────────────────┐
│ Field       │ Description      │
├─────────────┼──────────────────┤
│ id          │ Primary key      │
│ sport       │ cricket/football │
│ homeTeam    │ Team name        │
│ awayTeam    │ Team name        │
│ status      │ scheduled/live/  │
│             │ finished         │
│ startTime   │ ISO timestamp    │
│ endTime     │ ISO timestamp    │
│ homeScore   │ Integer          │
│ awayScore   │ Integer          │
└─────────────┴──────────────────┘
```

### **Commentary** (Dynamic/Events)
```
┌─────────────┬──────────────────┐
│ Field       │ Description      │
├─────────────┼──────────────────┤
│ id          │ Primary key      │
│ matchId     │ FK → matches     │
│ minute      │ Match minute     │
│ sequence    │ Order number     │
│ period      │ Innings/half     │
│ eventType   │ wicket/goal etc  │
│ actor       │ Player name      │
│ team        │ Team name        │
│ message     │ Commentary text  │
│ metadata    │ JSON (flexible)  │
│ tags        │ String[]         │
└─────────────┴──────────────────┘
```

---

## 🚀 **Quick Start**

```bash
# Install
npm install

# Setup .env
DATABASE_URL=postgresql://user:pass@localhost:5432/sportz

# Migrate DB
npm run db:generate
npm run db:migrate

# Run dev server
npm run dev
```

**Server:** `http://localhost:8000`  
**WebSocket:** `ws://localhost:8000/ws`

---

## 📁 **Project Structure**

```
sportz/
├── src/
│   ├── index.js          # Entry point
│   ├── arcjet.js         # Security config
│   ├── db/
│   │   ├── db.js         # DB connection
│   │   └── schema.js     # Drizzle schemas
│   ├── routes/
│   │   ├── matches.route.js
│   │   └── commentary.route.js
│   ├── validation/
│   │   ├── matches.js
│   │   └── commentary.js
│   ├── ws/
│   │   └── server.js     # WebSocket core
│   └── utils/
│       └── match-status.js
├── drizzle/              # Migrations
├── package.json
└── .env
```

---

## 📸 **Screenshots**

> *[Place your images here]*

![WebSocket Flow](Screenshot%202026-08-22%20202718.png)
*WebSocket subscription and commentary broadcast flow*

![Database Schema](Screenshot%202026-08-19%20112050.png)
*Database schema: Matches (static) + Commentary (dynamic)*

---

## 🎯 **Why This Project?**

Built to **learn WebSockets in a real-world context**:

- ✅ Persistent connections with `ws`
- ✅ Subscription pattern for selective broadcasts  
- ✅ Security on WebSocket upgrade
- ✅ Rate limiting on both HTTP & WS
- ✅ Monitoring for production readiness

---

## 📄 **License**

ISC

---

**Built with ❤️ to learn WebSockets**