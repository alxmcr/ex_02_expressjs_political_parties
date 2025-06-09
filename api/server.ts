import express from "express";
import cors from "cors";
import morgan from "morgan";
import politicalPartiesRoutes from "./routes/political-parties.routes";
import swaggerRoutes from "./routes/swagger.routes";
import statusRoutes from "./routes/status.routes";

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
app.use("/api/status", statusRoutes);
app.use("/api/political-parties", politicalPartiesRoutes);
app.use("/api/swagger", swaggerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is running on http://${host}:${PORT}/api/swagger`);
});
