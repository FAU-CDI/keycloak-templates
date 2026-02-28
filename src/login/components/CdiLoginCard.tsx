import type { ReactNode } from "react";

import styles from "./CdiLoginCard.module.css";

export type CdiLoginCardProps = {
    /** Content for the header (e.g. locale switcher + title). */
    headerChildren: ReactNode;
    /** Content for the main area (message, social, static buttons, children). */
    mainContent: ReactNode;
    /** Content for the footer (rendered outside main). */
    footerContent?: ReactNode;
};

/**
 * Card shell: logo placeholder, header slot, main content wrapper, footer. Reusable layout for login and other pages.
 */
export default function CdiLoginCard(props: CdiLoginCardProps) {
    const { headerChildren, mainContent, footerContent } = props;

    return (
        <div className={styles.card}>
            <header className={styles.header}>
                <div className={styles.logo} aria-hidden="true" />
                {headerChildren}
            </header>
            <main className={styles.main}>{mainContent}</main>
            {footerContent}
        </div>
    );
}
