import { useId } from "react";

import styles from "./CdiLocaleSwitcher.module.css";

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
export default function CdiLocaleSwitcher(props: CdiLocaleSwitcherProps) {
    const { currentLanguage, enabledLanguages, ariaLabel } = props;
    const menuId = useId();
    const buttonId = useId();

    return (
        <div className={styles.dropdown}>
            <button
                type="button"
                tabIndex={1}
                id={buttonId}
                className={styles.button}
                aria-label={ariaLabel}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls={menuId}
            >
                {currentLanguage.label}
            </button>
            <ul
                role="menu"
                tabIndex={-1}
                aria-labelledby={buttonId}
                id={menuId}
                className={styles.menu}
            >
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <li key={languageTag} className={styles.menuItem} role="none">
                        <a role="menuitem" className={styles.menuLink} href={href}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
