import { PrismaClient, Role } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

const LOCALES = ["en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const passwordHash = hashSync("admin123", 10);

const countriesData = [
  {
    id: uuid(),
    en: { name: "United States" },
    ar: { name: "الولايات المتحدة" },
  },
  {
    id: uuid(),
    en: { name: "Russia" },
    ar: { name: "روسيا" },
  },
  {
    id: uuid(),
    en: { name: "China" },
    ar: { name: "الصين" },
  },
  {
    id: uuid(),
    en: { name: "United Kingdom" },
    ar: { name: "المملكة المتحدة" },
  },
  {
    id: uuid(),
    en: { name: "France" },
    ar: { name: "فرنسا" },
  },
  {
    id: uuid(),
    en: { name: "Germany" },
    ar: { name: "ألمانيا" },
  },
  {
    id: uuid(),
    en: { name: "Sweden" },
    ar: { name: "السويد" },
  },
];

const categoriesData = [
  {
    id: uuid(),
    en: { name: "Fighter Jet", domain: "Air Superiority" },
    ar: { name: "مقاتلة", domain: "التفوق الجوي" },
  },
  {
    id: uuid(),
    en: { name: "Bomber", domain: "Strategic Strike" },
    ar: { name: "قاذفة", domain: "الضرب الاستراتيجي" },
  },
  {
    id: uuid(),
    en: { name: "Attack Helicopter", domain: "Close Air Support" },
    ar: { name: "مروحية هجومية", domain: "الدعم الجوي القريب" },
  },
  {
    id: uuid(),
    en: { name: "Transport", domain: "Logistics" },
    ar: { name: "نقل", domain: "اللوجستيات" },
  },
  {
    id: uuid(),
    en: { name: "Trainer", domain: "Training" },
    ar: { name: "تدريب", domain: "التدريب" },
  },
  {
    id: uuid(),
    en: { name: "UAV", domain: "Unmanned Systems" },
    ar: { name: "مسيرة", domain: "الأنظمة غير المأهولة" },
  },
];

const manufacturersData = [
  {
    id: uuid(),
    countryId: countriesData[0].id,
    en: { name: "Lockheed Martin", specialization: "Fighter Aircraft" },
    ar: { name: "لوكهيد مارتن", specialization: "طائرات المقاتلة" },
  },
  {
    id: uuid(),
    countryId: countriesData[0].id,
    en: { name: "Boeing", specialization: "Multi-role Aircraft" },
    ar: { name: "بوينغ", specialization: "طائرات متعددة المهام" },
  },
  {
    id: uuid(),
    countryId: countriesData[0].id,
    en: { name: "Northrop Grumman", specialization: "Stealth Aircraft" },
    ar: { name: "نورثروب غرومان", specialization: "طائرات التخفي" },
  },
  {
    id: uuid(),
    countryId: countriesData[1].id,
    en: { name: "Sukhoi", specialization: "Air Superiority Fighters" },
    ar: { name: "سوخوي", specialization: "مقاتلات التفوق الجوي" },
  },
  {
    id: uuid(),
    countryId: countriesData[1].id,
    en: { name: "Mikoyan", specialization: "Light Fighters" },
    ar: { name: "ميكويان", specialization: "المقاتلات الخفيفة" },
  },
  {
    id: uuid(),
    countryId: countriesData[2].id,
    en: { name: "Chengdu Aircraft", specialization: "Fighter Aircraft" },
    ar: { name: "تشينغدو للطائرات", specialization: "طائرات المقاتلة" },
  },
  {
    id: uuid(),
    countryId: countriesData[4].id,
    en: { name: "Dassault Aviation", specialization: "Multi-role Fighters" },
    ar: { name: "داسو للطيران", specialization: "مقاتلات متعددة المهام" },
  },
  {
    id: uuid(),
    countryId: countriesData[3].id,
    en: { name: "BAE Systems", specialization: "Combat Aircraft" },
    ar: { name: "بي إيه إي سيستمز", specialization: "طائرات القتال" },
  },
];

const platformsData = [
  {
    id: uuid(),
    unitCostUsd: 82500000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 1.6",
      range: "2800km",
      ceiling: "15240m",
      firstFlight: "2006",
    }),
    imageUrl: "/images/f35.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[0].id,
    countryId: countriesData[0].id,
    en: {
      name: "F-35 Lightning II",
      description:
        "The F-35 Lightning II is an American family of single-seat, single-engine, all-weather stealth multirole combat aircraft.",
    },
    ar: {
      name: "إف-35 لايتنيغ الثاني",
      description:
        "إف-35 لايتنيغ الثاني هو عائلة من الطائرات القتالية الخفيفة متعددة المهام من الجيل الخامس من الولايات المتحدة.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 77000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.0",
      range: "2000km",
      ceiling: "20000m",
      firstFlight: "1997",
    }),
    imageUrl: "/images/f22.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[0].id,
    countryId: countriesData[0].id,
    en: {
      name: "F-22 Raptor",
      description:
        "The F-22 Raptor is a fifth-generation, single-seat, twin-engine, super-maneuverable fighter aircraft.",
    },
    ar: {
      name: "إف-22 رابتر",
      description:
        "إف-22 رابتر هي طائرة مقاتلة من الجيل الخامس ذات مقعد واحد ومحركين وقابلة للمناورة الفائقة.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 35000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.0",
      range: "3000km",
      ceiling: "18000m",
      firstFlight: "1981",
    }),
    imageUrl: "/images/f15.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[1].id,
    countryId: countriesData[0].id,
    en: {
      name: "F-15 Eagle",
      description:
        "The F-15 Eagle is an American twin-engine, all-weather tactical fighter aircraft designed by McDonnell Douglas.",
    },
    ar: {
      name: "إف-15 إيجل",
      description:
        "إف-15 إيجل هي طائرة مقاتلة تكتيكية ثنائية المحرك من جميع الأحوال الجوية من تصميم ماكدونيل دوغلاس.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 85000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.0",
      range: "3500km",
      ceiling: "20000m",
      firstFlight: "1977",
    }),
    imageUrl: "/images/su57.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[3].id,
    countryId: countriesData[1].id,
    en: {
      name: "Sukhoi Su-57",
      description:
        "The Sukhoi Su-57 is a stealth, single-seat, twin-engine multirole fifth-generation jet fighter.",
    },
    ar: {
      name: "سوخوي سو-57",
      description:
        "سوخوي سو-57 هي طائرة مقاتلة خفيفة ثنائية المحرك متعددة المهام من الجيل الخامس.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 110000000,
    operationalStatus: "Development",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.5",
      range: "3000km",
      ceiling: "22000m",
      firstFlight: "2010",
    }),
    imageUrl: "/images/su57e.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[3].id,
    countryId: countriesData[1].id,
    en: {
      name: "Sukhoi Su-75 Checkmate",
      description:
        "The Su-75 Checkmate is a single-engine fifth-generation stealth fighter in development.",
    },
    ar: {
      name: "سوخوي سو-75 تشكيتميت",
      description:
        "سو-75 تشكيتميت هي مقاتلة خفيفة من الجيل الخامس ذات محرك واحد قيد التطوير.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 30000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 1.8",
      range: "2600km",
      ceiling: "17000m",
      firstFlight: "2010",
    }),
    imageUrl: "/images/j20.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[5].id,
    countryId: countriesData[2].id,
    en: {
      name: "Chengdu J-20",
      description:
        "The Chengdu J-20 is a fifth-generation stealth fighter aircraft developed by China.",
    },
    ar: {
      name: "تشينغدو جي-20",
      description:
        "تشينغدو جي-20 هي طائرة مقاتلة خفيفة من الجيل الخامس من تطوير الصين.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 100000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 1.8",
      range: "3700km",
      ceiling: "15000m",
      firstFlight: "1986",
    }),
    imageUrl: "/images/b2.jpg",
    categoryId: categoriesData[1].id,
    manufacturerId: manufacturersData[2].id,
    countryId: countriesData[0].id,
    en: {
      name: "B-2 Spirit",
      description:
        "The B-2 Spirit is a multi-role heavy bomber capable of delivering both conventional and nuclear weapons.",
    },
    ar: {
      name: "بي-2 سبيريت",
      description:
        "بي-2 سبيريت هي قاذفة ثقيلة متعددة المهام قادرة على إسلاق الأسلحة التقليدية والنووية.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 92000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.2",
      range: "2000km",
      ceiling: "19000m",
      firstFlight: "1986",
    }),
    imageUrl: "/images/rafale.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[6].id,
    countryId: countriesData[4].id,
    en: {
      name: "Dassault Rafale",
      description:
        "The Dassault Rafale is a French multirole fighter aircraft designed and built by Dassault Aviation.",
    },
    ar: {
      name: "داسو رافال",
      description:
        "داسو رافال هي طائرة مقاتلة فرنسية متعددة المهام من تصميم وتصنيع داسو للطيران.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 100000000,
    operationalStatus: "Development",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.0",
      range: "3000km",
      ceiling: "20000m",
      firstFlight: "2030",
    }),
    imageUrl: "/images/tempest.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[7].id,
    countryId: countriesData[3].id,
    en: {
      name: "BAE Tempest",
      description:
        "The BAE Tempest is a proposed sixth-generation stealth fighter aircraft being developed for the RAF.",
    },
    ar: {
      name: "بي إيه إي تمبست",
      description:
        "بي إيه إي تمبست هي طائرة مقاتلة خفيفة من الجيل السادس مقترحة لسلاح الجو الملكي.",
    },
  },
  {
    id: uuid(),
    unitCostUsd: 35000000,
    operationalStatus: "Active",
    technicalSpecs: JSON.stringify({
      maxSpeed: "Mach 2.0",
      range: "3000km",
      ceiling: "18000m",
      firstFlight: "1999",
    }),
    imageUrl: "/images/j10.jpg",
    categoryId: categoriesData[0].id,
    manufacturerId: manufacturersData[5].id,
    countryId: countriesData[2].id,
    en: {
      name: "Chengdu J-10C",
      description:
        "The J-10C is a 4.5-generation multirole fighter aircraft developed by Chengdu Aircraft Corporation.",
    },
    ar: {
      name: "تشينغدو جي-10 سي",
      description:
        "جي-10 سي هي طائرة مقاتلة متعددة المهام من الجيل 4.5 من تطوير شركة تشينغدو للطائرات.",
    },
  },
];

const blogsData = [
  {
    id: uuid(),
    publishedAt: new Date("2026-01-15"),
    en: {
      title: "The Future of Air Superiority",
      summary: "Exploring next-generation fighter aircraft technologies",
      content:
        "# The Future of Air Superiority\n\nMilitary aviation is entering a new era of stealth, AI integration, and hypersonic capabilities.\n\n## Key Trends\n\n- **6th Generation Fighters**: The United States, Europe, and China are all developing sixth-generation fighter aircraft.\n- **AI Integration**: Autonomous wingmen and AI-assisted combat decision-making.\n- **Hypersonic Weapons**: Integration of hypersonic missiles into existing platforms.\n\nThe battlefield of tomorrow will be fundamentally different from today's.",
    },
    ar: {
      title: "مستقبل التفوق الجوي",
      summary: "استكشاف تقنيات طائرات المقاتلة من الجيل القادم",
      content:
        "# مستقبل التفوق الجوي\n\nيدخل الطيران العسكري حقبة جديدة من التخفي والذكاء الاصطناعي وقدرات الأسرع من الصوت.\n\n## الاتجاهات الرئيسية\n\n- **مقاتلات الجيل السادس**: الولايات المتحدة والصين وأوروبا تطور جميعها مقاتلات من الجيل السادس.\n- **التكامل مع الذكاء الاصطناعي**: أجنحة ذاتية القيادة واتخاذ قرارات القتال بمساعدة الذكاء الاصطناعي.\n- **أسلحة الأسرع من الصوت**: دمج صواريخ الأسرع من الصوت في المنصات الحالية.\n\nساحة المعركةغداً ستكون مختلفة جذرياً عن اليوم.",
    },
  },
  {
    id: uuid(),
    publishedAt: new Date("2026-02-20"),
    en: {
      title: "Stealth Technology Evolution",
      summary: "How radar-evading shapes have transformed aircraft design",
      content:
        "# Stealth Technology Evolution\n\nStealth technology has evolved from the F-117 to the F-35, fundamentally changing how aircraft are designed.\n\n## Design Principles\n\n1. **Faceted Surfaces**: Early stealth used flat, angled surfaces to deflect radar.\n2. **Curved Surfaces**: Modern stealth uses advanced computational modeling for curved shapes.\n3. **Radar-Absorbent Materials**: New composites that absorb radar energy.\n\nThe future of stealth lies in adaptive materials and active cancellation technologies.",
    },
    ar: {
      title: "تطور تكنولوجيا التخفي",
      summary: "كيف غيرت الأشكال المراوغة للرادار تصميم الطائرات",
      content:
        "# تطور تكنولوجيا التخفي\n\nتطورت تكنولوجيا التخوي من إف-117 إلى إف-35، مما غير بشكل جذري كيفية تصميم الطائرات.\n\n## مبادئ التصميم\n\n1. **الأسطح الم faceted**: استخدم التخفي المبكر أسطحًا مسطحة ومالئة لطرد الرادار.\n2. **الأسطح المنحنية**: يستخدم التخفي الحديث النمذجة الحاسوبية المتقدمة للأشكال المنحنية.\n3. **مواد امتصاص الرادار**: مكونات جديدة تمتص طاقة الرادار.\n\nمستقبل التخفي يكمن في المواد التكيفية وتقنيات الإلغاء النشط.",
    },
  },
  {
    id: uuid(),
    publishedAt: new Date("2026-03-10"),
    en: {
      title: "UAV Revolution in Modern Warfare",
      summary: "The rise of unmanned combat aerial vehicles",
      content:
        "# UAV Revolution in Modern Warfare\n\nUnmanned aerial vehicles are reshaping modern warfare with their persistence, lower cost, and reduced risk to pilots.\n\n## Notable Systems\n\n- **MQ-9 Reaper**: The backbone of US drone operations.\n- **Bayraktar TB2**: Proven in multiple conflicts.\n- **RQ-4 Global Hawk**: High-altitude surveillance.\n\nThe integration of AI and swarm technology will further transform the battlefield.",
    },
    ar: {
      title: "ثورة الطائرات المسيّرة في الحرب الحديثة",
      summary: "صعود المركبات الجوية المسيّرة القتالية",
      content:
        "# ثورة الطائرات المسيّرة في الحرب الحديثة\n\nتعيد المركبات الجوية المسيّرة تشكيل الحرب الحديثة من خلال استمرارية وتكلفة أقل وتقليل المخاطر على الطيارين.\n\n## الأنظمة البارزة\n\n- **إم كيو-9 ريبير**: العمود الفقري لعمليات الطائرات المسيّرة الأمريكية.\n- **بايراختار تي بي-2**: أثبتت كفاءتها في صراعات متعددة.\n- **آر كيو-4 غلوبال هوك**: مراقبة ش altitude عالية.\n\nستعيد تكامل الذكاء الاصطناعي وتقنية السرب تشكيل ساحة المعركة.",
    },
  },
];

async function main() {
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  console.log("Seeding database...");

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: "admin@jetsindex.com",
        password: passwordHash,
        role: Role.ADMIN,
      },
      {
        email: "user@jetsindex.com",
        password: passwordHash,
        role: Role.USER,
      },
    ],
  });
  console.log("  ✓ Users created");

  // Create countries with translations
  for (const country of countriesData) {
    await prisma.country.create({
      data: {
        id: country.id,
        translations: {
          createMany: {
            data: LOCALES.map((locale) => ({
              locale,
              name: country[locale].name,
            })),
          },
        },
      },
    });
  }
  console.log("  ✓ Countries created");

  // Create categories with translations
  for (const category of categoriesData) {
    await prisma.category.create({
      data: {
        id: category.id,
        translations: {
          createMany: {
            data: LOCALES.map((locale) => ({
              locale,
              name: category[locale].name,
              domain: category[locale].domain,
            })),
          },
        },
      },
    });
  }
  console.log("  ✓ Categories created");

  // Create manufacturers with translations
  for (const manufacturer of manufacturersData) {
    await prisma.manufacturer.create({
      data: {
        id: manufacturer.id,
        countryId: manufacturer.countryId,
        translations: {
          createMany: {
            data: LOCALES.map((locale) => ({
              locale,
              name: manufacturer[locale].name,
              specialization: manufacturer[locale].specialization,
            })),
          },
        },
      },
    });
  }
  console.log("  ✓ Manufacturers created");

  // Create platforms with translations
  for (const platform of platformsData) {
    const { en, ar, ...platformFields } = platform;
    await prisma.platform.create({
      data: {
        ...platformFields,
        unitCostUsd: platform.unitCostUsd,
        translations: {
          createMany: {
            data: LOCALES.map((locale) => ({
              locale,
              name: platform[locale].name,
              description: platform[locale].description,
            })),
          },
        },
      },
    });
  }
  console.log("  ✓ Platforms created");

  // Create blogs with translations
  for (const blog of blogsData) {
    const { en, ar, ...blogFields } = blog;
    await prisma.blog.create({
      data: {
        ...blogFields,
        translations: {
          createMany: {
            data: LOCALES.map((locale) => ({
              locale,
              title: blog[locale].title,
              summary: blog[locale].summary,
              content: blog[locale].content,
            })),
          },
        },
      },
    });
  }
  console.log("  ✓ Blogs created");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
