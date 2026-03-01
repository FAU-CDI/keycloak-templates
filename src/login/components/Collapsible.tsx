import styles from "./Collapsible.module.css";

export type CollapsibleProps = {
    label: React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
};

/**
 * Collapsible section using native <details> and <summary>. Expands downward.
 */
export default function Collapsible(props: CollapsibleProps) {
    const { label, defaultOpen = false, children } = props;

    return (
        <details className={styles.collapsible} open={defaultOpen}>
            <summary>{label}</summary>
            <div>{children}</div>
        </details>
    );
}
