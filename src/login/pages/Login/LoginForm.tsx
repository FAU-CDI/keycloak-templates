import { useId, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import type { I18n } from "../../i18n";

import PasswordWrapper from "./PasswordWrapper";
import styles from "./LoginForm.module.css";

type Realm = {
    password?: boolean;
    loginWithEmailAllowed?: boolean;
    registrationEmailAsUsername?: boolean;
    rememberMe?: boolean;
    resetPasswordAllowed?: boolean;
};

type MessagesPerField = {
    existsError: (...fields: string[]) => boolean;
    getFirstError: (...fields: string[]) => string;
};

export type LoginFormProps = {
    realm: Realm;
    url: { loginAction: string; loginResetCredentialsUrl: string };
    login: { username?: string; rememberMe?: boolean | string };
    auth: { selectedCredential?: string };
    usernameHidden?: boolean;
    messagesPerField: MessagesPerField;
    i18n: I18n;
    kcClsx: KcClsx;
};

/**
 * Login form body: error alert, username, password, remember me, forgot password, submit.
 */
export default function LoginForm(props: LoginFormProps) {
    const { realm, url, login, auth, usernameHidden, messagesPerField, i18n, kcClsx } =
        props;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const usernameId = useId();
    const passwordId = useId();
    const rememberMeId = useId();

    const hasFieldError = messagesPerField.existsError("username", "password");

    if (!realm.password) return null;

    return (
        <div className={styles.form}>
            <div className={styles.formWrapper}>
                <form
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                >
                    {hasFieldError && (
                        <div
                            className={clsx(
                                styles.alert,
                                styles.alertError,
                                styles.formErrorAlert
                            )}
                            role="alert"
                        >
                            <div className={styles.alertIcon}>
                                <span className={kcClsx("kcFeedbackErrorIcon")} />
                            </div>
                            <span
                                className={styles.alertTitle}
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(
                                        messagesPerField.getFirstError(
                                            "username",
                                            "password"
                                        )
                                    )
                                }}
                            />
                        </div>
                    )}
                    {!usernameHidden && (
                        <div className={styles.formGroup}>
                            <label htmlFor={usernameId} className={styles.label}>
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </label>
                            <input
                                tabIndex={2}
                                id={usernameId}
                                className={clsx(
                                    styles.input,
                                    hasFieldError && styles.inputInvalid
                                )}
                                name="username"
                                defaultValue={login.username ?? ""}
                                type="text"
                                autoFocus
                                autoComplete={"username"}
                                aria-invalid={hasFieldError}
                            />
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor={passwordId} className={styles.label}>
                            {msg("password")}
                        </label>
                        <PasswordWrapper
                            i18n={i18n}
                            passwordInputId={passwordId}
                            invalid={hasFieldError}
                        >
                            <input
                                tabIndex={3}
                                id={passwordId}
                                className={clsx(
                                    styles.input,
                                    hasFieldError && styles.inputInvalid
                                )}
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                aria-invalid={hasFieldError}
                            />
                        </PasswordWrapper>
                    </div>

                    <div className={clsx(styles.formGroup, styles.formOptionsRow)}>
                        <div>
                            {realm.rememberMe && !usernameHidden && (
                                <div className={styles.rememberMeCheckbox}>
                                    <label
                                        htmlFor={rememberMeId}
                                        className={styles.formOptionsCheckbox}
                                    >
                                        <input
                                            tabIndex={5}
                                            id={rememberMeId}
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            {realm.resetPasswordAllowed && (
                                <span>
                                    <a
                                        tabIndex={6}
                                        href={url.loginResetCredentialsUrl}
                                        className={styles.formOptionsLink}
                                    >
                                        {msg("doForgotPassword")}
                                    </a>
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className={clsx(
                            styles.formGroup,
                            styles.formGroupLast,
                            styles.formButtons
                        )}
                    >
                        <input
                            type="hidden"
                            name="credentialId"
                            value={auth.selectedCredential ?? ""}
                        />
                        <input
                            tabIndex={7}
                            disabled={isLoginButtonDisabled}
                            className={styles.submitButton}
                            name="login"
                            type="submit"
                            value={msgStr("doLogIn")}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
