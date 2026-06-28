import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

import { testConnection } from "./config/db_connect.js";
import authRoutes from "./routes/auth_route/auth.routes.js";
import todoRoutes from "./routes/todo_route/todo.route.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



const PORT = process.env.PORT || 3000;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/todos",todoRoutes)

app.get("/", (req, res) => {
  res.send("Server started");
});

(async () => {
  try {
    const dbOk = await testConnection();

    if (!dbOk) {
      console.log("DB failed ❌ server not starting");
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Startup error ❌", error.message);
    process.exit(1);
  }
})();