import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import type { I18n } from "../../i18n";

import styles from "./SocialProviders.module.css";

type SocialProvider = {
    alias: string;
    displayName: string;
    loginUrl: string;
    iconClasses?: string;
};

export type SocialProvidersProps = {
    providers: SocialProvider[];
    msg: I18n["msg"];
    kcClsx: KcClsx;
};

/**
 * Social provider list for "Select your institution". Used by Login page for socialProvidersNode.
 */
export default function SocialProviders(props: SocialProvidersProps) {
    const { providers, msg } = props;

    if (providers.length === 0) return null;

    return (
        <div className={styles.socialSection}>
            <ul
                className={clsx(
                    styles.socialList,
                    providers.length > 3 && styles.socialListGrid
                )}
            >
                {providers.map(p => {
                    return (
                        <li key={p.alias}>
                            <a
                                className={styles.socialButton}
                                type="button"
                                href={p.loginUrl}
                            >
                                {p.iconClasses && (
                                    <i
                                        className={clsx(styles.socialIcon, p.iconClasses)}
                                        aria-hidden="true"
                                    />
                                )}
                                <span
                                    className={clsx(
                                        styles.socialButtonName,
                                        p.iconClasses && styles.socialIconText
                                    )}
                                >
                                    {msg(
                                        "cdiSelectInstitutionWith",
                                        kcSanitize(p.displayName)
                                    )}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
