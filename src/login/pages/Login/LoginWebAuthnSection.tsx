import type { I18n } from "../../i18n";

import styles from "./LoginWebAuthnSection.module.css";

type Authenticator = { credentialId: string };

export type LoginWebAuthnSectionProps = {
    url: { loginAction: string };
    authenticators: { authenticators: Authenticator[] } | undefined;
    webAuthnButtonId: string;
    msgStr: I18n["msgStr"];
    kcClsx?: unknown;
};

/**
 * WebAuthn hidden form(s) and passkey button. Rendered inside CollapsibleForm when enabled.
 */
export default function LoginWebAuthnSection(props: LoginWebAuthnSectionProps) {
    const { url, authenticators, webAuthnButtonId, msgStr } = props;

    return (
        <>
            <form id="webauth" action={url.loginAction} method="post">
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>

            {authenticators !== undefined &&
                authenticators.authenticators.length !== 0 && (
                    <form id="authn_select" className={styles.webauthnForm}>
                        {authenticators.authenticators.map((authenticator, i) => (
                            <input
                                key={i}
                                type="hidden"
                                name="authn_use_chk"
                                readOnly
                                value={authenticator.credentialId}
                            />
                        ))}
                    </form>
                )}

            <input
                id={webAuthnButtonId}
                type="button"
                className={styles.webauthnButton}
                value={msgStr("passkey-doAuthenticate")}
            />
        </>
    );
}
