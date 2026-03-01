/**
 * Login page (login.ftl): username/password + optional WebAuthn. Composes CdiTemplate with Login-only slots and CollapsibleForm.
 */
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";
import Collapsible from "../../components/Collapsible";
import { useScript } from "keycloakify/login/pages/Login.useScript";

import MessageAlert from "../../components/MessageAlert";
import LoginForm from "./LoginForm";
import SocialProviders from "./SocialProviders";
import CdiTemplate from "../../components/CdiTemplate";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

/** Login page props: Template is typed to accept CdiTemplateProps (used by KcPage for login.ftl). */
type LoginPageProps = Omit<PageProps<LoginKcContext, I18n>, "Template">;

export default function Login(props: LoginPageProps) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;

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
        messagesPerField
    } = kcContext;

    const { msg, msgStr } = i18n;

    // we don't actually do WebAuthN, so we don't need to load the script
    useScript({
        webAuthnButtonId: "",
        kcContext,
        i18n
    });

    const showMessage =
        message !== undefined && (message.type !== "warning" || !isAppInitiatedAction);

    const messageNode =
        showMessage && message ? (
            <MessageAlert type={message.type} summary={message.summary} />
        ) : null;

    const hasPrefilledOrError =
        !!login?.username?.trim() || messagesPerField.existsError("username", "password");

    const providersLogin =
        realm.password &&
        social?.providers !== undefined &&
        social.providers.length > 0 ? (
            <Collapsible
                label={msg("cdiSelectInstitution")}
                defaultOpen={!hasPrefilledOrError}
            >
                {messageNode}
                <p>{msg("cdiSelectInstitutionIntro")}</p>
                <SocialProviders
                    providers={social.providers}
                    msgStr={msgStr}
                    kcClsx={kcClsx}
                />
            </Collapsible>
        ) : null;

    const nativeLogin = (
        <Collapsible
            label={msg("cdiGivenLocalAccount")}
            defaultOpen={hasPrefilledOrError}
        >
            <LoginForm
                realm={realm}
                url={url}
                login={login}
                auth={auth}
                usernameHidden={usernameHidden}
                messagesPerField={messagesPerField}
                i18n={i18n}
            />
        </Collapsible>
    );

    return (
        <CdiTemplate
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
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
        >
            <p>{msg("cdiWelcomeText")}</p>
            {providersLogin}
            {nativeLogin}
        </CdiTemplate>
    );
}
