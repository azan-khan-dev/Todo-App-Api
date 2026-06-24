import { config } from "dotenv";
config();
import express from "express";

import { testConnection } from "./config/db_connect.js";



const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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