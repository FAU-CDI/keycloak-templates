import { kcSanitize } from "keycloakify/lib/kcSanitize";

import styles from "./MessageAlert.module.css";

const alertVariantMap = {
    error: styles.error,
    warning: styles.warning,
    success: styles.success,
    info: styles.info
} as const;

type MessageAlertProps = {
    type: keyof typeof alertVariantMap;
    summary: string;
};

/**
 * Message banner (icon + summary). Used as message slot in CdiTemplate.
 */
export default function MessageAlert(props: MessageAlertProps) {
    const { type, summary } = props;
    const variant = alertVariantMap[type];

    return (
        <div
            className={variant}
            role="alert"
            dangerouslySetInnerHTML={{
                __html: kcSanitize(summary)
            }}
        />
    );
}
