/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            cdiSelectInstitutionWith: "Select Your Institution with {0}",
            cdiGivenLocalAccount: "I have a CDI account with username and password",
            cdiWelcomeText:
                "To continue, please confirm that you are a member of an academic institution. If you encounter any problems, or your institution is not listed on the next page, please contact support.",
            cdiContactSupport: "Contact Support",
            cdiAbout: "About CDI / FDM Bayern SSO",
            cdiPrivacyPolicy: "Privacy Policy",
            cdiImprint: "Imprint",
            cdiAccessibility: "Accessibility",
            showPassword: "Show",
            hidePassword: "Hide"
        },
        de: {
            cdiSelectInstitutionWith: "Institution wählen mit {0}",
            cdiGivenLocalAccount:
                "Ich habe einen CDI Account mit Benutzername und Passwort",
            cdiWelcomeText:
                "Um fortzufahren, bitte bestätigen Sie, dass Sie Mitglied einer akademischen Institution sind. Wenn Probleme autauchen oder Ihre Institution nicht auf der nächsten Seite aufgelistet ist, wenden Sie sich bitte an den Support.",
            cdiContactSupport: "Support kontaktieren",
            cdiAbout: "Über CDI / FDM Bayern SSO",
            cdiPrivacyPolicy: "Datenschutz",
            cdiImprint: "Impressum",
            cdiAccessibility: "Barrierefreiheit",
            showPassword: "Anzeigen",
            hidePassword: "Verbergen"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
