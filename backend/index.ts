import express from "express";
import "dotenv/config";
import cors from "cors";
import {
  shortenUrl,
  redirectUrl,
  getUrls,
  urlStats,
} from "./controllers/urlShortener.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1000;

app.get("/", (req, res) => {
  res.send("Welcome to Snip0 URL Shortener API.");
});

app.post("/api/urls", shortenUrl);
app.get("/api/urls", getUrls);
app.get("/api/stats", urlStats);
app.get("/:shortCode", redirectUrl);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
