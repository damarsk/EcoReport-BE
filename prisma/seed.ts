import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("programmerakhirjaman123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@ecoreport.com",
      phone_number: "081234567890",
      password: hashedPassword,
      role: "1",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
