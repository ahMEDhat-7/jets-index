import { useTranslation } from "react-i18next";
import { useDesignStore } from "../store/useDesignStore";
import { Plane, Target, Eye, Heart, Rocket, Factory, MapPin, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { ScrollReveal } from "../components/ScrollReveal";

export default function HomePage() {
  const { t } = useTranslation();
  const { stats, isLoading } = useDesignStore();

  const statItems = [
    { icon: Plane, key: "platforms", value: stats?.totalPlatforms || 0 },
    { icon: Layers, key: "categories", value: stats?.totalCategories || 0 },
    { icon: Factory, key: "manufacturers", value: stats?.totalManufacturers || 0 },
    { icon: MapPin, key: "countries", value: stats?.totalCountries || 0 },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <section className="relative overflow-hidden bg-[hsl(var(--card))] border-b border-[hsl(var(--border))]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[hsl(var(--primary))] font-semibold tracking-wider uppercase text-sm mb-3">{t("Home.hero.tagline")}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-[hsl(var(--card-foreground))] font-display mb-4">
              {t("Home.hero.title")}
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] mb-6">
              {t("Home.hero.subtitle")}
            </p>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
              {t("Home.hero.description")}
            </p>
            <Link
              to="/en/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Plane className="w-5 h-5" />
              {t("Home.hero.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--muted))]/50 border-b border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item) => (
              <div key={item.key} className="text-center">
                <item.icon className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--primary))]" />
                <p className="text-2xl font-bold text-[hsl(var(--card-foreground))]">
                  {isLoading ? "..." : <AnimatedCounter end={item.value} />}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))] capitalize">{t(`Home.stats.${item.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-2xl p-8 md:p-12 border border-[hsl(var(--border))] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-xl">
                  <Target className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <h2 className="text-2xl font-bold text-[hsl(var(--card-foreground))] font-display">{t("Home.about.goal.title")}</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-lg">
                {t("Home.about.goal.content")}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-2xl p-8 md:p-12 border border-[hsl(var(--border))] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-xl">
                  <Eye className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <h2 className="text-2xl font-bold text-[hsl(var(--card-foreground))] font-display">{t("Home.about.vision.title")}</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-lg">
                {t("Home.about.vision.content")}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-2xl p-8 md:p-12 border border-[hsl(var(--border))] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-xl">
                  <Heart className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <h2 className="text-2xl font-bold text-[hsl(var(--card-foreground))] font-display">{t("Home.about.purpose.title")}</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-lg">
                {t("Home.about.purpose.content")}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-2xl p-8 md:p-12 border border-[hsl(var(--border))] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-xl">
                  <Rocket className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <h2 className="text-2xl font-bold text-[hsl(var(--card-foreground))] font-display">{t("Home.about.whatsNext.title")}</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                {t("Home.about.whatsNext.content")}
              </p>
              <div className="p-4 bg-[hsl(var(--muted))] rounded-xl border border-[hsl(var(--border))]">
                <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-2">{t("Home.about.whatsNext.comingSoon")}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Advanced comparison tools</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}