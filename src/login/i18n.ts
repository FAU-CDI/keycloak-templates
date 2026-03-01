/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            cdiSelectInstitution: "Select your institution",
            cdiSelectInstitutionIntro:
                "Verify your membership with an academic institution. To complete the login process, we additionally need your name and email address.",
            cdiSelectInstitutionWith: "Select Your Institution with {0}",
            cdiGivenLocalAccount: "Log in with CDI username and password",
            cdiWelcomeText:
                "To sign in we need to know that you are a member of an academic institution. If you encounter any problems (for instance your institution is not listed on the following page), please contact support.",
            cdiLogoAlt: "CDI Logo",
            cdiContactSupport: "Contact Support",
            cdiAbout: "About CDI / FDM Bayern Login",
            cdiPrivacyPolicy: "Privacy Policy",
            cdiImprint: "Imprint",
            cdiAccessibility: "Accessibility",
            showPassword: "Show",
            hidePassword: "Hide"
        },
        de: {
            cdiSelectInstitution: "Institution wählen",
            cdiSelectInstitutionIntro:
                "Verifizieren Sie Ihre Zugehörigkeit zu einer akademischen Institution. Um den Login Vorgang abzuschließen, benötigen wir zusätzlich Ihren Namen und Ihre E-Mail Adresse.",
            cdiSelectInstitutionWith: "Institution wählen mit {0}",
            cdiGivenLocalAccount: "Mit CDI Nutzername und Passwort anmelden",
            cdiWelcomeText:
                "Um sich anzumelden, benötigen wir die Bestätigung, dass Sie Mitglied einer akademischen Institution sind. Wenn Probleme auftreten (z.B. Ihre Institution ist auf der nächsten Seite nicht aufgelistet), wenden Sie sich bitte an den Support.",
            cdiLogoAlt: "CDI-Logo",
            cdiContactSupport: "Support kontaktieren",
            cdiAbout: "Über CDI / FDM Bayern Login",
            cdiPrivacyPolicy: "Datenschutz",
            cdiImprint: "Impressum",
            cdiAccessibility: "Barrierefreiheit",
            showPassword: "Anzeigen",
            hidePassword: "Verbergen"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

type Key = Parameters<I18n["msg"]>[0];

export { useI18n, type I18n, type Key };
