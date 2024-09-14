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
import { configurePassport } from "./passport/passport.js"; // Import Passport configuration
import dotenv from "dotenv";
import cors from "cors";
import { buildContext } from "graphql-passport";

dotenv.config(); // Load environment variables from .env file
const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: "https://budgettrackerui.vercel.app", // Adjust this to match your client's URL
    credentials: true,
  }),
);
const MongoDbStore = ConnectMongo(session);
const store = new MongoDbStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

store.on("error", (err) => console.log("Session store error:", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Make sure this is set correctly
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 6, // 6 days
      httpOnly: true,
    },
  }),
);
// Initialize Passport

app.use(passport.initialize());
app.use(passport.session());
(async () => {
  await configurePassport();
})();
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
    context: async ({ req, res }) => buildContext({ req, res }),
  }),
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DataBase");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => console.log("Database connection error:", err));
