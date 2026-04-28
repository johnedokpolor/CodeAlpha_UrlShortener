import { prisma } from "../lib/prisma";

const seed = async (req: any, res: any) => {
  try {
    await prisma.url.deleteMany();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seed({}, {});
