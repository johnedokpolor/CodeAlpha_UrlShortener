import { nanoid } from "nanoid";
import { prisma } from "../lib/prisma";

const shortenUrl = async (req: any, res: any) => {
  const { originalUrl } = req.body;
  const shortCode = nanoid(3);
  try {
    if (!originalUrl)
      return res.status(400).send("Original Url must be provided");
    const entry = await prisma.url.create({
      data: {
        originalUrl: originalUrl.trim(),
        shortCode,
      },
    });
    res.status(200).json({
      shortUrl: `${req.protocol}://${req.host}/${shortCode}`,
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
    const urls = await prisma.url.findMany();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).send("Database Error");
    console.log(error);
  }
};

export { shortenUrl, redirectUrl, getUrls };
