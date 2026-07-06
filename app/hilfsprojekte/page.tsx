"use client";

// The /hilfsprojekte page — the VERITA school project in the DR Congo,
// with the real content from veritali-immobilien.de/hilfsprojekte.
// Partner: ARW (Afrikas Renaissance und Wiederaufbau e.V.), Greifswald.
//
// PHOTOS: drop the five real photos into public/images/hilfsprojekte/
// using exactly these filenames:
//   merci-mama-verena.jpg   (kids holding the "Merci Mama Verena" sign)
//   klassenzimmer.jpg       (young children in the classroom)
//   kleinbauernhof.jpg      (hut with banana trees — smallholder farm)
//   sekundarschule.jpg      (older students reading at desks)
//   neue-uniformen.jpg      (girls in uniforms with backpacks)
// Full-width bands between sections use a scroll parallax (vertical only).

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import ScrollHighlightText from "../../components/shared/ScrollHighlightText";
import ParallaxImage from "../../components/shared/ParallaxImage";

// TEMPORARY Unsplash placeholders. When the real photos are dropped into
// public/images/hilfsprojekte/, swap each URL back to its local path:
//   merci          → "/images/hilfsprojekte/merci-mama-verena.jpg"
//   klassenzimmer  → "/images/hilfsprojekte/klassenzimmer.jpg"
//   kleinbauernhof → "/images/hilfsprojekte/kleinbauernhof.jpg"
//   sekundarschule → "/images/hilfsprojekte/sekundarschule.jpg"
//   uniformen      → "/images/hilfsprojekte/neue-uniformen.jpg"
const IMG = {
  merci:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
  klassenzimmer:
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop",
  kleinbauernhof:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
  sekundarschule:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
  uniformen:
    "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?q=80&w=2000&auto=format&fit=crop",
};

// School-fee budget per child (Stand: Juni 2021; 1 € = 1.9007,9561 Fc)
const budgetRows = [
  { label: { de: "1. Schulklasse", en: "Grade 1" }, fc: "69.000 Fc", eur: "36,16 €" },
  { label: { de: "2. Schulklasse", en: "Grade 2" }, fc: "69.000 Fc", eur: "36,16 €" },
  { label: { de: "3. Schulklasse", en: "Grade 3" }, fc: "79.900 Fc", eur: "41,88 €" },
  { label: { de: "4. Schulklasse", en: "Grade 4" }, fc: "79.900 Fc", eur: "41,88 €" },
  { label: { de: "5. Schulklasse", en: "Grade 5" }, fc: "46.000 Fc", eur: "24,11 €" },
  { label: { de: "6. Schulklasse", en: "Grade 6" }, fc: "85.700 Fc", eur: "44,92 €" },
];

/* Small local helpers for consistent editorial typography */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-4">
      {children}
    </p>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-muted leading-relaxed mb-6 break-inside-avoid">
      {children}
    </p>
  );
}

export default function Hilfsprojekte() {
  const [lang, setLang] = useState<Language>("de"); // German default
  const de = lang === "de";

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Page header ---- */}
        <header className="pt-40 pb-16 px-6 md:px-12">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
            {de ? "VERITALI-SCHULPROJEKT IM KONGO" : "VERITALI SCHOOL PROJECT IN THE CONGO"}
          </p>
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text max-w-5xl mb-4">
            <SplitText text={de ? "Veritali hilft!" : "Veritali helps!"} />
          </h1>
          <p className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-accent">
            {de ? "Denn es geht auch anders …" : "Because there is another way …"}
          </p>
        </header>

        {/* ---- FULL-WIDTH: the "Merci Mama Verena" photo ---- */}
        <ParallaxImage
          src={IMG.merci}
          alt="Merci Mama Verena — Schulkinder im Kongo"
          caption={de ? "Merci Mama Verena — Schulkinder im Kongo" : "Merci Mama Verena — school children in the Congo"}
        />

        {/* ---- Mission statement (scroll highlight) ---- */}
        <section className="px-6 md:px-12 py-20">
          <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 leading-snug max-w-5xl text-brand-text">
            <ScrollHighlightText
              text={
                de
                  ? "Wir möchten mit unserem gemeinsamen Erfolg einen kleinen Beitrag dazu leisten, dass es fairer in unserer Welt zugeht."
                  : "With our shared success, we want to make a small contribution toward a fairer world."
              }
            />
          </h2>
        </section>

        {/* ---- Partner: ARW ---- */}
        <section className="px-6 md:px-12 pb-20 max-w-4xl">
          <SectionLabel>{de ? "UNSERE PARTNERORGANISATION" : "OUR PARTNER ORGANIZATION"}</SectionLabel>
          <Prose>
            {de ? (
              <>
                Daher machen wir gemeinsam mit unserer Partnerorganisation{" "}
                <a
                  href="https://www.afrikas-renaissance.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
                >
                  ARW (Afrikas Renaissance und Wiederaufbau e.V.)
                </a>{" "}
                kleine, gezielte Förderprojekte in der Demokratischen Republik Kongo (DR
                Kongo), die unmittelbar Wirkung zeigen und das Leben der Menschen dort
                nachhaltig positiv beeinflussen.
              </>
            ) : (
              <>
                Together with our partner organization{" "}
                <a
                  href="https://www.afrikas-renaissance.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
                >
                  ARW (Afrikas Renaissance und Wiederaufbau e.V.)
                </a>
                , we run small, targeted development projects in the Democratic Republic
                of the Congo (DR Congo) that show immediate impact and lastingly improve
                the lives of people there.
              </>
            )}
          </Prose>
          <Prose>
            {de
              ? "ARW ist ein gemeinnütziger Verein mit Sitz in Greifswald, der seit über 20 Jahren jungen Menschen aus der DR Kongo die Chance auf eine universitäre Ausbildung in Deutschland gibt und gleichzeitig zusammen mit dem BMZ (Bundesministerium für Zusammenarbeit und Entwicklung) große Entwicklungshilfeprojekte im Kongo implementiert. Insgesamt sind vom BMZ bereits Fördermittel von ca. 1,3 Mio. € an den Verein geflossen, zudem ca. weitere 250.000 € von Stiftungen."
              : "ARW is a non-profit association based in Greifswald that has, for over 20 years, given young people from the DR Congo the chance of a university education in Germany, while implementing large development projects in the Congo together with the BMZ (German Federal Ministry for Economic Cooperation and Development). The BMZ has already provided the association with around €1.3 million in funding, plus a further €250,000 from foundations."}
          </Prose>
          <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-text leading-relaxed">
            {de
              ? "VERITALI hat verbindlich zugesagt, Kindern aus besonders benachteiligten Familien im Kongo eine Schulausbildung zu ermöglichen und damit den Grundstein für berufliche Aufstiegschancen und eine bessere Zukunft zu legen."
              : "VERITALI has made a binding commitment to enable children from particularly disadvantaged families in the Congo to attend school — laying the foundation for professional opportunities and a better future."}
          </p>
        </section>

        {/* ---- FULL-WIDTH: girls in new uniforms ---- */}
        <ParallaxImage
          src={IMG.uniformen}
          alt="Kinder in neuen Uniformen von VERITALI"
          caption={de ? "Kinder in neuen Uniformen von VERITALI" : "Children in new uniforms from VERITALI"}
        />

        {/* ---- The VERITA school project ---- */}
        <section className="px-6 md:px-12 py-20 max-w-4xl">
          <SectionLabel>{de ? "DAS VERITA-SCHULPROJEKT" : "THE VERITA SCHOOL PROJECT"}</SectionLabel>
          <Prose>
            {de
              ? "Unser erstes gemeinsames Projekt, das VERITA-Schulprojekt, startete im Jahr 2021. Ziel war es, zunächst 20 Kindern (90% Mädchen + 10% Jungen) eine 6-jährige Grundschulausbildung zu finanzieren. Dabei stammten zehn Kinder aus der Provinz Mai-Ndombe (im Nordwesten) und zehn aus der Provinz Kasai Central (im Südosten)."
              : "Our first joint project, the VERITA school project, started in 2021. The initial goal was to finance a six-year primary education for 20 children (90% girls, 10% boys) — ten from the Mai-Ndombe province (in the northwest) and ten from the Kasai Central province (in the southeast)."}
          </Prose>
          <Prose>
            {de
              ? "Bei den 10 Kindern aus der Provinz Mai-Ndombe handelt es sich überwiegend um Pygmäen-Kinder der Gruppe „Twa“ aus Inongo. Die „Twa“ (auch „Batwa“ genannt) sind bis heute der am wenigsten ausgebildete Volksstamm in der Provinz Mai-Ndombe. Sie sind ein benachteiligtes, enteignetes und gefährdetes Volk. Der katholische Schwesternorden „Passionistinnen“ (Soeurs Passionistes du Congo) kämpft für die Förderung und Integration der Twa, indem er Maßnahmen zu Alphabetisierung und Ausbildung durchführt. Außerdem setzen sich die Schwestern für die persönliche Selbstverwirklichung, Förderung und Integration der Twa, insbesondere der Mädchen, ein."
              : "The 10 children from the Mai-Ndombe province are mostly pygmy children of the “Twa” group from Inongo. To this day, the “Twa” (also called “Batwa”) are the least-educated ethnic group in Mai-Ndombe — a disadvantaged, dispossessed, and endangered people. The Catholic order of the “Passionist Sisters” (Soeurs Passionistes du Congo) fights for the advancement and integration of the Twa through literacy and education programs, with a particular focus on the personal development of girls."}
          </Prose>
          <Prose>
            {de
              ? "In der Provinz Kasai Central wird die Umsetzung des Projektes von einem weiteren katholischen Schwesternorden, den „Soeurs de Coeur Immaculé de Marie“ (CIM), übernommen. Bei den 10 Kindern aus der Provinz Kasai Central handelt es sich überwiegend um Kinder aus Luiza, die oftmals bereits im Alter von 10 bis 12 verheiratet werden. Auch der Schwesternorden CIM fördert Kinder durch Alphabetisierungs- und Bildungsprogramme und bietet Anlaufstellen, bei denen insbesondere Mädchen Hilfe finden. Außerdem kämpft CIM bei der Regierung für wirksame Gesetze gegen Kinderheirat und deren Umsetzung durch konsequente Strafverfolgung."
              : "In Kasai Central, the project is carried out by another Catholic order, the “Soeurs de Coeur Immaculé de Marie” (CIM). The 10 children from Kasai Central are mostly from Luiza, where girls are often married as young as 10 to 12 years old. The CIM sisters support children through literacy and education programs, offer places of refuge where girls in particular find help, and lobby the government for effective laws against child marriage and their consistent enforcement."}
          </Prose>
          <Prose>
            {de ? (
              <>
                Inzwischen hat sich die Zahl der geförderten Kinder bereits vervielfacht.
                Die Projektberichte der letzten Jahre und aktuelle Informationen finden Sie{" "}
                <a
                  href="https://veritali-immobilien.de/bericht-uber-das-verita-kongo-schulprojekt-stand-juni-2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
                >
                  hier
                </a>
                .
              </>
            ) : (
              <>
                The number of sponsored children has since multiplied. Project reports
                from recent years and current information can be found{" "}
                <a
                  href="https://veritali-immobilien.de/bericht-uber-das-verita-kongo-schulprojekt-stand-juni-2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
                >
                  here
                </a>
                .
              </>
            )}
          </Prose>
          <Prose>
            {de
              ? "Unser Ziel ist es, mit wachsendem Umsatz mehr und mehr Kinder in das Projekt einzubinden und in einem zweiten, parallel dazu ablaufenden Projekt deren Familien mit landwirtschaftlichen Betriebsmitteln und Zugang zu einem gesicherten Absatzmarkt für ihre Agrarprodukte zu versorgen. Von den dadurch erzielten zusätzlichen Einnahmen wird ein Teil für die weiterführende Schulausbildung ihrer Kinder zurückgelegt — und somit erreicht, dass die Eltern nach Ablauf der Grundschulzeit ihrer Kinder (6 Jahre) in der Lage sein werden, für die Kosten der Sekundarstufe selbst aufkommen zu können."
              : "Our goal is to include more and more children in the project as revenue grows — and, in a second, parallel project, to supply their families with agricultural equipment and access to a secured market for their produce. Part of the additional income generated is set aside for the children's secondary education, so that after the six primary school years, parents will be able to cover the costs of secondary school themselves."}
          </Prose>
        </section>

        {/* ---- FULL-WIDTH: classroom ---- */}
        <ParallaxImage
          src={IMG.klassenzimmer}
          alt="Schulkinder im Kongo"
          caption={de ? "Schulkinder im Kongo" : "School children in the Congo"}
        />

        {/* ---- Donation block ---- */}
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-3xl bg-brand-surface border border-brand-green/20 p-8 md:p-12">
            <SectionLabel>{de ? "DIREKT SPENDEN" : "DONATE DIRECTLY"}</SectionLabel>
            <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-muted leading-relaxed mb-8">
              {de
                ? "Wenn Sie unabhängig von uns die Arbeit des ARW unterstützen möchten, würden wir uns über eine Spende auf das folgende Konto freuen. Eine Spendenbescheinigung wird selbstverständlich ausgestellt."
                : "If you would like to support ARW's work independently of us, we would be delighted about a donation to the following account. A donation receipt will of course be issued."}
            </p>
            <dl className="space-y-3">
              {[
                {
                  label: de ? "Empfänger" : "Recipient",
                  value: "Afrikas Renaissance und Wiederaufbau e.V.",
                },
                { label: "IBAN", value: "DE26 1506 1638 0001 0691 87" },
                { label: "BIC", value: "GENODEF1ANK" },
                { label: "Bank", value: "VolksbankRaiffeisenbank eG Greifswald" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-brand-text/10 pb-3"
                >
                  <dt className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
                    {row.label}
                  </dt>
                  <dd className="font-sans font-medium text-fs-small text-brand-text">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- Detailed project description ---- */}
        <section className="px-6 md:px-12 pb-8">
          <div className="h-px w-full bg-brand-text/15" />
          <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text pt-16 mb-12">
            <SplitText text={de ? "Detaillierte Projektbeschreibung" : "Detailed project description"} />
          </h2>

          <div className="max-w-4xl columns-1 md:columns-2 gap-8 md:gap-12">
            {/* Economy & agriculture */}
            <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4 break-inside-avoid">
              {de
                ? "Wirtschaft und sozio-ökonomische Rolle der Landwirtschaft"
                : "Economy and the socio-economic role of agriculture"}
            </h3>
            <Prose>
              {de
                ? "Die Menschen in den Projektregionen sind in erster Linie Kleinbauernfamilien und leben ausschließlich von der Land- und Viehwirtschaft. Ihr durchschnittliches Jahreseinkommen beträgt weniger als 300 € (ca. 0,75 €/Tag), und in einem Mehrgenerationen-Haushalt leben ca. 11 bis 12 Personen. Die Felder einer solchen Familie haben im Schnitt eine Größe von ca. 0,5 bis 1 ha pro Haushalt."
                : "People in the project regions are primarily smallholder families living exclusively from farming and animal husbandry. Their average annual income is less than €300 (around €0.75/day), and a multi-generational household comprises around 11 to 12 people. A family's fields average about 0.5 to 1 hectare per household."}
            </Prose>
            <Prose>
              {de
                ? "Die Lebensmittelproduktion (Maniok, Mais, Soja, Erdnüsse, Bohnen, Karotten, Kochbananen) und landwirtschaftliche Erträge spielen eine wichtige Rolle für die Ernährungssicherung, liefern einen großen Teil an pflanzlichem Eiweiß und gewährleisten den Lebensunterhalt der Bevölkerung. Angebaut werden viele Gemüsearten (Kartoffeln, Aubergine, Spinat, Zwiebeln, Tomaten sowie zahlreiche tropische proteinreiche Gemüsearten wie Bitekuteku, Ngaingai, Matembele) sowie Früchte. Fleisch ist für eine normale Familie nahezu unerschwinglich; in den meisten Fällen wird die Ernte durch Tierzucht (z. B. Ziegen, Hühner) ergänzt."
                : "Food production (cassava, maize, soy, peanuts, beans, carrots, plantains) and agricultural yields play a key role in food security, provide much of the plant protein, and secure the population's livelihood. Many vegetables are grown (potatoes, eggplant, spinach, onions, tomatoes, and numerous protein-rich tropical vegetables such as bitekuteku, ngaingai, matembele) as well as fruit. Meat is nearly unaffordable for an ordinary family; in most cases the harvest is supplemented by keeping animals (e.g., goats, chickens)."}
            </Prose>
            <Prose>
              {de
                ? "Nach der Ernte wird der Großteil der landwirtschaftlichen Produktion für den Eigenkonsum verwandt und nur ein kleiner Teil als einzige zusätzliche Einnahmequelle lokal verkauft — um z. B. das Schulgeld für die Kinder aufzubringen. Für mehr reicht es häufig nicht. Zusätzlich zu Hausarbeit, Kinderbetreuung und -erziehung sind Frauen und Mädchen dafür zuständig, Wasser zu holen und Feuerholz zu sammeln. Durch die zeitliche und körperliche Dauerbelastung dieser Arbeitsteilung können Mädchen nicht oder nur unregelmäßig zur Schule gehen — und ihr persönliches Potential nicht voll entfalten."
                : "After the harvest, most of the produce is used for the family's own consumption; only a small share is sold locally as the sole additional source of income — for example, to raise school fees. Often there is nothing left beyond that. On top of housework and childcare, women and girls are responsible for fetching water and gathering firewood. The constant demands on their time and bodies mean girls attend school irregularly or not at all — and cannot develop their full potential."}
            </Prose>
          </div>
        </section>

        {/* ---- FULL-WIDTH: smallholder farm ---- */}
        <ParallaxImage
          src={IMG.kleinbauernhof}
          alt="Typischer Kleinbauernhof"
          caption={de ? "Typischer Kleinbauernhof" : "A typical smallholder farm"}
          heightClassName="h-[45vh] md:h-[65vh]"
        />

        <section className="px-6 md:px-12 py-8">
          <div className="max-w-4xl columns-1 md:columns-2 gap-8 md:gap-12">
            {/* Education */}
            <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4 break-inside-avoid">
              {de
                ? "Bildungssituation im kulturellen Kontext"
                : "Education in its cultural context"}
            </h3>
            <Prose>
              {de
                ? "In der DR Kongo besteht Schulpflicht für Mädchen und Jungen: Beginnend mit dem 6. Lebensjahr ist die Grundschule (Klasse 1–6) zu absolvieren, und nach erfolgreichem Abschlussexamen können die Sekundarstufen I und II (Altersbereich 12–18/19) besucht werden. Die Eltern entrichten ein Schulgeld, unterrichtet wird nach staatlichen Lehrplänen. Unterrichtssprachen sind in der Regel Französisch sowie eine der Nationalsprachen — in Mai-Ndombe ist dies Lingala. 1977 übergab die Zentralregierung der Katholischen Kirche per Vertrag die Geschäftsführung eines Teils der staatlichen Schulen; für Mai-Ndombe operiert die kirchliche Schulkoordination mit Sitzen in Nioki, Oshwe und Inongo und kümmert sich u. a. um Auswahl, Anstellung und Versetzung der Lehrer, die weiterhin vom Staat bezahlt werden — wobei es oft zu Zahlungsproblemen kommt, die kompensiert werden müssen."
                : "Schooling is compulsory in the DR Congo for girls and boys: primary school (grades 1–6) begins at age six, and after passing the final exams, secondary levels I and II (ages 12–18/19) can follow. Parents pay school fees and teaching follows state curricula, usually in French plus one of the national languages — in Mai-Ndombe, Lingala. In 1977 the central government contractually handed the management of part of the state schools to the Catholic Church; for Mai-Ndombe, the church's school coordination offices in Nioki, Oshwe, and Inongo handle teacher selection, hiring, and transfers, with teachers still paid by the state — though payment problems are frequent and must be compensated."}
            </Prose>
            <Prose>
              {de
                ? "Die Grundschule endet mit schriftlichen Abschlussexamina in Lingala und Französisch (Grammatik, Textverständnis, Übersetzung) sowie Mathematik, Geschichte, Geographie und Religion. Für viele Schüler sind die Anforderungen zu hoch: Die Aufgaben werden gedruckt gestellt, doch den Kindern fehlt jede Routine im Umgang mit Druckschrift, und ihre Kenntnisse sind häufig nicht gefestigt. Der Zeitaufwand für das Wasserholen hindert viele Mädchen schon am Eintritt in die Grundschule — und hat oft während der gesamten Schullaufbahn Vorrang vor kontinuierlicher Unterrichtsteilnahme. Vor allem in Trockenperioden kommt es zu massiven Fehlzeiten, sodass Mädchen oft resigniert die Schule abbrechen."
                : "Primary school ends with written exams in Lingala and French (grammar, comprehension, translation) plus mathematics, history, geography, and religion. For many pupils the requirements are too high: exam papers are printed, but the children lack any routine with printed text, and their knowledge is often not consolidated. The time spent fetching water prevents many girls from even entering primary school — and often takes precedence over continuous attendance throughout their school years. Especially in dry seasons, absences become so extensive that girls frequently give up and drop out."}
            </Prose>
            <Prose>
              {de
                ? "Mädchenheirat in Kasai: Obwohl Kinderehen im Kongo offiziell verboten sind, wird das Gesetz oftmals missachtet. In der Provinz Kasai wird aufgrund von Armut und kulturellen Gründen jedes fünfte Mädchen vor Vollendung des 18. Lebensjahres verheiratet — oftmals sogar bereits im Alter von 10 bis 12 Jahren."
                : "Child marriage in Kasai: Although child marriage is officially banned in the Congo, the law is often ignored. In Kasai province, due to poverty and cultural reasons, one in five girls is married before her 18th birthday — often as young as 10 to 12."}
            </Prose>
          </div>
        </section>

        {/* ---- FULL-WIDTH: secondary school classroom ---- */}
        <ParallaxImage
          src={IMG.sekundarschule}
          alt="Schüler der Sekundarstufe im Klassenzimmer"
          caption={de ? "Im Klassenzimmer — auf dem Weg zur Sekundarstufe" : "In the classroom — on the way to secondary school"}
          heightClassName="h-[45vh] md:h-[65vh]"
        />

        <section className="px-6 md:px-12 py-8 pb-28">
          <div className="max-w-4xl columns-1 md:columns-2 gap-8 md:gap-12 mb-12">
            {/* Geography */}
            <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4 break-inside-avoid">
              {de ? "Die Projektstandorte" : "The project locations"}
            </h3>
            <Prose>
              {de
                ? "Mai-Ndombe: Mit seiner Hauptstadt Inongo liegt Mai-Ndombe im Nordwesten der DR Kongo und besteht aus 8 Landkreisen (Inongo, Kiri, Mushie, Bolobo, Yumbi, Kwamouth, Oshwe und Kutu). Auf einer Fläche von 124.708 km² leben ca. 1.733.000 Einwohner, von denen 25% jünger als 18 Jahre sind."
                : "Mai-Ndombe: With its capital Inongo, Mai-Ndombe lies in the northwest of the DR Congo and comprises 8 districts (Inongo, Kiri, Mushie, Bolobo, Yumbi, Kwamouth, Oshwe, and Kutu). Around 1,733,000 people live on 124,708 km², 25% of them under 18."}
            </Prose>
            <Prose>
              {de
                ? "Kasai Central: Mit seiner Hauptstadt Kananga liegt Kasai Central im Südosten der DR Kongo und besteht aus 5 Landkreisen (Dibaya, Luiza, Dimbelenge, Kazumba und Demba) und zwei Städten (Kananga und Tshimbulu). Auf einer Fläche von 58.368 km² leben ca. 3.317.000 Einwohner, von denen 30% jünger als 18 Jahre sind."
                : "Kasai Central: With its capital Kananga, Kasai Central lies in the southeast of the DR Congo and comprises 5 districts (Dibaya, Luiza, Dimbelenge, Kazumba, and Demba) and two cities (Kananga and Tshimbulu). Around 3,317,000 people live on 58,368 km², 30% of them under 18."}
            </Prose>

            {/* Budget */}
            <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4 break-inside-avoid">
              {de ? "Projektdurchführung und Budget" : "Implementation and budget"}
            </h3>
            <Prose>
              {de
                ? "Das Gesamtbudget für ein Schulkind — über den Zeitraum von 6 Jahren bis zum Grundschulabschluss — beläuft sich auf 429.500 Fc pro Kind und Jahr (Stand: Juni 2021), das entspricht 225,11 €. Hinzu kommen 2,5% Bankgebühren (5,63 €, einbehalten von der „Missionarsbank“ in Kinshasa) sowie ca. 4,26 € pro Kind und Jahr für Telefonate der Koordinatorinnen und die Internetverbindung bei der Berichterstattung. Das Gesamtbudget beträgt somit 235 € pro Schulkind — für die 20 Kinder der ersten Projektphase 4.700 €."
                : "The total budget for one school child — over the six years to primary school graduation — is 429,500 Fc per child per year (as of June 2021), equivalent to €225.11. Added to this are 2.5% bank fees (€5.63, retained by the “Missionary Bank” in Kinshasa) and around €4.26 per child per year for the coordinators' phone calls and the internet connection for reporting. The total budget is therefore €235 per school child — €4,700 for the 20 children of the first project phase."}
            </Prose>
            <Prose>
              {de
                ? "VERITALI Immobilien hat es sich zum Ziel gesetzt, diesen Betrag für die nächsten 6 Jahre zur Verfügung zu stellen, damit eine komplette Grundschulbildung für diese Kinder in Not gewährleistet werden kann. So werden sie zu starken, selbstständigen Persönlichkeiten, deren Talente und Träume gefördert werden."
                : "VERITALI Immobilien has committed to providing this amount for the next six years, guaranteeing a complete primary education for these children in need — so they grow into strong, independent personalities whose talents and dreams are nurtured."}
            </Prose>
          </div>

          {/* Cost table */}
          <div className="max-w-2xl border-t border-brand-text/15">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 py-4">
                {de
                  ? "Kostenaufstellung (Stand: Juni 2021; 1 € = 1.9007,9561 Fc)"
                  : "Cost breakdown (as of June 2021; €1 = 1,9007.9561 Fc)"}
              </p>
              {budgetRows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-baseline gap-4 py-3 border-b border-brand-text/10"
                >
                  <span className="font-sans font-medium text-fs-small text-brand-text">
                    {row.label[lang]}
                  </span>
                  <span className="font-sans font-medium text-fs-small text-brand-muted ml-auto">
                    {row.fc}
                  </span>
                  <span className="font-display font-medium text-fs-small text-brand-accent w-20 text-right">
                    {row.eur}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-baseline gap-4 py-3 border-b border-brand-text/10">
                <span className="font-sans font-medium text-fs-small text-brand-text">
                  {de ? "Bankgebühren (2,5%)" : "Bank fees (2.5%)"}
                </span>
                <span className="font-display font-medium text-fs-small text-brand-accent ml-auto">
                  5,63 €
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 py-3 border-b border-brand-text/10">
                <span className="font-sans font-medium text-fs-small text-brand-text">
                  {de ? "Berichterstattung + Internet" : "Reporting + internet"}
                </span>
                <span className="font-display font-medium text-fs-small text-brand-accent ml-auto">
                  4,26 €
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 py-4">
                <span className="font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-text">
                  {de ? "Gesamtsumme pro Kind" : "Total per child"}
                </span>
                <span className="font-display font-medium text-2xl text-brand-orange ml-auto">
                  235 €
                </span>
              </div>
            </div>
          </section>
        </div>

      <Footer lang={lang} />
    </main>
  );
}
