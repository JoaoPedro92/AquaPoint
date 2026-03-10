import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user.routes.js";
import aquaPointsRoutes from "./routes/aquapoints.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import authRoutes from "./routes/auth.routes.js"


const app = express();

// Extending upload image limit
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({ origin: "*" }));       

app.get("/health", (req, res) => { // testar se está on
  res.json({ ok: true });
});

app.use("/api/users", usersRoutes);
app.use("/api/aquapoints", aquaPointsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/auth", authRoutes);

export default app;