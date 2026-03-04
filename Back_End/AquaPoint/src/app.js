import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors({ origin: "*" }));       
app.use(express.json());            

app.get("/health", (req, res) => { // testar se está on
  res.json({ ok: true });
});

app.use("/api/users", usersRoutes);

export default app;