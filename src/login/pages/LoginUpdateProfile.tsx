import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import CdiTemplate from "../components/CdiTemplate";
import MessageAlert from "../components/MessageAlert";

import styles from "./LoginUpdateProfile.module.css";

type LoginUpdateProfileKcContext = Extract<KcContext, { pageId: "login-update-profile.ftl" }>;
type LoginUpdateProfileProps = Omit<PageProps<LoginUpdateProfileKcContext, I18n>, "Template"> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
    const { kcContext, i18n, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const globalMessage = messagesPerField.exists?.("global") && messagesPerField.get?.("global") ? (messagesPerField.get("global") as string) : "";

    return (
        <CdiTemplate kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} headerNode={msg("loginProfileTitle")}>
            {globalMessage !== "" && <MessageAlert type="error" summary={globalMessage} />}
            <form className={styles.form} action={url.loginAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={() => ""}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <p className={styles.formIntro}>{msg("cdiUpdateProfileIntro")}</p>
                <div className={styles.formActions}>
                    <input disabled={!isFormSubmittable} type="submit" value={msgStr("doSubmit")} />
                    {isAppInitiatedAction && (
                        <button type="submit" name="cancel-aia" value="true" formNoValidate>
                            {msg("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </CdiTemplate>
    );
}
