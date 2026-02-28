import type { ReactNode } from "react";
import { clsx } from "keycloakify/tools/clsx";

import type { I18n } from "../i18n";

import styles from "./StaticButtonRows.module.css";

/** Keys accepted by msg(); use for static button titles so they stay in sync with i18n. */
type CdiStaticButtonTitleKey = Parameters<I18n["msg"]>[0];

/**
 * Language-specific hrefs for a static button. Key is language tag (e.g. "en", "de");
 * use "" as fallback when the current language has no entry.
 */
type CdiStaticButtonHrefs = Record<string, string>;

/** Single button in a static button row (title is an i18n key). */
export type CdiStaticButton = {
    titleKey: CdiStaticButtonTitleKey;
    /** URLs by language tag; "" key is used as fallback when the language is missing. */
    href: CdiStaticButtonHrefs;
    /** When true, renders the button with smaller padding and font size. */
    small?: boolean;
};

export type StaticButtonRowsProps = {
    rows: CdiStaticButton[][];
    languageTag: string;
    msg: (key: CdiStaticButtonTitleKey) => ReactNode;
};

export function StaticButtonRows(props: StaticButtonRowsProps) {
    const { rows, languageTag, msg } = props;

    const resolveHref = (button: CdiStaticButton): string => {
        const url = button.href[languageTag] ?? button.href[""] ?? "#";
        return url || "#";
    };

    return (
        <div className={styles.rows}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((button, buttonIndex) => (
                        <a
                            key={buttonIndex}
                            href={resolveHref(button)}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx(styles.link, button.small && styles.small)}
                        >
                            {msg(button.titleKey)}
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
}
