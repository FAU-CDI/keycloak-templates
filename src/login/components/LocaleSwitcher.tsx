import { useId } from "react";

import styles from "./LocaleSwitcher.module.css";

export type LocaleOption = {
    languageTag: string;
    label: string;
    href: string;
};

export type CdiLocaleSwitcherProps = {
    currentLanguage: { label: string };
    enabledLanguages: LocaleOption[];
    ariaLabel: string;
};

/**
 * Locale dropdown: button with globe icon + language label, opens menu on hover/focus.
 */
export default function LocaleSwitcher(props: CdiLocaleSwitcherProps) {
    const { currentLanguage, enabledLanguages, ariaLabel } = props;
    const menuId = useId();
    const buttonId = useId();

    return (
        <div className={styles.locale}>
            <button
                type="button"
                tabIndex={1}
                id={buttonId}
                aria-label={ariaLabel}
                aria-haspopup="true"
                aria-controls={menuId}
            >
                {currentLanguage.label}
            </button>
            <ul role="menu" tabIndex={-1} aria-labelledby={buttonId} id={menuId}>
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <li key={languageTag} role="none">
                        <a role="menuitem" href={href}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
