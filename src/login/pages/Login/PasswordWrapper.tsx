import type { JSX } from "keycloakify/tools/JSX";
import { clsx } from "keycloakify/tools/clsx";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { I18n } from "../../i18n";

import styles from "./PasswordWrapper.module.css";

export type PasswordWrapperProps = {
    i18n: I18n;
    passwordInputId: string;
    invalid?: boolean;
    children: JSX.Element;
};

/**
 * Password input + visibility toggle. Used by LoginForm.
 */
export default function PasswordWrapper(props: PasswordWrapperProps) {
    const { i18n, passwordInputId, invalid, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className={clsx(styles.inputGroup, invalid && styles.inputGroupInvalid)}>
            {children}
            <button
                type="button"
                className={styles.visibilityButton}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i
                    className={styles.visibilityIcon}
                    aria-hidden
                    data-password-visibility-label={msgStr(
                        isPasswordRevealed ? "hidePassword" : "showPassword"
                    )}
                />
            </button>
        </div>
    );
}
