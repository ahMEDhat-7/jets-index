import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const platforms = await prisma.platform.findMany({
    select: { id: true, technicalSpecs: true },
  });

  let fixed = 0;

  for (const platform of platforms) {
    const specs = platform.technicalSpecs;
    if (specs === null || specs === undefined) continue;

    let raw: Record<string, unknown>;
    if (typeof specs === "string") {
      try { raw = JSON.parse(specs); } catch { continue; }
    } else if (typeof specs === "object") {
      raw = specs as Record<string, unknown>;
    } else {
      continue;
    }

    if (raw.en && typeof raw.en === "object") {
      console.log(`  OK ${platform.id.slice(0, 8)}: already nested`);
      continue;
    }

    const nested = { en: raw as Record<string, string>, ar: {} as Record<string, string> };
    await prisma.platform.update({
      where: { id: platform.id },
      data: { technicalSpecs: nested as unknown as Prisma.InputJsonValue },
    });
    console.log(`  Fixed ${platform.id.slice(0, 8)}: flat → nested { en, ar }`);
    fixed++;
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
