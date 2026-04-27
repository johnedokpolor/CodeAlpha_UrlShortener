import express from "express";
import "dotenv/config";
import cors from "cors";
import { shortenUrl, redirectUrl, getUrls } from "./controllers/urlShortener";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1000;

app.post("/api/urls", shortenUrl);
app.get("/api/urls", getUrls);
app.get("/:shortCode", redirectUrl);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
