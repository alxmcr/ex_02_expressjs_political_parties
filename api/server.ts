import express from "express";
import politicalPartiesRoutes from "./routes/political-parties.routes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/political-parties", politicalPartiesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
