"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ArrowIcon from "../shared/ArrowIcon";
import ClipPathReveal from "../shared/ClipPathReveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { Marquee, ConsultationForm } from "./ServicesPage";
import Counter from "../shared/Counter";
import type { Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Curated high-end editorial placeholders
const PORTRAIT_IMAGE = "/images/Vee.webp";
const HOUSE_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop";

const content = {
  // Page Header
  eyebrow: {
    de: "UNSERE PHILOSOPHIE",
    en: "OUR PHILOSOPHY",
  },
  title: {
    de: "Wahrheit",
    en: "Truth",
  },

  // Section 1: Wahrheit
  wahrheitIntro: {
    de: "Wahrheit, lat. Veritas oder im italienischen Verità, ist ein zentraler Begriff unserer Unternehmensphilosophie.",
    en: "Truth, lat. Veritas or in Italian Verità, is a central concept of our corporate philosophy.",
  },
  wahrheitGoddess: {
    de: "Veritali Immobilien ist benannt nach Veritas, der römischen Göttin der Wahrheit und Wahrhaftigkeit, deren Symbol auch das Licht und die Sonne ist. Denn: die Wahrheit kommt immer ans Licht!",
    en: "Veritali Real Estate is named after Veritas, the Roman goddess of truth and truthfulness, whose symbol is also light and the sun. Because: truth always comes to light!",
  },
  wahrheitBocca: {
    de: "Und wer kennt ihn nicht, den berühmten “Bocca della Verità” in Rom. Die Sage hat es, dass er jeden Lügner enttarnt, der ihm die Hand in den Mund legt, indem er diese abbeißt.",
    en: "And who doesn't know the famous 'Bocca della Verità' in Rome. Legend has it that it exposes every liar who puts their hand in its mouth by biting it off.",
  },
  wahrheitQuestion: {
    de: "Was hat das mit Immobilien zu tun?",
    en: "What does this have to do with real estate?",
  },
  wahrheitValues: {
    de: "Wahrheit, Fairness, Transparenz und Verlässlichkeit – dies sind die Werte, die uns ausmachen.",
    en: "Truth, fairness, transparency, and reliability – these are the values that define us.",
  },
  wahrheitValuation: {
    de: "Am Anfang steht für uns immer eine realistische Einschätzung Ihrer Immobilie, die nicht darauf abzielt, durch die Nennung eines überzogenen Preises andere Makler “auszustechen” und so Ihren Auftrag zu bekommen. Für uns ist es wichtig, dass wir offen über die Stärken und Mängel Ihrer Immobilie sprechen und gemeinsam, von einem tatsächlichen Marktwert ausgehend, den Angebotspreis für Ihr Objekt festlegen.",
    en: "For us, the beginning is always a realistic valuation of your property, which does not aim to 'outbid' other agents by naming an inflated price to win your listing. For us, it is vital to speak openly about the strengths and shortcomings of your property and together determine the listing price starting from an actual market value.",
  },

  // Section 2: Preise
  preiseTitle: {
    de: "UNSERE PREISE SIND AUSSER KONKURRENZ",
    en: "OUR PRICES ARE UNRIVALED",
  },
  preiseQuestion: {
    de: "Warum?",
    en: "Why?",
  },
  preiseOverhead: {
    de: "Bei uns bezahlen Sie nur unsere Dienstleistung und finanzieren weder überdimensionierte Ladengeschäfte noch ausbeuterische Pyramidensysteme mit.",
    en: "With us, you only pay for our service and do not finance oversized retail offices or exploitative pyramid systems.",
  },
  preiseFranchise: {
    de: "Die großen national oder international agierenden Maklerfirmen basieren meist auf einem Immobilien Franchise, das heißt, dass ein Teil der Provision an den Franchisegeber fließt, und der Rest zum Großteil beim Lizenznehmer hängen bleibt. Der Immobilienberater, der Sie über Wochen oder Monate begleitet und die eigentliche Arbeit leistet, sieht am Ende des Verkaufs nur einen sehr kleinen Bruchteil der Provision auf seinem Konto. Das ist nicht nur unfair, sondern hat natürlich auch Auswirkungen auf Motivation und Qualität.",
    en: "Large national or international brokerage firms are usually based on a franchise model, meaning a portion of the fee flows to the franchisor, and most of the rest remains with the licensee. The agent who accompanies you for weeks or months and does the actual work only sees a very small fraction of the fee in their account. That is not only unfair, but naturally also impacts motivation and quality.",
  },
  preiseCommission: {
    de: "Dadurch dass wir unnötige Kosten auf ein Minimum reduzieren, sind wir in der Lage, nicht nur Ihnen als Verkäufer, sondern auch den Käufern jeweils nur 1,5 % des Kaufpreises (plus 19% gesetzliche Mehrwertsteuer) für die Provision in Rechnung zu stellen.",
    en: "By reducing unnecessary costs to a minimum, we are able to charge both you as the seller and the buyer only 1.5% of the purchase price (plus 19% VAT) for the commission.",
  },
  preiseTransparency: {
    de: "Wir legen zudem größten Wert auf Transparenz. Ganz gleich ob es um die Wertermittlung Ihrer Immobilie geht, die Gebühren, die auf Sie zukommen oder die einzelnen Schritte bis zum erfolgreichen Abschluss des Verkaufs: wir halten Sie von Anfang an auf dem Laufenden. Persönliche Betreuung von Verkäufern und Käufern, die keine Bürozeiten kennt!",
    en: "We also attach great importance to transparency. Whether it is the valuation of your property, the fees you face, or the individual steps to a successful sale: we keep you informed from the very beginning. Personal support for sellers and buyers that knows no office hours!",
  },
  preiseTrust: {
    de: "Wir möchten zu jedem Kunden ein Vertrauensverhältnis aufbauen. Rücksicht auf besondere Umstände, absolute Diskretion und Verlässlichkeit sind dabei selbstverständlich.",
    en: "We want to build a relationship of trust with every client. Consideration of special circumstances, absolute discretion, and reliability are a matter of course.",
  },

  // Section 3: Veritali Hilft
  hilftTitle: {
    de: "VERITALI HILFT! GEBEN STATT GIER",
    en: "VERITALI HELPS! GIVING INSTEAD OF GREED",
  },
  hilftConscience: {
    de: "Wir möchten bei jedem Schritt ein gutes Gewissen haben, und auch Sie sollen aus dem Immobilienverkauf oder Kauf nicht nur mit einem guten Gefühl herausgehen, sondern zudem wissen, dass Sie mitgeholfen haben, etwas Gutes zu tun.",
    en: "We want to have a clean conscience at every step, and you too should leave the sale or purchase of real estate not only with a good feeling, but also knowing that you have helped do something good.",
  },
  hilftPercent: {
    de: "Denn: VERITALI führt aus jedem Verkauf 3 % der Nettocourtage an Entwicklungshilfeprojekte in Afrika ab.",
    en: "Because: VERITALI donates 3% of the net commission from every sale to development projects in Africa.",
  },
  hilftProject: {
    de: "Seit 2021 haben wir ein eigenes Schulprojekt in Kooperation mit dem Verein ARW (Afrikas Renaissance und Wiederaufbau) ins Leben gerufen, das inzwischen über 100 Kindern eine Schulausbildung ermöglicht und Ihren Familien eine langfristige Perspektive zur Existenzsicherung.",
    en: "Since 2021, we have initiated our own school project in cooperation with the association ARW (Afrikas Renaissance und Wiederaufbau e.V.), which now provides schooling for over 100 children and their families a long-term perspective for securing their livelihood.",
  },
  hilftDrVerena: {
    de: "Dr. Verena Beittinger-Lee, Eigentümerin und Geschäftsführerin von Veritali Immobilien, hat viele Jahre selbst in der Wissenschaft und Entwicklungshilfe gearbeitet und ist persönlich an der Umsetzung der Projekte beteiligt. Damit können Sie sicher gehen, dass Ihr Geld auch wirklich da ankommt, wo es am dringendsten benötigt wird.",
    en: "Dr. Verena Beittinger-Lee, owner and managing director of Veritali Real Estate, worked for many years in science and development aid and is personally involved in implementing the projects. This ensures that your money actually arrives where it is needed most.",
  },
  hilftMore: {
    de: "Hier erfahren Sie mehr",
    en: "Learn more here",
  },

  // Section 4: Alleinauftrag
  alleinauftragTitle: {
    de: "Qualifizierter Alleinauftrag",
    en: "Qualified Exclusive Agreement",
  },
  alleinauftragBoutique: {
    de: "Durch einen qualifizierten Alleinauftrag mit Veritali Immobilien können Sie sicher sein, dass sich Ihre Immobilie in den besten Händen befindet. Veritali Immobilien ist ein eigentümergegeführtes Boutique-Maklerbüro, das jedes Objekt mit einem Maximum an Professionalität, persönlichem Engagement, Herzblut und Marktkenntnis bis zum Verkauf begleitet.",
    en: "With a qualified exclusive listing with Veritali Real Estate, you can be sure that your property is in the best hands. Veritali Real Estate is an owner-managed boutique brokerage that accompanies every property to the sale with maximum professionalism, personal commitment, passion, and local market expertise.",
  },
  alleinauftragCongo: {
    de: "Unserer Unternehmensphilosophie getreu garantieren wir Ihnen absolute Integrität, Diskretion und vor allem das gute Gefühl, nicht nur den bestmöglichen Preis für Ihre Immobilie erzielt zu haben, sondern mit Ihrer Courtage sogar noch etwas Gutes getan zu haben: Aus jedem Verkauf fließen 3 % an Hilfsprojekte im Kongo, an deren Umsetzung wir persönlich beteiligt sind.",
    en: "True to our corporate philosophy, we guarantee you absolute integrity, discretion, and above all, the good feeling of not only having achieved the best possible price for your property, but of having done something good with your fee: 3% of every sale goes to aid projects in the Congo, in the implementation of which we are personally involved.",
  },
  bulletsTitle: {
    de: "Veritali Immobilien:",
    en: "Veritali Real Estate:",
  },
  bullets: {
    de: [
      "Faire Preise durch Minimierung unnötiger Kosten",
      "Liebevolle und individuelle Marketingstrategie für jedes Objekt",
      "Persönliche Betreuung von Verkäufern und Käufern, die keine Bürozeiten kennt",
      "Wahrheit, Integrität und Sachkenntnis",
    ],
    en: [
      "Fair prices by minimizing unnecessary costs",
      "Loving and individual marketing strategy for every property",
      "Personal support for sellers and buyers that knows no office hours",
      "Truth, integrity, and expertise",
    ],
  },
  slogan: {
    de: "… mit gutem Gewissen verkaufen!",
    en: "… sell with a clean conscience!",
  },
};

export default function UnternehmenPage({ lang = "de" }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const show = prefersReduced || inView;

  return (
    <div className="bg-brand-bg text-brand-text">
      {/* ---- 1. Header (Wahrheit) ---- */}
      <header className="pt-40 pb-20 px-6 md:px-12">
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4 animate-fade-in">
          {content.eyebrow[lang]}
        </p>
        <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text max-w-5xl">
          <SplitText text={content.title[lang]} />
        </h1>
      </header>

      {/* ---- 2. Section 1 (Wahrheit Story & Portrait) ---- */}
      <section className="px-6 md:px-12 pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-8 font-sans font-medium text-fs-body-m text-brand-muted leading-relaxed max-w-2xl">
          <p className="text-brand-text text-xl font-display leading-snug">
            {content.wahrheitIntro[lang]}
          </p>
          <p>{content.wahrheitGoddess[lang]}</p>
          <p>{content.wahrheitBocca[lang]}</p>

          <div className="pt-8 border-t border-brand-text/10 space-y-6">
            <h3 className="font-display font-medium text-2xl text-brand-orange">
              {content.wahrheitQuestion[lang]}
            </h3>
            <p className="text-brand-text font-semibold">
              {content.wahrheitValues[lang]}
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              {content.wahrheitValuation[lang]}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ClipPathReveal
            src={PORTRAIT_IMAGE}
            alt="Dr. Verena Beittinger-Lee"
            aspectRatioClassName="aspect-[3/4] md:aspect-[4/5]"
          />
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent mt-4">
            Dr. Verena Beittinger-Lee — Geschäftsführerin
          </p>
        </div>
      </section>

      {/* ---- 3. Section 2: Preise (Linen Background) ---- */}
      <section className="bg-brand-lightbg text-[#1E2229] py-28 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Big Typography Graphic Anchor */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-[#468E99] mb-4">
              PROVISION
            </p>
            <span className="font-display font-medium leading-none text-8xl md:text-[10rem] tracking-tighter text-[#468E99]">
              <Counter value="1.5%" />
            </span>
            <p className="font-sans font-medium text-xs text-[#1E2229]/60 mt-4 max-w-xs">
              {lang === "de"
                ? "Für Verkäufer & Käufer gleichermaßen. Fair kalkuliert ohne versteckte Gebühren."
                : "For sellers & buyers alike. Fairly calculated with no hidden fees."}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6">
            <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 leading-tight text-[#1E2229]">
              <SplitText text={content.preiseTitle[lang]} />
            </h2>
            <h3 className="font-display font-medium text-xl text-[#468E99] uppercase tracking-wider">
              {content.preiseQuestion[lang]}
            </h3>
            <p className="font-sans font-medium text-fs-body-m text-[#1E2229]/80 leading-relaxed">
              {content.preiseOverhead[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-[#1E2229]/70 leading-relaxed">
              {content.preiseFranchise[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-[#1E2229]/70 leading-relaxed font-semibold">
              {content.preiseCommission[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-[#1E2229]/70 leading-relaxed">
              {content.preiseTransparency[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-[#1E2229]/70 leading-relaxed">
              {content.preiseTrust[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- 4. Section 3: Veritali Hilft (Navy Background) ---- */}
      <section id="purpose" className="py-28 px-6 md:px-12 bg-brand-bg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-6">
              GLOBALER PURPOSE
            </p>
            <span className="font-display font-medium leading-none text-8xl md:text-9xl tracking-tight text-brand-orange">
              <Counter value="3%" />
            </span>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6">
            <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 leading-tight text-brand-text">
              <SplitText text={content.hilftTitle[lang]} />
            </h2>
            <p className="font-sans font-medium text-fs-body-m text-brand-muted leading-relaxed">
              {content.hilftConscience[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed font-semibold text-brand-accent">
              {content.hilftPercent[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
              {content.hilftProject[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
              {content.hilftDrVerena[lang]}
            </p>
            <a
              href="/hilfsprojekte"
              className="group inline-flex items-center gap-4 font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-accent hover:text-brand-orange transition-colors duration-700 ease-editorial pt-4"
            >
              {content.hilftMore[lang]}
              <span className="transition-transform duration-700 ease-editorial group-hover:translate-x-1">
                +
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---- 5. Section 4: Alleinauftrag (Linen Background) ---- */}
      <section className="bg-brand-lightbg text-[#1E2229] py-28 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <ClipPathReveal
              src={HOUSE_IMAGE}
              alt="Bespoke Property"
              aspectRatioClassName="aspect-[4/3] lg:aspect-[3/4]"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-6">
            <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 leading-tight text-[#1E2229]">
              <SplitText text={content.alleinauftragTitle[lang]} />
            </h2>
            <p className="font-sans font-medium text-fs-body-m text-[#1E2229]/80 leading-relaxed">
              {content.alleinauftragBoutique[lang]}
            </p>
            <p className="font-sans font-medium text-fs-small text-[#1E2229]/70 leading-relaxed">
              {content.alleinauftragCongo[lang]}
            </p>

            <div className="pt-8 border-t border-[#1E2229]/15">
              <p className="font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-[#468E99] mb-4">
                {content.bulletsTitle[lang]}
              </p>
              <motion.ul
                ref={ref}
                variants={prefersReduced ? undefined : containerVariants}
                initial={prefersReduced ? undefined : "hidden"}
                animate={prefersReduced ? undefined : show ? "visible" : "hidden"}
                className="space-y-3"
              >
                {content.bullets[lang].map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    variants={prefersReduced ? undefined : itemVariants}
                    className="font-sans font-medium text-fs-small text-[#1E2229]/80 flex items-baseline gap-3"
                  >
                    <span className="text-[#468E99] font-bold">—</span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <p className="font-display font-medium text-xl text-brand-orange mt-8 italic">
                {content.slogan[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 6. Marquee & Consultation Form (Dark background contact section) ---- */}
      <div className="bg-brand-bg text-brand-text border-t border-brand-text/10 pt-12">
        <Marquee lang={lang} />
        <ConsultationForm lang={lang} />
      </div>
    </div>
  );
}
