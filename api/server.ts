import express from "express";
import cors from "cors";
import politicalPartiesRoutes from "./routes/political-parties.routes";
import swaggerRoutes from "./routes/swagger.routes";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/political-parties", politicalPartiesRoutes);
app.use("/api/swagger", swaggerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is running on http://localhost:${PORT}/api/swagger`);
});
