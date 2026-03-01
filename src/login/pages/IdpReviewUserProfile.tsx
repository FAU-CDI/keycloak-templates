import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import CdiTemplate from "../components/CdiTemplate";
import CdiUserProfileForm from "../components/CdiUserProfileForm";

type IdpReviewUserProfileKcContext = Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>;
type IdpReviewUserProfileProps = Omit<PageProps<IdpReviewUserProfileKcContext, I18n>, "Template"> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
    const { kcContext, i18n, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { url, isAppInitiatedAction, kcClsx } = kcContext;
    const { msg } = i18n;

    return (
        <CdiTemplate kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} headerNode={msg("loginIdpReviewProfileTitle")}>
            <CdiUserProfileForm
                url={url}
                isAppInitiatedAction={isAppInitiatedAction}
                i18n={i18n}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                kcContext={kcContext}
            />
        </CdiTemplate>
    );
}
