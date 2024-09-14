import express from "express";
import http from "http";
import session from "express-session";
import passport from "passport";
import ConnectMongo from "connect-mongodb-session";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import TypeDefs from "./type/typeDefs.js";
import Resolvers from "./resolvers/resolver.js";
import { configurePassport } from "./passport/passport.js";
import dotenv from "dotenv";
import cors from "cors";
import { buildContext } from "graphql-passport";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const MongoDbStore = ConnectMongo(session);
const store = new MongoDbStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

store.on("error", (err) => console.log("Session store error:", err));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://budgettrackerui.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 6, // 6 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport();

const server = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const context = buildContext({ req, res });
      console.log("GraphQL Context - Authenticated:", context.isAuthenticated());
      console.log("GraphQL Context - User:", context.getUser()?.id);
      return context;
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Test route for authentication
app.get("/test-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Database connection error:", err));
