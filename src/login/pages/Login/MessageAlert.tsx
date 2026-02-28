import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";

import styles from "./MessageAlert.module.css";

export type MessageAlertProps = {
    message: { type: string; summary: string };
    kcClsx: KcClsx;
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
    const { message, kcClsx } = props;
    const variant = alertVariantMap[message.type as keyof typeof alertVariantMap];

    return (
        <div className={clsx(styles.alert, variant)}>
            <div className={styles.alertIcon}>
                {message.type === "success" && (
                    <span className={kcClsx("kcFeedbackSuccessIcon")} />
                )}
                {message.type === "warning" && (
                    <span className={kcClsx("kcFeedbackWarningIcon")} />
                )}
                {message.type === "error" && (
                    <span className={kcClsx("kcFeedbackErrorIcon")} />
                )}
                {message.type === "info" && (
                    <span className={kcClsx("kcFeedbackInfoIcon")} />
                )}
            </div>
            <span
                className={styles.alertTitle}
                dangerouslySetInnerHTML={{
                    __html: kcSanitize(message.summary)
                }}
            />
        </div>
    );
}
