import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const platforms = await prisma.platform.findMany({
    select: { id: true, technicalSpecs: true },
  });

  let fixed = 0;

  for (const platform of platforms) {
    const specs = platform.technicalSpecs;
    if (specs === null || specs === undefined) continue;

    if (typeof specs === "string") {
      try {
        const parsed = JSON.parse(specs);
        await prisma.platform.update({
          where: { id: platform.id },
          data: { technicalSpecs: parsed },
        });
        console.log(`  Fixed ${platform.id}: parsed string to object`);
        fixed++;
      } catch {
        console.log(`  Skipped ${platform.id}: failed to parse`);
      }
    } else if (typeof specs === "object") {
      console.log(`  OK ${platform.id}: already an object`);
    }
  }

  console.log(`\nFixed ${fixed} platform(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
