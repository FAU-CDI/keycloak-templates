import type { ReactNode } from "react";

import logoUrl from "../images/CDI_Logo_cmyk.svg";

import styles from "./CdiLoginCard.module.css";

export type CdiLoginCardProps = {
    /** Accessible label for the logo image. */
    logoAlt: string;
    /** Title (or other content) centered in the header. */
    headerCenter: ReactNode;
    /** Optional content on the right (e.g. locale switcher). */
    headerEnd?: ReactNode;
    /** Content for the main area (message, social, static buttons, children). */
    mainContent: ReactNode;
    /** Content for the footer (rendered outside main). */
    footerContent?: ReactNode;
};

/**
 * Card shell: logo, centered title, optional header end, main content, footer.
 */
export default function CdiLoginCard(props: CdiLoginCardProps) {
    const { logoAlt, headerCenter, headerEnd, mainContent, footerContent } = props;

    return (
        <div className={styles.card}>
            <header className={styles.header}>
                <div className={styles.headerTopRow}>
                    <div className={styles.headerStart}>
                        <img
                            src={logoUrl}
                            alt={logoAlt}
                            className={styles.logo}
                        />
                    </div>
                    {headerEnd}
                </div>
                <div className={styles.headerCenter}>{headerCenter}</div>
            </header>
            <main className={styles.main}>{mainContent}</main>
            {footerContent}
        </div>
    );
}
