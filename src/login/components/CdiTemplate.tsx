import { useEffect, useRef } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { StaticButtonRows, type CdiStaticButton } from "./StaticButtonRows";
import CdiLoginCard from "./CdiLoginCard";
import CdiLocaleSwitcher from "./CdiLocaleSwitcher";

import styles from "./CdiTemplate.module.css";
import cardStyles from "./CdiLoginCard.module.css";

export type { CdiStaticButton } from "./StaticButtonRows";

const CDI_FOOTER_ROWS: CdiStaticButton[][] = [
    [
        { titleKey: "cdiContactSupport", href: { "": "mailto:cdi-sso@fau.de" } },
        { titleKey: "cdiAbout", href: { "": "https://www.fdm-bayern.org/sso/" } }
    ],
    [
        {
            titleKey: "cdiPrivacyPolicy",
            href: {
                "": "https://www.cdi.fau.de/en/privacy/",
                de: "https://www.cdi.fau.de/datenschutz/"
            },
            small: true
        },
        {
            titleKey: "cdiImprint",
            href: {
                "": "https://www.cdi.fau.de/en/imprint/",
                de: "https://www.cdi.fau.de/impressum/"
            },
            small: true
        },
        {
            titleKey: "cdiAccessibility",
            href: {
                "": "https://www.cdi.fau.de/en/accessibility",
                de: "https://www.cdi.fau.de/barrierefreiheit/"
            },
            small: true
        }
    ]
];

/** CDI-specific template props: when used, default styles are disabled (custom CSS only). */
export type CdiTemplateProps = TemplateProps<KcContext, I18n> & {
    /** Optional slot for message alert (Login page passes MessageAlert). When set, used instead of default message block. */
    messageNode?: React.ReactNode;
    /** Optional slot for info block (Login page passes InfoBlock). When set, used instead of default info block. */
    infoNodeSlot?: React.ReactNode;
    /** Optional slot for "Select institution" block (collapsible with message + social). When set, infoNodeSlot is rendered first, then this, then children; messageNode/socialProvidersNode are not rendered. */
    institutionSectionNode?: React.ReactNode;
    /** Optional slot for try-another-way link (Login page passes TryAnotherWay). When set, used instead of default. */
    tryAnotherWayNode?: React.ReactNode;
};

export default function CdiTemplate(props: CdiTemplateProps) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        children,
        messageNode: messageNodeSlot,
        infoNodeSlot,
        institutionSectionNode: institutionSectionNodeSlot,
        tryAnotherWayNode: tryAnotherWayNodeSlot
    } = props;

    /* CDI template always disables default Keycloakify CSS so only custom styles apply. */
    const doUseDefaultCss = false;

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    const tryAnotherWayFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: ""
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? ""
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const headerContent = !(
        auth !== undefined &&
        auth.showUsername &&
        !auth.showResetCredentials
    ) ? (
        <h1 className={cardStyles.headerTitle}>{headerNode}</h1>
    ) : (
        <div>
            <label>{auth.attemptedUsername}</label>
            <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                <div>
                    <i aria-hidden />
                    <span>{msg("restartLoginTooltip")}</span>
                </div>
            </a>
        </div>
    );

    const headerNodeResolved = displayRequiredFields ? (
        <div>
            <div className="subtitle">
                <span className="subtitle">
                    <span className="required">*</span>
                    {msg("requiredFields")}
                </span>
            </div>
            <div>{headerContent}</div>
        </div>
    ) : (
        headerContent
    );

    const languageTag = currentLanguage?.languageTag ?? "";

    const footerContentNode = (
        <footer className={cardStyles.footerWrap}>
            <StaticButtonRows
                rows={CDI_FOOTER_ROWS}
                languageTag={languageTag}
                msg={msg}
            />
        </footer>
    );

    const mainContent = institutionSectionNodeSlot !== undefined ? (
        <>
            {infoNodeSlot}
            {institutionSectionNodeSlot}
            {children}
            {tryAnotherWayNodeSlot !== undefined
                ? tryAnotherWayNodeSlot
                : auth !== undefined &&
                  auth.showTryAnotherWayLink && (
                      <form
                          ref={tryAnotherWayFormRef}
                          action={url.loginAction}
                          method="post"
                      >
                          <div>
                              <input type="hidden" name="tryAnotherWay" value="on" />
                              <a
                                  href="#"
                                  onClick={event => {
                                      tryAnotherWayFormRef.current?.requestSubmit();
                                      event.preventDefault();
                                      return false;
                                  }}
                              >
                                  {msg("doTryAnotherWay")}
                              </a>
                          </div>
                      </form>
                  )}
        </>
    ) : (
        <>
            {messageNodeSlot !== undefined
                ? messageNodeSlot
                : displayMessage &&
                  message !== undefined &&
                  (message.type !== "warning" || !isAppInitiatedAction) && (
                      <div
                          className={clsx(
                              `alert-${message.type}`,
                              `pf-m-${message?.type === "error" ? "danger" : message.type}`
                          )}
                      >
                          <div className="pf-c-alert__icon">
                              {message.type === "success" && <span />}
                              {message.type === "warning" && <span />}
                              {message.type === "error" && <span />}
                              {message.type === "info" && <span />}
                          </div>
                          <span
                              dangerouslySetInnerHTML={{
                                  __html: kcSanitize(message.summary)
                              }}
                          />
                      </div>
                  )}
            {socialProvidersNode}
            {infoNodeSlot !== undefined
                ? infoNodeSlot
                : displayInfo && (
                      <div>
                          <div>{infoNode}</div>
                      </div>
                  )}
            {children}
            {tryAnotherWayNodeSlot !== undefined
                ? tryAnotherWayNodeSlot
                : auth !== undefined &&
                  auth.showTryAnotherWayLink && (
                      <form
                          ref={tryAnotherWayFormRef}
                          action={url.loginAction}
                          method="post"
                      >
                          <div>
                              <input type="hidden" name="tryAnotherWay" value="on" />
                              <a
                                  href="#"
                                  onClick={event => {
                                      tryAnotherWayFormRef.current?.requestSubmit();
                                      event.preventDefault();
                                      return false;
                                  }}
                              >
                                  {msg("doTryAnotherWay")}
                              </a>
                          </div>
                      </form>
                  )}
        </>
    );

    return (
        <div className={styles.root}>
            <div className={cardStyles.hiddenHeader} aria-hidden="true">
                <div>{msg("loginTitleHtml", realm.displayNameHtml || realm.name)}</div>
            </div>
            <CdiLoginCard
                logoAlt={msgStr("cdiLogoAlt")}
                headerCenter={headerNodeResolved}
                headerEnd={
                    enabledLanguages.length > 1 ? (
                        <CdiLocaleSwitcher
                            currentLanguage={currentLanguage}
                            enabledLanguages={enabledLanguages}
                            ariaLabel={msgStr("languages")}
                        />
                    ) : undefined
                }
                mainContent={mainContent}
                footerContent={footerContentNode}
            />
        </div>
    );
}
