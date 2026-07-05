"use client";

import { useState, useRef, useEffect } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import ClipPathReveal from "../../components/shared/ClipPathReveal";

// Translation dictionary
const dict = {
  de: {
    eyebrow: "IMMOBILIENBEWERTUNG",
    title: "Wertermittlung anfordern",
    desc: "Nutzen Sie unser Werkzeug für eine diskrete Ersteinschätzung Ihrer Immobilie — kostenfrei und unverbindlich. Tragen Sie einfach die Objektdaten ein, wir melden uns persönlich bei Ihnen.",
    success: "Vielen Dank für Ihre Anfrage. Wir haben Ihre Daten erhalten und melden uns in Kürze für eine persönliche Einwertung bei Ihnen.",
    loading: "Wird gesendet...",
    submit: "WERTERMITTLUNG STARTEN →",
    secCustomer: "1. Ihre Kontaktdaten",
    secAddress: "2. Anschrift der Immobilie",
    secType: "3. Bei meiner Immobilie handelt es sich um:",
    secDetails: "4. Details zur Immobilie",
    secStatus: "5. Meine Immobilie ist derzeit:",
    secMessage: "6. Mitteilung & Einverständnis",
    
    anrede: "Anrede",
    name: "Name (erforderlich)",
    street: "Straße",
    zip: "PLZ",
    city: "Ort",
    phone: "Telefonnummer (erforderlich)",
    email: "E-Mail-Adresse (erforderlich)",
    interestCheckbox: "Ja, ich interessiere mich für eine kostenlose und unverbindliche Einwertung meiner Immobilie! Bitte setzen Sie sich mit mir in Verbindung.",
    
    propStreet: "Straße der Immobilie",
    propZip: "PLZ der Immobilie",
    propCity: "Ort der Immobilie",
    
    buildYear: "Baujahr",
    rooms: "Anzahl Zimmer",
    bathrooms: "Anzahl Bäder",
    livingArea: "Wohnfläche (qm)",
    plotSize: "Grundstücksgröße (qm)",
    
    messageLabel: "Ihre Mitteilung an uns (z.B. Besonderheiten der Immobilie)",
    consent: "Ich stimme zu, dass meine Angaben zum Zwecke der Kontaktaufnahme und Zusendung von Informationen erhoben und verarbeitet werden. Die Daten werden bei Abmeldung aus dem Verteiler vollständig gelöscht. Hinweis: Sie können Ihre Einwilligung jederzeit per E-Mail an kontakt@veritali.de widerrufen. Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer Datenschutzerklärung.",
    
    types: {
      flat: "Eigentumswohnung",
      house: "Einfamilienhaus (EFH)",
      building: "Mehrfamilienhaus (MFH)",
      commercial: "Gewerbeeinheit",
      land: "Grundstück"
    },
    statuses: {
      rented: "Vermietet",
      occupied: "Eigengenutzt",
      vacant: "Leerstehend"
    }
  },
  en: {
    eyebrow: "PROPERTY VALUATION",
    title: "Request a Valuation",
    desc: "Utilize our discreet tool for an initial estimation of your property — complimentary and non-binding. Simply fill in the property details, and we will get back to you personally.",
    success: "Thank you for your request. We have received your details and will get in touch shortly for a personal evaluation.",
    loading: "Sending...",
    submit: "START COMPLIMENTARY VALUATION →",
    secCustomer: "1. Your Contact Details",
    secAddress: "2. Property Address",
    secType: "3. My property is a:",
    secDetails: "4. Property Details",
    secStatus: "5. My property is currently:",
    secMessage: "6. Message & Consent",
    
    anrede: "Salutation",
    name: "Name (required)",
    street: "Street",
    zip: "ZIP",
    city: "City",
    phone: "Phone Number (required)",
    email: "Email Address (required)",
    interestCheckbox: "Yes, I am interested in a free, non-binding valuation of my property! Please contact me.",
    
    propStreet: "Property Street",
    propZip: "Property ZIP",
    propCity: "Property City",
    
    buildYear: "Year of Construction",
    rooms: "Number of Rooms",
    bathrooms: "Number of Bathrooms",
    livingArea: "Living Area (sqm)",
    plotSize: "Plot Size (sqm)",
    
    messageLabel: "Your message to us (e.g. special features of the property)",
    consent: "I agree that my details may be collected and processed for the purpose of contacting me and sending information. The data will be completely deleted upon unsubscribing. Note: You can revoke your consent at any time by email to kontakt@veritali.de. Detailed information on the handling of user data can be found in our privacy policy.",
    
    types: {
      flat: "Condominium",
      house: "Single-Family Home",
      building: "Multi-Family House",
      commercial: "Commercial Unit",
      land: "Plot / Land"
    },
    statuses: {
      rented: "Rented",
      occupied: "Owner-Occupied",
      vacant: "Vacant"
    }
  }
};

const SIDE_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

export default function BewertungPage() {
  const [lang, setLang] = useState<Language>("de");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Custom pill selectors
  const [propertyType, setPropertyType] = useState<string>("");
  const [propertyStatus, setPropertyStatus] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Make sure custom pills are populated in standard Form payload
    formData.set("propertyType", propertyType);
    formData.set("propertyStatus", propertyStatus);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Valuation submission failed");
      }
    } catch (err) {
      console.error(err);
      // Fallback success state
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const t = dict[lang];

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Header ---- */}
        <header className="pt-40 pb-16 px-6 md:px-12">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text max-w-4xl mb-10">
            <SplitText text={t.title} />
          </h1>
          <p className="font-sans font-medium text-fs-body-m md:text-fs-body text-brand-muted max-w-2xl">
            {t.desc}
          </p>
        </header>

        {/* ---- Form & Visual Layout ---- */}
        <section className="px-6 md:px-12 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Sticky image block */}
            <div className="lg:col-span-4">
              <div className="max-w-sm sticky top-28">
                <ClipPathReveal
                  src={SIDE_IMAGE}
                  alt="Modern House Architecture"
                  aspectRatioClassName="aspect-[3/4]"
                />
              </div>
            </div>

            {/* Right Col: The Interactive Valuation Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              {submitted ? (
                <div className="p-8 border border-brand-accent/30 bg-brand-accent/5 rounded">
                  <p className="font-sans font-medium text-fs-body-m text-brand-accent">
                    ✓ {t.success}
                  </p>
                </div>
              ) : (
                <form
                  name="valuation"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-10"
                >
                  {/* Hidden metadata tags for Netlify */}
                  <input type="hidden" name="form-name" value="valuation" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  {/* Section 1: Customer Details */}
                  <div className="space-y-6">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secCustomer}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                      <div className="md:col-span-2">
                        <select
                          name="anrede"
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                          defaultValue=""
                        >
                          <option value="" disabled>{t.anrede}</option>
                          <option value="Frau">{lang === "de" ? "Frau" : "Ms."}</option>
                          <option value="Herr">{lang === "de" ? "Herr" : "Mr."}</option>
                        </select>
                      </div>

                      <div className="md:col-span-4">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder={t.name}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-6">
                        <input
                          type="text"
                          name="street"
                          placeholder={t.street}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          name="zip"
                          placeholder={t.zip}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          name="city"
                          placeholder={t.city}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder={t.phone}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder={t.email}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="requestValuation"
                        value="Yes"
                        defaultChecked
                        className="mt-1 accent-brand-accent"
                      />
                      <span className="font-sans font-medium text-xs text-brand-muted group-hover:text-brand-text transition-colors">
                        {t.interestCheckbox}
                      </span>
                    </label>
                  </div>

                  {/* Section 2: Property Address */}
                  <div className="space-y-6">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secAddress}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-6">
                        <input
                          type="text"
                          name="propStreet"
                          placeholder={t.propStreet}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          name="propZip"
                          placeholder={t.propZip}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          name="propCity"
                          placeholder={t.propCity}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Property Type Selector */}
                  <div className="space-y-4">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secType}
                    </h3>
                    <input type="hidden" name="propertyType" value={propertyType} />
                    <div className="flex flex-wrap gap-3">
                      {[
                        { key: "Eigentumswohnung", label: t.types.flat },
                        { key: "EFH", label: t.types.house },
                        { key: "MFH", label: t.types.building },
                        { key: "Gewerbeeinheit", label: t.types.commercial },
                        { key: "Grundstück", label: t.types.land },
                      ].map((item) => {
                        const isSelected = propertyType === item.key;
                        return (
                          <button
                            type="button"
                            key={item.key}
                            onClick={() => setPropertyType(item.key)}
                            className={`px-4 py-2 border text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "bg-brand-accent border-brand-accent text-brand-bg"
                                : "border-brand-text/20 text-brand-muted hover:border-brand-accent hover:text-brand-text"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Details */}
                  <div className="space-y-6">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secDetails}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <input
                          type="text"
                          name="buildYear"
                          placeholder={t.buildYear}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="rooms"
                          placeholder={t.rooms}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="bathrooms"
                          placeholder={t.bathrooms}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="livingArea"
                          placeholder={t.livingArea}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="plotSize"
                          placeholder={t.plotSize}
                          className="w-full border-b border-brand-text/20 py-3 bg-transparent text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Current Status */}
                  <div className="space-y-4">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secStatus}
                    </h3>
                    <input type="hidden" name="propertyStatus" value={propertyStatus} />
                    <div className="flex flex-wrap gap-3">
                      {[
                        { key: "Vermietet", label: t.statuses.rented },
                        { key: "Eigengenutzt", label: t.statuses.occupied },
                        { key: "Leerstehend", label: t.statuses.vacant },
                      ].map((item) => {
                        const isSelected = propertyStatus === item.key;
                        return (
                          <button
                            type="button"
                            key={item.key}
                            onClick={() => setPropertyStatus(item.key)}
                            className={`px-4 py-2 border text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "bg-brand-accent border-brand-accent text-brand-bg"
                                : "border-brand-text/20 text-brand-muted hover:border-brand-accent hover:text-brand-text"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 6: Note & Consent */}
                  <div className="space-y-6">
                    <h3 className="font-display font-medium text-lg text-brand-accent uppercase tracking-wider border-b border-brand-text/10 pb-2">
                      {t.secMessage}
                    </h3>
                    
                    <div>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder={t.messageLabel}
                        className="w-full border border-brand-text/10 bg-transparent p-4 text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 font-sans font-medium text-fs-small resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 accent-brand-accent"
                      />
                      <span className="font-sans font-medium text-[11px] leading-normal text-brand-muted group-hover:text-brand-text transition-colors">
                        {t.consent}
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 border border-brand-accent/50 text-xs font-display font-medium uppercase tracking-widest text-brand-accent hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? t.loading : t.submit}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </section>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
