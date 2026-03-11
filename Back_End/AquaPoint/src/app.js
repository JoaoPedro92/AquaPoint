import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user.routes.js";
import aquaPointsRoutes from "./routes/aquapoints.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";


const app = express();

app.use(cors({ origin: "*" }));       
app.use(express.json());            

app.get("/health", (req, res) => { // testar se está on
  res.json({ ok: true });
});

app.use("/api/users", usersRoutes);
app.use("/api/aquapoints", aquaPointsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/reviews", reviewsRoutes);

export default app;