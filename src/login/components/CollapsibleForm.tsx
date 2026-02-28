import styles from "./CollapsibleForm.module.css";

export type CollapsibleFormProps = {
    /** Label for the summary (e.g. "I have a CDI account"). */
    summaryLabel: React.ReactNode;
    /** Whether the section is expanded on initial render. */
    defaultOpen?: boolean;
    children: React.ReactNode;
};

/**
 * Collapsible section using native <details> and <summary>. Expands downward.
 */
export default function CollapsibleForm(props: CollapsibleFormProps) {
    const { summaryLabel, defaultOpen = false, children } = props;

    return (
        <details className={styles.section} open={defaultOpen}>
            <summary className={styles.summary}>{summaryLabel}</summary>
            <div className={styles.content}>{children}</div>
        </details>
    );
}
