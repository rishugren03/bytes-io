import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updatedUser = await prisma.profile.update({
    where: { username: 'its yash' },
    data: { status: 'approved' }
  });
  console.log("Approved User:", updatedUser);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
