import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT || 3000, () => {
    console.log(`Servere is running on port ${PORT}`);
  });
};

startServer();
