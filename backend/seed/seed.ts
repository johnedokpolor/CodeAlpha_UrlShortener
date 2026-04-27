import { prisma } from "../lib/prisma";

const seed = async (req: any, res: any) => {
  try {
    await prisma.url.createMany({
      data: [
        {
          originalUrl: "www.greenlandtelcoms.com.ng",
          shortCode: "3455",
        },
        {
          originalUrl: "www.anotherexample.com",
          shortCode: "def456",
        },
        {
          originalUrl: "www.example.com",
          shortCode: "abc123",
        },
      ],
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seed({}, {});
