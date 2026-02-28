/**
 * Login page (login.ftl): username/password + optional WebAuthn. Composes CdiTemplate with Login-only slots and CollapsibleForm.
 */
import type { ComponentType } from "react";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";
import type { CdiTemplateProps } from "../../components/CdiTemplate";
import CollapsibleForm from "../../components/CollapsibleForm";
import { useScript } from "keycloakify/login/pages/Login.useScript";

import MessageAlert from "./MessageAlert";
import InfoBlock from "./InfoBlock";
import TryAnotherWay from "./TryAnotherWay";
import LoginForm from "./LoginForm";
import LoginWebAuthnSection from "./LoginWebAuthnSection";
import SocialProviders from "./SocialProviders";

import styles from "./LoginRoot.module.css";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

/** Login page props: Template is typed to accept CdiTemplateProps (used by KcPage for login.ftl). */
type LoginPageProps = Omit<PageProps<LoginKcContext, I18n>, "Template"> & {
    Template: ComponentType<CdiTemplateProps>;
};

export default function Login(props: LoginPageProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        message,
        isAppInitiatedAction,
        messagesPerField,
        enableWebAuthnConditionalUI,
        authenticators
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({
        webAuthnButtonId,
        kcContext,
        i18n
    });

    const showMessage =
        message !== undefined && (message.type !== "warning" || !isAppInitiatedAction);

    const messageNode =
        showMessage && message ? (
            <MessageAlert message={message} kcClsx={kcClsx} />
        ) : null;

    const infoNode = (
        <InfoBlock infoNode={<p>{msg("cdiWelcomeText")}</p>} kcClsx={kcClsx} />
    );

    const tryAnotherWayNode =
        auth !== undefined && auth.showTryAnotherWayLink ? (
            <TryAnotherWay url={url} msg={msg} kcClsx={kcClsx} />
        ) : null;

    const socialProvidersNode =
        realm.password &&
        social?.providers !== undefined &&
        social.providers.length > 0 ? (
            <SocialProviders providers={social.providers} msg={msg} kcClsx={kcClsx} />
        ) : null;

    const TemplateComponent = Template;

    return (
        <div className={styles.loginRoot}>
            <TemplateComponent
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={true}
                headerNode={
                    realm.displayNameHtml ? (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(realm.displayNameHtml)
                            }}
                        />
                    ) : (
                        realm.displayName ?? realm.name
                    )
                }
                displayInfo
                infoNode={<p>{msg("cdiWelcomeText")}</p>}
                infoNodeSlot={infoNode}
                messageNode={messageNode}
                tryAnotherWayNode={tryAnotherWayNode}
                socialProvidersNode={socialProvidersNode}
            >
                <CollapsibleForm
                    summaryLabel={msg("cdiGivenLocalAccount")}
                    defaultOpen={
                        !!login?.username?.trim() ||
                        messagesPerField.existsError("username", "password")
                    }
                >
                    <LoginForm
                        realm={realm}
                        url={url}
                        login={login}
                        auth={auth}
                        usernameHidden={usernameHidden}
                        messagesPerField={messagesPerField}
                        enableWebAuthnConditionalUI={enableWebAuthnConditionalUI}
                        i18n={i18n}
                        kcClsx={kcClsx}
                        isLoginButtonDisabled={isLoginButtonDisabled}
                        setIsLoginButtonDisabled={setIsLoginButtonDisabled}
                    />
                    {enableWebAuthnConditionalUI && (
                        <LoginWebAuthnSection
                            url={url}
                            authenticators={authenticators}
                            webAuthnButtonId={webAuthnButtonId}
                            msgStr={msgStr}
                            kcClsx={kcClsx}
                        />
                    )}
                </CollapsibleForm>
            </TemplateComponent>
        </div>
    );
}
