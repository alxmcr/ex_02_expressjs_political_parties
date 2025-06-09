import cors from "cors";
import express from "express";
import morgan from "morgan";
import politicalPartiesRoutes from "./routes/political-parties.routes";
import statusRoutes from "./routes/status.routes";
import swaggerRoutes from "./routes/swagger.routes";
import "./sentry";

// Sentry
const Sentry = require("@sentry/node");

// Get the host machine's IP address like when we deploy to a server
const host = process.env.HOST || "localhost";
// Port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => {
  res.json({
    status: "Welcome to the API!",
    docs: `http://${host}:${PORT}/api/swagger`,
  });
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/api/status", statusRoutes);
app.use("/api/political-parties", politicalPartiesRoutes);
app.use("/api/swagger", swaggerRoutes);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err: any, req: any, res: any, next: any) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is running on http://${host}:${PORT}/api/swagger`);
});
