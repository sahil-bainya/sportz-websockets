# Sportz

## Real-time Sports Match & Commentary Platform
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/9c5bba41-a775-43da-9399-cd61eecd08c4" />

---

## 📌 Overview

**Sportz** is a full-stack web application that delivers live match updates and real-time commentary for sports like cricket, football, and basketball. Built as a learning project to understand WebSockets in production-like conditions, it features a secure admin panel, real-time data synchronization, and a modern React frontend.

### What It Does

- **Live Match Tracking** — View all matches with real-time scores
- **Instant Commentary** — Receive live commentary updates via WebSockets
- **Admin Dashboard** — Create matches, add commentary, manage data
- **Secure Access** — Rate limiting, bot detection, and protected admin routes
- **Performance Monitoring** — Site24x7 APM Insight integration

---

## 🎯 Purpose

This project was built to deeply understand how WebSockets work in real-world applications. Key learning areas include:

- Establishing and maintaining persistent WebSocket connections
- Implementing subscription-based broadcasting patterns
- Securing WebSocket connections with rate limiting and bot detection
- Building a full-stack application with real-time data flow
- Managing state across WebSocket and REST API interactions

---

## 🏗️ System Architecture

The application follows a client-server architecture where the backend handles data persistence, real-time broadcasting, and security, while the frontend provides an intuitive interface for both administrators and end-users.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER                                 │
│                     React 19 + Vite + Tailwind                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌───────────────────┐              ┌──────────────────────┐           │
│   │   Admin Panel     │              │    Match Viewer      │           │
│   │                   │              │                       │          │
│   │  • Dashboard      │              │  • Live matches list  │          │
│   │  • Create Match   │              │  • Match details      │          │
│   │  • Add Commentary │              │  • Real-time scores   │          │
│   │  • Manage Data    │              │  • Live commentary    │          │
│   └─────────┬─────────┘              └───────────┬───────────┘          │
│             │                                    │                      │
│             └──────────────┬─────────────────────┘                      │
│                            │                                            │
│                   ┌────────▼────────┐                                   │
│                   │  Redux Toolkit  │                                   │
│                   │                 │                                   │
│                   │ • RTK Query     │                                   │
│                   │ • WebSocket     │                                   │
│                   │   Slice         │                                   │
│                   └────────┬────────┘                                   │
│                            │                                            │
│                    HTTP/WS │                                            │
│                            │                                            │
└────────────────────────────┼────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                          BACKEND LAYER                                  │
│                    Node.js + Express + PostgreSQL                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐     │
│   │ REST API     │  │ WebSocket    │  │    Security Layer         │     │
│   │              │  │ Server       │  │                           │     │
│   │ /matches     │  │ /ws          │  │ • HTTP Rate Limiter       │     │
│   │ /commentary  │  │              │  │ • WS Rate Limiter         │     │
│   └──────┬───────┘  └──────┬───────┘  │ • Arcjet Shield           │     │
│          │                 │          │ • Bot Detection           │     │
│          └─────────────────┼──────────┘                           │     │
│                            │                                      │     │
│                   ┌────────▼────────┐                             │     │
│                   │  Drizzle ORM    │                             │     │
│                   │  & PostgreSQL   │                             │     │
│                   └─────────────────┘                             │     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Core Data Flows

### 1. Match Creation Flow

When an admin creates a new match, the system saves it to the database and broadcasts it to all connected clients in real-time.

```
ADMIN          BACKEND          DATABASE        ALL CLIENTS
  │               │                 │               │
  │  POST /matches│                 │               │
  │─────────────▶│                 │               │
  │               │  INSERT         │               │
  │               │───────────────▶│               │
  │               │                 │               │
  │               │  RETURNING      │               │
  │               │◀───────────────│               │
  │               │                 │               │
  │  201 Created  │                 │               │
  │◀─────────────│                 │               │
  │               │                 │               │
  │               │  broadcastMatchCreated()        │
  │               │────────────────────────────────▶│
  │               │                 │               │
  │               │                 │  {type:"match_│
  │               │                 │   created"}   │
  │               │                 │               │
```

### 2. Commentary Flow (WebSocket Broadcast)

When commentary is added for a match, only clients subscribed to that specific match receive the update.

```
ADMIN          BACKEND          DATABASE     SUBSCRIBED CLIENTS
  │               │                 │               │
  │ POST /matches/1/commentary      │               │
  │─────────────▶│                 │               │
  │               │  INSERT         │               │
  │               │────────────────▶│               │
  │               │                 │               │
  │               │  Get subscribers│               │
  │               │  for matchId=1  │               │
  │               │                 │               │
  │  201 Created  │                 │               │
  │◀─────────────│                 │               │
  │               │                 │               │
  │               │  broadcastCommentary(1, data)   │
  │               │───────────────────────────────▶│
  │               │                 │               │
  │               │                 │  {type:"com-  │
  │               │                 │   mentary",   │
  │               │                 │   data:{...}} │
  │               │                 │               │
```

### 3. WebSocket Subscription Flow

When a client connects and subscribes to a match, the server adds them to the subscription registry for that match.

```
CLIENT                          BACKEND
  │                               │
  │ 1. WebSocket Connection       │
  │ ws://server/ws                │
  │─────────────────────────────▶│
  │                               │
  │                               │ 2. Upgrade HTTP to WS
  │                               │    Check Rate Limits
  │                               │    Check Arcjet
  │                               │
  │ 3. Connection Established     │
  │◀─────────────────────────────│
  │                               │
  │ 4. Send Subscribe Message     │
  │ {type:"subscribe",matchId:1}  │
  │─────────────────────────────▶│
  │                               │
  │                               │ 5. Add to Registry
  │                               │    matchSubscribers[1]
  │                               │    = [socket]
  │                               │
  │ 6. Subscription Confirmed     │
  │ {type:"subcribed",matchId:1}  │
  │◀─────────────────────────────│
  │                               │
  │                               │ 7. Later: New Commentary
  │                               │    for matchId=1
  │                               │
  │ 8. Broadcast to Subscribers   │
  │ {type:"commentary",data:{...}}│
  │◀─────────────────────────────│
  │                               │
```

### 4. Subscription Registry

The server maintains a Map where each match ID points to a Set of WebSocket connections. This enables efficient targeted broadcasts.

```
┌─────────────────────────────────────────┐
│         Subscription Registry           │
├─────────────────────────────────────────┤
│                                         │
│  matchSubscribers = {                   │
│                                         │
│    1: [socketA, socketB, socketC],      │  ← 3 subscribers
│                                         │
│    2: [socketD],                        │  ← 1 subscriber
│                                         │
│    3: [],                               │  ← 0 subscribers
│                                         │
│    4: [socketE, socketF]                │  ← 2 subscribers
│                                         │
│  }                                      │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend Technologies

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND STACK                               │
├─────────────────────┬─────────────────────┬─────────────────────────┤
│ Technology          │ Purpose             │ Why Used                │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Node.js             │ Runtime Environment │ Fast, event-driven      │
│                     │                     │ for real-time apps      │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Express 5           │ Web Framework       │ Minimal, flexible,      │
│                     │                     │ industry standard       │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ ws                  │ WebSocket Library   │ Native, reliable,       │
│                     │                     │ battle-tested           │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ PostgreSQL          │ Database            │ Reliable, supports      │
│                     │                     │ complex queries         │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Drizzle ORM         │ Database ORM        │ Type-safe, lightweight, │
│                     │                     │ excellent DX            │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Zod                 │ Schema Validation   │ Runtime validation,     │
│                     │                     │ TypeScript integration  │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Arcjet              │ Security            │ Bot detection, shield,  │
│                     │                     │ rate limiting           │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ rate-limiter-flexible│ Rate Limiting      │ Memory/Redis based,     │
│                     │                     │ configurable            │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Site24x7            │ Monitoring          │ Production APM,         │
│                     │                     │ performance insights    │
└─────────────────────┴─────────────────────┴─────────────────────────┘
```

### Frontend Technologies

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND STACK                              │
├─────────────────────┬─────────────────────┬─────────────────────────┤
│ Technology          │ Purpose             │ Why Used                │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ React 19            │ UI Framework        │ Component-based,        │
│                     │                     │ modern, popular         │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Vite                │ Build Tool          │ Fast HMR, quick builds  │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Tailwind CSS        │ Styling             │ Utility-first, rapid    │
│                     │                     │ UI development          │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ DaisyUI             │ Component Library   │ Pre-built components    │
│                     │                     │ with Tailwind           │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ React Router        │ Navigation          │ Client-side routing     │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Redux Toolkit       │ State Management    │ Predictable state,      │
│                     │                     │ RTK Query integration   │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ RTK Query           │ API Client          │ Automatic caching,      │
│                     │                     │ optimistic updates      │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Axios               │ HTTP Client         │ Interceptors,           │
│                     │                     │ easy configuration      │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ React Hook Form     │ Form Handling       │ Performant forms,       │
│                     │                     │ validation              │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│ Lucide React        │ Icons               │ Clean, consistent icons │
└─────────────────────┴─────────────────────┴─────────────────────────┘
```

---

## 🔌 WebSocket Deep Dive

### What is it doing?

The WebSocket server maintains persistent, bidirectional connections with clients. When a client subscribes to a match, the server stores that connection in a subscription registry. Later, when new commentary is added for that match, the server immediately pushes it to all subscribed clients without them needing to poll or refresh.

### Connection Lifecycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                     WebSocket Connection Lifecycle                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CLIENT                              SERVER                         │
│    │                                   │                            │
│    │  1. HTTP Upgrade Request          │                            │
│    │  GET /ws HTTP/1.1                 │                            │
│    │  Connection: Upgrade              │                            │
│    │  Upgrade: websocket               │                            │
│    ├──────────────────────────────────▶│                           │
│    │                                   │                            │
│    │                  2. Rate Limit Check (5/2s per IP)             │
│    │                  3. Arcjet Bot Detection                       │
│    │                  4. Upgrade to WebSocket Protocol              │
│    │                                   │                            │
│    │  5. 101 Switching Protocols       │                            │
│    │◀──────────────────────────────────┤                            │
│    │                                   │                            │
│    │  6. Server sends "welcome"        │                            │
│    │  {type:"welcome"}                 │                            │
│    │◀──────────────────────────────────┤                            │
│    │                                   │                            │
│    │  7. Client sends "subscribe"      │                            │
│    │  {type:"subscribe", matchId:1}    │                            │
│    ├──────────────────────────────────▶│                            │
│    │                                   │                            │
│    │                  8. Add socket to matchSubscribers[1]          │
│    │                  9. Send confirmation                          │
│    │                                   │                            │
│    │  {type:"subcribed", matchId:1}    │                            │
│    │◀──────────────────────────────────┤                            │
│    │                                   │                            │
│    │  Keep-Alive: Ping/Pong every 30s  │                            │
│    │◀───────── Ping ───────────────────┤                            │
│    ├───────── Pong ──────────────────▶│                            │
│    │                                   │                            │
│    │  When match 1 gets commentary     │                            │
│    │  {type:"commentary", data:{...}}  │                            │
│    │◀──────────────────────────────────┤                            │
│    │                                   │                            │
│    │  Client disconnects               │                            │
│    ├──────────────────────────────────▶│                            │
│    │                                   │                            │
│    │                  10. Cleanup subscriptions                     │
│    │                      Remove socket from registry               │
│    │                                   │                            │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Features

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Subscription Pattern** | Match-based registry | Targeted broadcasts, efficient bandwidth |
| **Keep-Alive** | Ping/Pong every 30s | Detects dead connections, clean cleanup |
| **Auto-Reconnect** | Client-side logic | Resilient connections |
| **Rate Limiting** | 5 connections / 2s per IP | Prevents abuse |
| **Bot Detection** | Arcjet on upgrade | Blocks malicious clients |
| **Graceful Cleanup** | On-close subscription removal | No memory leaks |

---

## 🔒 Security Architecture

The application implements a layered security approach to protect both HTTP and WebSocket endpoints.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                      INCOMING REQUEST                       │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                 │                                   │
│                                 ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │               LAYER 1: HTTP Rate Limiter                    │    │
│  │         50 requests per 10 seconds per IP                   │    │
│  │                (Memory-based)                               │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                 │                                   │
│                        ┌────────┴────────┐                          │
│                        │  Is rate limit  │                          │
│                        │  exceeded?      │                          │
│                        └────────┬────────┘                          │
│                                 │                                   │
│                   ┌─────────────┴─────────────┐                     │
│                   │ YES                       │ NO                  │
│                   ▼                           ▼                     │
│          ┌─────────────────┐    ┌─────────────────────────────┐     │
│          │  429 Too Many   │    │   LAYER 2: Arcjet Shield    │     │
│          │    Requests     │    │   Request protection        │     │
│          └─────────────────┘    └─────────────────────────────┘     │
│                                 │                                   │
│                        ┌────────┴────────┐                          │
│                        │  Is request     │                          │
│                        │  denied?        │                          │
│                        └────────┬────────┘                          │
│                                 │                                   │
│                   ┌─────────────┴─────────────┐                     │
│                   │ YES                       │ NO                  │
│                   ▼                           ▼                     │
│          ┌─────────────────┐    ┌─────────────────────────────┐     │
│          │  403 Forbidden  │    │   LAYER 3: WebSocket        │     │
│          │                 │    │   Upgrade Check             │     │
│          └─────────────────┘    │   (if path is /ws)          │     │
│                                 └─────────────────────────────┘     │
│                                 │                                   │
│                        ┌────────┴────────┐                          │
│                        │  Is upgrade     │                          │
│                        │  path /ws?      │                          │
│                        └────────┬────────┘                          │
│                                 │                                   │
│                          ┌──────┴──────┐                            │
│                          │ YES         │ NO                         │
│                          ▼             ▼                            │
│          ┌─────────────────────┐  ┌──────────────────┐              │
│          │  LAYER 4: WS Rate   │  │  Proceed to      │              │
│          │  Limiter            │  │  REST API        │              │
│          │  5 connections / 2s │  │  Handler         │              │
│          │  per IP             │  └──────────────────┘              │
│          └─────────────────────┘                                    │
│                          │                                          │
│                ┌─────────┴─────────┐                                │
│                │ YES               │ NO                             │
│                ▼                   ▼                                │
│   ┌───────────────────┐  ┌─────────────────────┐                    │
│   │ 429 Too Many      │  │  LAYER 5: Arcjet    │                    │
│   │ Requests (WS)     │  │  Bot Detection      │                    │
│   └───────────────────┘  │  (WebSocket only)   │                    │
│                          └─────────────────────┘                    │
│                                  │                                  │
│                        ┌─────────┴─────────┐                        │
│                        │ Is bot detected?  │                        │
│                        └─────────┬─────────┘                        │
│                                  │                                  │
│                    ┌─────────────┴─────────────┐                    │
│                    │ YES                       │ NO                 │
│                    ▼                           ▼                    │
│          ┌─────────────────┐    ┌─────────────────────┐             │
│          │  403 Forbidden  │    │  Allow WebSocket    │             │
│          │  (WebSocket)    │    │  Connection         │             │
│          └─────────────────┘    └─────────────────────┘             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

The database uses two main tables with a foreign key relationship. Matches store static information while Commentary captures dynamic, event-driven data.

### Matches Table (Static/Anchor)

```
┌────────────────────────────────────────────────────────────────────┐
│                            MATCHES                                 │
├─────────────┬──────────────────────┬───────────────────────────────┤
│ Field       │ Type                 │ Description                   │
├─────────────┼──────────────────────┼───────────────────────────────┤
│ id          │ serial PRIMARY KEY   │ Unique match identifier       │
│ sport       │ text NOT NULL        │ cricket, football, basketball │
│ homeTeam    │ text NOT NULL        │ Home team name                │
│ awayTeam    │ text NOT NULL        │ Away team name                │
│ status      │ enum NOT NULL        │ scheduled, live, finished     │
│ startTime   │ timestamp            │ Match start time              │
│ endTime     │ timestamp            │ Match end time                │
│ homeScore   │ integer DEFAULT 0    │ Home team score               │
│ awayScore   │ integer DEFAULT 0    │ Away team score               │
│ createdAt   │ timestamp DEFAULT    │ Record creation timestamp     │
│             │ now()                │                               │
└─────────────┴──────────────────────┴───────────────────────────────┘

                    │
                    │ 1 ────────────── * ──┐
                    │  (One-to-Many)        │
                    │                       ▼
                    │       ┌─────────────────────────────────────────┐
                    │       │                COMMENTARY               │
                    │       ├─────────────┬───────────────────────────┤
                    │       │ Field       │ Type                      │
                    │       ├─────────────┼───────────────────────────┤
                    │       │ id          │ serial PRIMARY KEY        │
                    │       │ matchId     │ integer REFERENCES        │
                    │       │             │ matches(id)               │
                    │       │ minute      │ integer                   │
                    │       │ sequence    │ integer                   │
                    │       │ period      │ text                      │
                    │       │ eventType   │ text                      │
                    │       │ actor       │ text                      │
                    │       │ team        │ text                      │
                    │       │ message     │ text NOT NULL             │
                    │       │ metadata    │ jsonb                     │
                    │       │ tags        │ text[]                    │
                    │       │ createdAt   │ timestamp DEFAULT now()   │
                    └───────┴─────────────┴───────────────────────────┘
```

---

## 📡 API Endpoints

### Matches

```
┌────────────────────────────────────────────────────────────────────┐
│                    MATCH ENDPOINTS                                 │
├──────────────┬──────────────┬──────────────────────────────────────┤
│ Method       │ Endpoint     │ Description                          │
├──────────────┼──────────────┼──────────────────────────────────────┤
│ GET          │ /matches     │ List all matches                     │
│              │              │ Query: ?limit={number} max 100       │
├──────────────┼──────────────┼──────────────────────────────────────┤
│ POST         │ /matches     │ Create a new match                   │
│              │              │ Body: sport, homeTeam, awayTeam,     │
│              │              │ startTime, endTime, scores (opt)     │
└──────────────┴──────────────┴──────────────────────────────────────┘
```

### Commentary

```
┌────────────────────────────────────────────────────────────────────┐
│                    COMMENTARY ENDPOINTS                            │
├──────────────┬──────────────┬──────────────────────────────────────┤
│ Method       │ Endpoint     │ Description                          │
├──────────────┼──────────────┼──────────────────────────────────────┤
│ GET          │ /matches/:id │ Get commentary history for match     │
│              │ /commentary  │ Query: ?limit={number} max 100       │
├──────────────┼──────────────┼──────────────────────────────────────┤
│ POST         │ /matches/:id │ Add new commentary for match         │
│              │ /commentary  │ Body: minutes, message, eventType,   │
│              │              │ actor, team, metadata, tags          │
└──────────────┴──────────────┴──────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

```
┌────────────────────────────────────────────────────────────────────┐
│                         PREREQUISITES                              │
├────────────────────────────────────────────────────────────────────┤
│  • Node.js 18+                                                     │
│  • PostgreSQL 14+ (or Neon serverless)                             │
│  • npm or yarn                                                     │
│  • Arcjet account (optional - for security)                        │
└────────────────────────────────────────────────────────────────────┘
```

### Backend Setup

```
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND SETUP                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  # Clone the repository                                             │
│  git clone https://github.com/yourusername/sportz.git               │
│  cd sportz/backend                                                  │
│                                                                     │
│  # Install dependencies                                             │
│  npm install                                                        │
│                                                                     │
│  # Create environment file                                          │
│  cp .env.example .env                                               │
│                                                                     │
│  # Update .env with your database URL                               │
│  DATABASE_URL=postgresql://user:password@localhost:5432/sportz      │
│                                                                     │
│  # Generate and run migrations                                      │
│  npm run db:generate                                                │
│  npm run db:migrate                                                 │
│                                                                     │
│  # Start development server                                         │
│  npm run dev                                                        │
│                                                                     │
│  # Server runs at: http://localhost:8000                            │
│  # WebSocket at: ws://localhost:8000/ws                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Frontend Setup

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND SETUP                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  # Navigate to frontend directory                                   │
│  cd ../frontend                                                     │
│                                                                     │
│  # Install dependencies                                             │
│  npm install                                                        │
│                                                                     │
│  # Start development server                                         │
│  npm run dev                                                        │
│                                                                     │
│  # Frontend runs at: http://localhost:5173                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Environment Variables

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT VARIABLES                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  # Server Configuration                                             │
│  PORT=8000                                                          │
│  HOST=0.0.0.0                                                       │
│                                                                     │
│  # Database                                                         │
│  DATABASE_URL=postgresql://user:pass@localhost:5432/sportz          │
│                                                                     │
│  # Arcjet Security (Optional)                                       │
│  ARCJET_KEY=your_arcjet_key                                         │
│  ARCJET_ENV=development                                             │
│  ARCJET_MODE=DRY_RUN  # DRY_RUN or LIVE                             │
│                                                                     │
│  # API URL                                                          │
│  API_URL=http://localhost:8000                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

### Backend Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND STRUCTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  sportz-backend/                                                    │
│  ├── .env                         # Environment variables           │
│  ├── .gitignore                                                     │
│  ├── apminsightnode.json          # APM Insight config              │
│  ├── drizzle.config.js            # Drizzle ORM config              │
│  ├── package.json                 # Dependencies & scripts          │
│  ├── package-lock.json                                              │
│  │                                                                  │
│  ├── apminsightdata/              # APM Insight logs                │
│  │   └── logs/                                                      │
│  │                                                                  │
│  ├── drizzle/                     # Database migrations             │
│  │   ├── 0000_volatile_galactus.sql                                 │
│  │   └── meta/                    # Migration metadata              │
│  │       ├── 0000_snapshot.json                                     │
│  │       └── _journal.json                                          │
│  │                                                                  │
│  └── src/                         # Application source code         │
│      ├── index.js                 # Main entry point                │
│      ├── arcjet.js                # Security configuration          │
│      │                                                              │
│      ├── data/                    # Static data                     │
│      │   └── data.json                                              │
│      │                                                              │
│      ├── db/                      # Database layer                  │
│      │   ├── db.js                # Connection setup                │
│      │   └── schema.js            # Drizzle schemas                 │
│      │                                                              │
│      ├── routes/                  # Express route handlers          │
│      │   ├── matches.route.js     # Match CRUD                      │
│      │   └── commentary.route.js  # Commentary CRUD + broadcast     │
│      │                                                              │
│      ├── validation/              # Zod validation schemas          │
│      │   ├── matches.js                                             │
│      │   └── commentary.js                                          │
│      │                                                              │
│      ├── ws/                      # WebSocket server                │
│      │   └── server.js            # WebSocket core implementation   │
│      │                                                              │
│      ├── utils/                   # Utility functions               │
│      │   └── match-status.js      # Match status calculator         │
│      │                                                              │
│      └── seed/                    # Database seeding                │
│          └── seed.js                                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Frontend Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND STRUCTURE                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  sportz-frontend/                                                   │
│  ├── .gitignore                                                     │
│  ├── package.json                 # Dependencies & scripts          │
│  ├── vite.config.js              # Vite configuration               │
│  ├── eslint.config.js            # ESLint configuration             │
│  │                                                                  │
│  ├── public/                     # Static assets                    │
│  │   └── images/                                                    │
│  │                                                                  │
│  └── src/                        # Application source code          │
│      ├── main.jsx                # Entry point                      │
│      ├── App.jsx                 # Root component                   │
│      │                                                              │
│      ├── assets/                 # Images, fonts, etc.              │
│      │                                                              │
│      ├── components/             # Reusable components              │
│      │   ├── AdminPanel/         # Admin components                 │
│      │   │   ├── Dashboard.jsx                                      │
│      │   │   ├── CreateMatch.jsx                                    │
│      │   │   └── MatchList.jsx                                      │
│      │   ├── Layout/             # Layout components                │
│      │   └── common/             # Shared components                │
│      │                                                              │
│      ├── pages/                  # Page components                  │
│      │   ├── MatchesList.jsx     # View all matches                 │
│      │   ├── MatchDetail.jsx     # View match + commentary          │
│      │   ├── AdminLogin.jsx      # Admin login page                 │
│      │   └── AdminDashboard.jsx  # Admin dashboard                  │
│      │                                                              │
│      ├── services/               # API and WebSocket services       │
│      │   ├── api.js              # Axios API client                 │
│      │   └── websocket.js        # WebSocket client                 │
│      │                                                              │
│      ├── store/                  # Redux state management           │
│      │   ├── index.js            # Store configuration              │
│      │   └── slices/             # Redux slices                     │
│      │       ├── matchesSlice.js                                    │
│      │       ├── commentarySlice.js                                 │
│      │       └── websocketSlice.js                                  │
│      │                                                              │
│      ├── context/                # React Context (if used)          │
│      │                                                              │
│      └── utils/                  # Utility functions                │
│          └── helpers.js                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```


