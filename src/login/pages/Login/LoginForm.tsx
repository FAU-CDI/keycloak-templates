import { useId, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { I18n } from "../../i18n";

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
};

/**
 * Login form body: error alert, username, password, remember me, forgot password, submit.
 */
export default function LoginForm(props: LoginFormProps) {
    const { realm, url, login, auth, usernameHidden, messagesPerField, i18n } = props;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const usernameId = useId();
    const passwordId = useId();
    const rememberMeId = useId();
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId: passwordId
    });

    const hasFieldError = messagesPerField.existsError("username", "password");

    if (!realm.password) return null;

    return (
        <form
            className={styles.form}
            onSubmit={() => {
                setIsLoginButtonDisabled(true);
                return true;
            }}
            action={url.loginAction}
            method="post"
        >
            {hasFieldError && (
                <div
                    role="alert"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            messagesPerField.getFirstError("username", "password")
                        )
                    }}
                />
            )}
            {!usernameHidden && (
                <div>
                    <label htmlFor={usernameId}>
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </label>
                    <input
                        tabIndex={2}
                        id={usernameId}
                        name="username"
                        defaultValue={login.username ?? ""}
                        type="text"
                        autoFocus
                        autoComplete="username"
                        aria-invalid={hasFieldError}
                    />
                </div>
            )}

            <div>
                <label htmlFor={passwordId}>{msg("password")}</label>
                <div
                    className={styles.passwordGroup}
                    data-invalid={hasFieldError ? "true" : undefined}
                >
                    <input
                        tabIndex={3}
                        id={passwordId}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={hasFieldError}
                    />
                    <button
                        type="button"
                        aria-label={msgStr(
                            isPasswordRevealed ? "hidePassword" : "showPassword"
                        )}
                        aria-controls={passwordId}
                        onClick={toggleIsPasswordRevealed}
                    >
                        <i
                            aria-hidden
                            data-password-visibility-label={msgStr(
                                isPasswordRevealed ? "hidePassword" : "showPassword"
                            )}
                        />
                    </button>
                </div>
            </div>

            {(realm.rememberMe && !usernameHidden) || realm.resetPasswordAllowed ? (
                <div className={styles.optionsRow}>
                    {realm.rememberMe && !usernameHidden && (
                        <label htmlFor={rememberMeId}>
                            <input
                                tabIndex={5}
                                id={rememberMeId}
                                name="rememberMe"
                                type="checkbox"
                                defaultChecked={!!login.rememberMe}
                            />{" "}
                            {msg("rememberMe")}
                        </label>
                    )}
                    {realm.resetPasswordAllowed && (
                        <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                            {msg("doForgotPassword")}
                        </a>
                    )}
                </div>
            ) : null}

            <div>
                <input
                    type="hidden"
                    name="credentialId"
                    value={auth.selectedCredential ?? ""}
                />
                <input
                    tabIndex={7}
                    disabled={isLoginButtonDisabled}
                    name="login"
                    type="submit"
                    value={msgStr("doLogIn")}
                />
            </div>
        </form>
    );
}
