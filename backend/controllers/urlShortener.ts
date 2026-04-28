import { nanoid } from "nanoid";
import { prisma } from "../lib/prisma.js";

const shortenUrl = async (req: any, res: any) => {
  const { originalUrl } = req.body;
  const shortCode = nanoid(3);
  try {
    if (!originalUrl)
      return res.status(400).send("Original Url must be provided");
    const existingEntry = await prisma.url.findFirst({
      where: { originalUrl: originalUrl.trim() },
    });
    if (existingEntry) {
      return res.status(200).json({
        message: "Url already shortened",
        shortUrl: `https://snip0.vercel.app/${existingEntry.shortCode}`,
      });
    }

    const entry = await prisma.url.create({
      data: {
        originalUrl: originalUrl.trim(),
        shortCode,
      },
    });
    res.status(200).json({
      message: "Url shortened successfully",
      shortUrl: `https://snip0.vercel.app/${shortCode}`,
    });
  } catch (error) {
    res.status(500).send("Database Error");
    console.log(error);
  }
};

const redirectUrl = async (req: any, res: any) => {
  const { shortCode } = req.params;
  try {
    if (!shortCode) return res.status(400).send("Short Code must be provided");
    const entry = await prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    });

    if (!entry) return res.status(404).send("Link does not exist.");

    res.status(200).json({ originalUrl: entry.originalUrl });
  } catch (error) {
    res.status(500).send("Database Error");
    console.log(error);
  }
};

const getUrls = async (req: any, res: any) => {
  try {
    const urls = await prisma.url.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).send("Database Error");
    console.log(error);
  }
};
const urlStats = async (req: any, res: any) => {
  try {
    const totalClicks = await prisma.url.aggregate({
      _sum: {
        clicks: true,
      },
    });
    res.status(200).json(totalClicks._sum.clicks);
  } catch (error) {
    res.status(500).send("Database Error");
    console.log(error);
  }
};

export { shortenUrl, redirectUrl, getUrls, urlStats };
