"use client";

// The /datenschutz page — GDPR privacy policy (Datenschutzerklärung).
// Same design language as /impressum: dark editorial page, grouped
// sections with numbered group headers, readable prose, auto-linked URLs.
// GERMAN-ONLY by design (legal text; see /impressum for reasoning).
//
// ⚠ CONTENT NOTE: this text was carried over from the OLD website. It
// names tools (Google Analytics/Ads/Tag Manager, Osano, Sendinblue,
// YouTube, Google Maps, netcup hosting) that the NEW site does not
// currently use — it must be legally revised before launch.

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import DividerLine from "../../components/shared/DividerLine";

/* Turn plain URLs and e-mail addresses inside a paragraph into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.-]+@[\w.-]+\.\w+)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (/^https?:\/\//.test(part)) {
          const href = part.replace(/[.,)]+$/, ""); // strip trailing punctuation
          const trail = part.slice(href.length);
          return (
            <span key={idx}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:text-brand-orange underline underline-offset-4 break-all"
              >
                {href}
              </a>
              {trail}
            </span>
          );
        }
        if (/^[\w.-]+@[\w.-]+\.\w+$/.test(part)) {
          return (
            <a
              key={idx}
              href={`mailto:${part}`}
              className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
            >
              {part}
            </a>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

interface Sub {
  heading?: string;
  paras?: string[];
  bullets?: string[];
}
interface Group {
  title: string;
  subs: Sub[];
}

const groups: Group[] = [
  {
    title: "1. Datenschutz auf einen Blick",
    subs: [
      {
        heading: "Allgemeine Hinweise",
        paras: [
          "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
        ],
      },
      {
        heading: "Datenerfassung auf dieser Website",
        paras: [
          "Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.",
          "Wie erfassen wir Ihre Daten? Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
          "Wofür nutzen wir Ihre Daten? Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
          "Welche Rechte haben Sie bezüglich Ihrer Daten? Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.",
        ],
      },
      {
        heading: "Analyse-Tools und Tools von Drittanbietern",
        paras: [
          "Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.",
        ],
      },
    ],
  },
  {
    title: "2. Hosting und Content Delivery Networks (CDN)",
    subs: [
      {
        heading: "Externes Hosting",
        paras: [
          "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
          "Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).",
          "Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.",
          "Wir setzen folgenden Hoster ein: netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe, Telefon: +49 721 7540755-0, Telefax: +49 721 7540755-9, E-Mail: mail@netcup.de",
        ],
      },
      {
        heading: "Abschluss eines Vertrages über Auftragsverarbeitung",
        paras: [
          "Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen.",
        ],
      },
    ],
  },
  {
    title: "3. Allgemeine Hinweise und Pflichtinformationen",
    subs: [
      {
        heading: "Datenschutz",
        paras: [
          "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
          "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
          "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
        ],
      },
      {
        heading: "Hinweis zur Verantwortlichen Stelle",
        paras: [
          "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist: Dr. Verena Beittinger-Lee, Langer Anger 7-9, 69115 Heidelberg, Telefon: 0176-21015298, E-Mail: kontakt@veritali-immobilien.de",
          "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
        ],
      },
      {
        heading: "Speicherdauer",
        paras: [
          "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.",
        ],
      },
      {
        heading: "Hinweis zur Datenweitergabe in die USA",
        paras: [
          "Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA eingebunden. Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten an die US-Server der jeweiligen Unternehmen weitergegeben werden. Wir weisen darauf hin, dass die USA kein sicherer Drittstaat im Sinne des EU-Datenschutzrechts sind. US-Unternehmen sind dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z.B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.",
        ],
      },
      {
        heading: "Widerruf Ihrer Einwilligung zur Datenverarbeitung",
        paras: [
          "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
        ],
      },
      {
        heading:
          "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
        paras: [
          "WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).",
          "WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).",
        ],
      },
      {
        heading: "Beschwerderecht bei der zuständigen Aufsichtsbehörde",
        paras: [
          "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
        ],
      },
      {
        heading: "Recht auf Datenübertragbarkeit",
        paras: [
          "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
        ],
      },
      {
        heading: "SSL- bzw. TLS-Verschlüsselung",
        paras: [
          "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.",
          "Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
        ],
      },
      {
        heading: "Auskunft, Löschung und Berichtigung",
        paras: [
          "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.",
        ],
      },
      {
        heading: "Recht auf Einschränkung der Verarbeitung",
        paras: [
          "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
        ],
        bullets: [
          "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
          "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
          "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
          "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
        ],
      },
      {
        paras: [
          "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
        ],
      },
      {
        heading: "Widerspruch gegen Werbe-E-Mails",
        paras: [
          "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.",
        ],
      },
    ],
  },
  {
    title: "4. Datenerfassung auf dieser Website",
    subs: [
      {
        heading: "Cookies",
        paras: [
          "Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.",
          "Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).",
          "Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.",
          "Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.",
          "Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.",
          "Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.",
        ],
      },
      {
        heading: "Cookie-Einwilligung mit Osano",
        paras: [
          "Unsere Website nutzt die Cookie-Consent-Technologie von Osano, um Ihre Einwilligung zur Speicherung bestimmter Cookies in Ihrem Browser einzuholen und diese datenschutzkonform zu dokumentieren. Anbieter dieser Technologie ist Osano – 3800 N Lamar Blvd. Ste 200 Austin, TX 78756, USA.",
          "Wenn Sie unsere Website betreten, wird ein Osano-Cookie in Ihrem Browser gespeichert, in dem die von Ihnen erteilten Einwilligungen oder der Widerruf dieser Einwilligungen gespeichert werden. Diese Daten werden nicht an den Anbieter von Osano Cookie weitergegeben.",
          "Die erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern bzw. das Osano-Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt. Details zur Datenverarbeitung von Osano Cookie finden Sie unter https://www.osano.com/legal/cookies",
          "Der Einsatz der Osano-Cookie-Consent-Technologie erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von Cookies einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 S. 1 lit. c DSGVO.",
        ],
      },
      {
        heading: "Server-Log-Dateien",
        paras: [
          "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
        ],
        bullets: [
          "Browsertyp und Browserversion",
          "verwendetes Betriebssystem",
          "Referrer URL",
          "Hostname des zugreifenden Rechners",
          "Uhrzeit der Serveranfrage",
          "IP-Adresse",
        ],
      },
      {
        paras: [
          "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.",
          "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
        ],
      },
      {
        heading: "Kontaktformular",
        paras: [
          "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
          "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.",
          "Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.",
        ],
      },
      {
        heading: "Anfrage per E-Mail, Telefon oder Telefax",
        paras: [
          "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
          "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.",
          "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.",
        ],
      },
    ],
  },
  {
    title: "5. Analyse-Tools und Werbung",
    subs: [
      {
        heading: "Google Tag Manager",
        paras: [
          "Wir setzen den Google Tag Manager ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.",
          "Der Google Tag Manager ist ein Tool, mit dessen Hilfe wir Tracking- oder Statistik-Tools und andere Technologien auf unserer Website einbinden können. Der Google Tag Manager selbst erstellt keine Nutzerprofile, speichert keine Cookies und nimmt keine eigenständigen Analysen vor. Er dient lediglich der Verwaltung und Ausspielung der über ihn eingebundenen Tools. Der Google Tag Manager erfasst jedoch Ihre IP-Adresse, die auch an das Mutterunternehmen von Google in die Vereinigten Staaten übertragen werden kann.",
          "Der Einsatz des Google Tag Managers erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer schnellen und unkomplizierten Einbindung und Verwaltung verschiedener Tools auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
        ],
      },
      {
        heading: "Google Analytics",
        paras: [
          "Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden von Google ggf. in einem Profil zusammengefasst, das dem jeweiligen Nutzer bzw. dessen Endgerät zugeordnet ist.",
          "Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z.B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.",
          "Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://privacy.google.com/businesses/controllerterms/mccs/.",
        ],
      },
      {
        heading: "IP-Anonymisierung",
        paras: [
          "Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.",
        ],
      },
      {
        heading: "Browser-Plugin",
        paras: [
          "Sie können die Erfassung und Verarbeitung Ihrer Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: https://tools.google.com/dlpage/gaoptout?hl=de.",
          "Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: https://support.google.com/analytics/answer/6004245?hl=de.",
        ],
      },
      {
        heading: "Auftragsverarbeitung",
        paras: [
          "Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Google Analytics vollständig um.",
        ],
      },
      {
        heading: "Demografische Merkmale bei Google Analytics",
        paras: [
          "Diese Website nutzt die Funktion „demografische Merkmale“ von Google Analytics, um den Websitebesuchern passende Werbeanzeigen innerhalb des Google-Werbenetzwerks anzeigen zu können. Dadurch können Berichte erstellt werden, die Aussagen zu Alter, Geschlecht und Interessen der Seitenbesucher enthalten. Diese Daten stammen aus interessenbezogener Werbung von Google sowie aus Besucherdaten von Drittanbietern. Diese Daten können keiner bestimmten Person zugeordnet werden. Sie können diese Funktion jederzeit über die Anzeigeneinstellungen in Ihrem Google-Konto deaktivieren oder die Erfassung Ihrer Daten durch Google Analytics wie im Punkt „Widerspruch gegen Datenerfassung“ dargestellt generell untersagen.",
        ],
      },
      {
        heading: "Speicherdauer",
        paras: [
          "Bei Google gespeicherte Daten auf Nutzer- und Ereignisebene, die mit Cookies, Nutzerkennungen (z. B. User ID) oder Werbe-IDs (z. B. DoubleClick-Cookies, Android-Werbe-ID) verknüpft sind, werden nach 14 Monaten anonymisiert bzw. gelöscht. Details hierzu ersehen Sie unter folgendem Link: https://support.google.com/analytics/answer/7667196?hl=de",
        ],
      },
      {
        heading: "Google Ads",
        paras: [
          "Der Websitebetreiber verwendet Google Ads. Google Ads ist ein Online-Werbeprogramm der Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Google Ads ermöglicht es uns Werbeanzeigen in der Google-Suchmaschine oder auf Drittwebseiten auszuspielen, wenn der Nutzer bestimmte Suchbegriffe bei Google eingibt (Keyword-Targeting). Ferner können zielgerichtete Werbeanzeigen anhand der bei Google vorhandenen Nutzerdaten (z.B. Standortdaten und Interessen) ausgespielt werden (Zielgruppen-Targeting). Wir als Websitebetreiber können diese Daten quantitativ auswerten, indem wir beispielsweise analysieren, welche Suchbegriffe zur Ausspielung unserer Werbeanzeigen geführt haben und wie viele Anzeigen zu entsprechenden Klicks geführt haben.",
          "Die Nutzung von Google Ads erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst effektiven Vermarktung seiner Dienstleistung Produkte.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://policies.google.com/privacy/frameworks und https://privacy.google.com/businesses/controllerterms/mccs/.",
        ],
      },
      {
        heading: "Google Remarketing",
        paras: [
          "Diese Website nutzt die Funktionen von Google Analytics Remarketing. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Google Remarketing analysiert Ihr Nutzerverhalten auf unserer Website (z.B. Klick auf bestimmte Produkte), um Sie in bestimmte Werbe-Zielgruppen einzuordnen und Ihnen anschließend beim Besuch von anderen Onlineangeboten passende Webebotschaften auszuspielen (Remarketing bzw. Retargeting).",
          "Des Weiteren können die mit Google Remarketing erstellten Werbe-Zielgruppen mit den geräteübergreifenden Funktionen von Google verknüpft werden. Auf diese Weise können interessenbezogene, personalisierte Werbebotschaften, die in Abhängigkeit Ihres früheren Nutzungs- und Surfverhaltens auf einem Endgerät (z. B. Handy) an Sie angepasst wurden auch auf einem anderen Ihrer Endgeräte (z. B. Tablet oder PC) angezeigt werden.",
          "Wenn Sie über einen Google-Account verfügen, können Sie der personalisierten Werbung unter folgendem Link widersprechen: https://www.google.com/settings/ads/onweb/.",
          "Die Nutzung von Google Remarketing erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst effektiven Vermarktung seiner Produkte. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
          "Weitergehende Informationen und die Datenschutzbestimmungen finden Sie in der Datenschutzerklärung von Google unter: https://policies.google.com/technologies/ads?hl=de.",
        ],
      },
      {
        heading: "Google Conversion-Tracking",
        paras: [
          "Diese Website nutzt Google Conversion Tracking. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Mit Hilfe von Google-Conversion-Tracking können Google und wir erkennen, ob der Nutzer bestimmte Aktionen durchgeführt hat. So können wir beispielsweise auswerten, welche Buttons auf unserer Website wie häufig geklickt und welche Produkte besonders häufig angesehen oder gekauft wurden. Diese Informationen dienen dazu, Conversion-Statistiken zu erstellen. Wir erfahren die Gesamtanzahl der Nutzer, die auf unsere Anzeigen geklickt haben und welche Aktionen sie durchgeführt haben. Wir erhalten keine Informationen, mit denen wir den Nutzer persönlich identifizieren können. Google selbst nutzt zur Identifikation Cookies oder vergleichbare Wiedererkennungstechnologien.",
          "Die Nutzung von Google Conversion-Tracking erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
          "Mehr Informationen zu Google Conversion-Tracking finden Sie in den Datenschutzbestimmungen von Google: https://policies.google.com/privacy?hl=de.",
        ],
      },
    ],
  },
  {
    title: "6. Newsletter",
    subs: [
      {
        heading: "Newsletterdaten",
        paras: [
          "Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.",
          "Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen“-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.",
          "Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei uns bzw. dem Newsletterdiensteanbieter gespeichert und nach der Abbestellung des Newsletters oder nach Zweckfortfall aus der Newsletterverteilerliste gelöscht. Wir behalten uns vor, E-Mail-Adressen aus unserem Newsletterverteiler nach eigenem Ermessen im Rahmen unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO zu löschen oder zu sperren.",
          "Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in einer Blacklist gespeichert, um künftige Mailings zu verhindern. Die Daten aus der Blacklist werden nur für diesen Zweck verwendet und nicht mit anderen Daten zusammengeführt. Dies dient sowohl Ihrem Interesse als auch unserem Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von Newslettern (berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet. Sie können der Speicherung widersprechen, sofern Ihre Interessen unser berechtigtes Interesse überwiegen.",
          "Näheres entnehmen Sie den Datenschutzbestimmungen von Sendinblue unter: https://de.sendinblue.com/datenschutz-uebersicht/.",
          "Abschluss eines Vertrags über Auftragsverarbeitung: Wir haben mit Sendinblue einen Vertrag abgeschlossen, in dem wir Sendinblue verpflichten, die Daten unserer Kunden zu schützen und sie nicht an Dritte weiterzugeben.",
        ],
      },
    ],
  },
  {
    title: "7. Plugins und Tools",
    subs: [
      {
        heading: "YouTube mit erweitertem Datenschutz",
        paras: [
          "Diese Website bindet Videos der YouTube ein. Betreiber der Seiten ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen. Die Weitergabe von Daten an YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht zwingend ausgeschlossen. So stellt YouTube – unabhängig davon, ob Sie sich ein Video ansehen – eine Verbindung zum Google DoubleClick-Netzwerk her.",
          "Sobald Sie ein YouTube-Video auf dieser Website starten, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen.",
          "Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies auf Ihrem Endgerät speichern oder vergleichbare Wiedererkennungstechnologien (z.B. Device-Fingerprinting) einsetzen. Auf diese Weise kann YouTube Informationen über Besucher dieser Website erhalten. Diese Informationen werden u. a. verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit zu verbessern und Betrugsversuchen vorzubeugen.",
          "Gegebenenfalls können nach dem Start eines YouTube-Videos weitere Datenverarbeitungsvorgänge ausgelöst werden, auf die wir keinen Einfluss haben.",
          "Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
          "Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter: https://policies.google.com/privacy?hl=de.",
        ],
      },
      {
        heading: "Google Web Fonts (lokales Hosting)",
        paras: [
          "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.",
          "Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de.",
        ],
      },
      {
        heading: "Google Maps",
        paras: [
          "Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
          "Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.",
          "Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://privacy.google.com/businesses/gdprcontrollerterms/ und https://privacy.google.com/businesses/gdprcontrollerterms/sccs/.",
          "Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de.",
          "Sie haben jederzeit die Möglichkeit, der Verarbeitung Ihrer personenbezogenen Daten für Kontaktanfragen zu widersprechen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der vorhergehenden Beschreibung der Funktionen dargestellt wird. In einem solchen Fall kann die Bearbeitung der Anfrage ggf. nicht fortgeführt werden. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.",
        ],
      },
    ],
  },
  {
    title: "8. Unsere Social-Media-Auftritte",
    subs: [
      {
        heading: "Datenverarbeitung durch soziale Netzwerke",
        paras: [
          "Wir unterhalten öffentlich zugängliche Profile in sozialen Netzwerken. Die im Einzelnen von uns genutzten sozialen Netzwerke finden Sie weiter unten.",
          "Soziale Netzwerke wie Facebook, Twitter etc. können Ihr Nutzerverhalten in der Regel umfassend analysieren, wenn Sie deren Website oder eine Website mit integrierten Social-Media-Inhalten (z. B. Like-Buttons oder Werbebannern) besuchen. Durch den Besuch unserer Social-Media-Präsenzen werden zahlreiche datenschutzrelevante Verarbeitungsvorgänge ausgelöst. Im Einzelnen:",
          "Wenn Sie in Ihrem Social-Media-Account eingeloggt sind und unsere Social-Media-Präsenz besuchen, kann der Betreiber des Social-Media-Portals diesen Besuch Ihrem Benutzerkonto zuordnen. Ihre personenbezogenen Daten können unter Umständen aber auch dann erfasst werden, wenn Sie nicht eingeloggt sind oder keinen Account beim jeweiligen Social-Media-Portal besitzen. Diese Datenerfassung erfolgt in diesem Fall beispielsweise über Cookies, die auf Ihrem Endgerät gespeichert werden oder durch Erfassung Ihrer IP-Adresse.",
          "Mit Hilfe der so erfassten Daten können die Betreiber der Social-Media-Portale Nutzerprofile erstellen, in denen Ihre Präferenzen und Interessen hinterlegt sind. Auf diese Weise kann Ihnen interessenbezogene Werbung in- und außerhalb der jeweiligen Social-Media-Präsenz angezeigt werden. Sofern Sie über einen Account beim jeweiligen sozialen Netzwerk verfügen, kann die interessenbezogene Werbung auf allen Geräten angezeigt werden, auf denen Sie eingeloggt sind oder eingeloggt waren.",
          "Bitte beachten Sie außerdem, dass wir nicht alle Verarbeitungsprozesse auf den Social-Media-Portalen nachvollziehen können. Je nach Anbieter können daher ggf. weitere Verarbeitungsvorgänge von den Betreibern der Social-Media-Portale durchgeführt werden. Details hierzu entnehmen Sie den Nutzungsbedingungen und Datenschutzbestimmungen der jeweiligen Social-Media-Portale.",
        ],
      },
      {
        heading: "Rechtsgrundlage",
        paras: [
          "Unsere Social-Media-Auftritte sollen eine möglichst umfassende Präsenz im Internet gewährleisten. Hierbei handelt es sich um ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO. Die von den sozialen Netzwerken initiierten Analyseprozesse beruhen ggf. auf abweichenden Rechtsgrundlagen, die von den Betreibern der sozialen Netzwerke anzugeben sind (z. B. Einwilligung im Sinne des Art. 6 Abs. 1 lit. a DSGVO).",
        ],
      },
      {
        heading: "Verantwortlicher und Geltendmachung von Rechten",
        paras: [
          "Wenn Sie einen unserer Social-Media-Auftritte (z. B. Facebook) besuchen, sind wir gemeinsam mit dem Betreiber der Social-Media-Plattform für die bei diesem Besuch ausgelösten Datenverarbeitungsvorgänge verantwortlich. Sie können Ihre Rechte (Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Beschwerde) grundsätzlich sowohl ggü. uns als auch ggü. dem Betreiber des jeweiligen Social-Media-Portals (z. B. ggü. Facebook) geltend machen.",
          "Bitte beachten Sie, dass wir trotz der gemeinsamen Verantwortlichkeit mit den Social-Media-Portal-Betreibern nicht vollumfänglich Einfluss auf die Datenverarbeitungsvorgänge der Social-Media-Portale haben. Unsere Möglichkeiten richten sich maßgeblich nach der Unternehmenspolitik des jeweiligen Anbieters.",
        ],
      },
      {
        heading: "Speicherdauer",
        paras: [
          "Die unmittelbar von uns über die Social-Media-Präsenz erfassten Daten werden von unseren Systemen gelöscht, sobald der Zweck für ihre Speicherung entfällt, Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Gespeicherte Cookies verbleiben auf Ihrem Endgerät, bis Sie sie löschen. Zwingende gesetzliche Bestimmungen – insb. Aufbewahrungsfristen – bleiben unberührt.",
          "Auf die Speicherdauer Ihrer Daten, die von den Betreibern der sozialen Netzwerke zu eigenen Zwecken gespeichert werden, haben wir keinen Einfluss. Für Einzelheiten dazu informieren Sie sich bitte direkt bei den Betreibern der sozialen Netzwerke (z. B. in deren Datenschutzerklärung, siehe unten).",
        ],
      },
      {
        heading: "Facebook",
        paras: [
          "Wir verfügen über ein Profil bei Facebook. Anbieter dieses Dienstes ist die Facebook Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Die erfassten Daten werden nach Aussage von Facebook auch in die USA und in andere Drittländer übertragen.",
          "Wir haben mit Facebook eine Vereinbarung über gemeinsame Verarbeitung (Controller Addendum) geschlossen. In dieser Vereinbarung wird festgelegt, für welche Datenverarbeitungsvorgänge wir bzw. Facebook verantwortlich ist, wenn Sie unsere Facebook-Page besuchen. Diese Vereinbarung können Sie unter folgendem Link einsehen: https://www.facebook.com/legal/terms/page_controller_addendum.",
          "Sie können Ihre Werbeeinstellungen selbstständig in Ihrem Nutzer-Account anpassen. Klicken Sie hierzu auf folgenden Link und loggen Sie sich ein: https://www.facebook.com/settings?tab=ads.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://www.facebook.com/legal/EU_data_transfer_addendum und https://de-de.facebook.com/help/566994660333381.",
          "Details entnehmen Sie der Datenschutzerklärung von Facebook: https://www.facebook.com/about/privacy/.",
        ],
      },
      {
        heading: "Instagram",
        paras: [
          "Wir verfügen über ein Profil bei Instagram. Anbieter ist die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://www.facebook.com/legal/EU_data_transfer_addendum, https://help.instagram.com/519522125107875 und https://de-de.facebook.com/help/566994660333381.",
          "Details zu deren Umgang mit Ihren personenbezogenen Daten entnehmen Sie der Datenschutzerklärung von Instagram: https://help.instagram.com/519522125107875.",
        ],
      },
      {
        heading: "LinkedIn",
        paras: [
          "Wir verfügen über ein Profil bei LinkedIn. Anbieter ist die LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland. LinkedIn verwendet Werbecookies.",
          "Wenn Sie LinkedIn-Werbe-Cookies deaktivieren möchten, nutzen Sie bitte folgenden Link: https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out.",
          "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: https://www.linkedin.com/legal/l/dpa und https://www.linkedin.com/legal/l/eu-sccs.",
          "Details zu deren Umgang mit Ihren personenbezogenen Daten entnehmen Sie der Datenschutzerklärung von LinkedIn: https://www.linkedin.com/legal/privacy-policy.",
        ],
      },
      {
        heading: "YouTube",
        paras: [
          "Wir verfügen über ein Profil bei YouTube. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Details zu deren Umgang mit Ihren personenbezogenen Daten entnehmen Sie der Datenschutzerklärung von YouTube: https://policies.google.com/privacy?hl=de.",
        ],
      },
    ],
  },
];

export default function Datenschutz() {
  const [lang, setLang] = useState<Language>("de");

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Page header ---- */}
        <header className="pt-40 pb-16 px-6 md:px-12">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
            RECHTLICHES
          </p>
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text">
            <SplitText text="Datenschutz" />
          </h1>
        </header>

        {/* ---- Grouped legal sections ---- */}
        <div className="px-6 md:px-12 pb-28">
          {groups.map((group, gIdx) => (
            <section key={gIdx} className="mb-4">
              <DividerLine />
              <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text pt-12 mb-8">
                {group.title}
              </h2>
              <div className="max-w-3xl space-y-10 pb-12">
                {group.subs.map((sub, sIdx) => (
                  <div key={sIdx}>
                    {sub.heading && (
                      <h3 className="font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-green mb-4">
                        {sub.heading}
                      </h3>
                    )}
                    {sub.paras?.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed mb-4"
                      >
                        <Linkify text={para} />
                      </p>
                    ))}
                    {sub.bullets && (
                      <ul className="space-y-3 mt-2">
                        {sub.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex gap-3 font-sans font-medium text-fs-small text-brand-muted leading-relaxed"
                          >
                            <span className="text-brand-green shrink-0">—</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
