import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

import styles from "./MessageAlert.module.css";

export type MessageAlertProps = {
    type: keyof typeof alertVariantMap;
    summary: string;
};

const alertVariantMap = {
    error: styles.alertError,
    warning: styles.alertWarning,
    success: styles.alertSuccess,
    info: styles.alertInfo
} as const;

/**
 * Message banner (icon + summary). Login-only; used as message slot in CdiTemplate.
 */
export default function MessageAlert(props: MessageAlertProps) {
    const { type, summary } = props;
    const variant = alertVariantMap[type];

    return (
        <div className={clsx(styles.alert, variant)} role="alert">
            <span
                className={styles.summary}
                dangerouslySetInnerHTML={{
                    __html: kcSanitize(summary)
                }}
            />
        </div>
    );
}
