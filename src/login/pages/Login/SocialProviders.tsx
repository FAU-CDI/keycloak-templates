import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import type { I18n } from "../../i18n";

import styles from "./SocialProviders.module.css";

type SocialProvider = {
    alias: string;
    displayName: string;
    loginUrl: string;
};

export type SocialProvidersProps = {
    providers: SocialProvider[];
    msgStr: I18n["msgStr"];
    kcClsx: KcClsx;
};

/**
 * Social provider list for "Select your institution". Used by Login page for socialProvidersNode.
 */
export default function SocialProviders(props: SocialProvidersProps) {
    const { providers, msgStr } = props;

    if (providers.length === 0) return null;

    return (
        <div className={styles.social}>
            {providers.map(p => (
                <a key={p.alias} href={p.loginUrl} role="button">
                    {msgStr("cdiSelectInstitutionWith", kcSanitize(p.displayName))}
                </a>
            ))}
        </div>
    );
}
