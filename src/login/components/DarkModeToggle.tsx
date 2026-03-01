import styles from "./DarkModeToggle.module.css";

export type DarkModeToggleProps = {
    isDark: boolean;
    onToggle: () => void;
    /** Accessible label when in light mode (e.g. "Switch to dark mode"). */
    labelSwitchToDark: string;
    /** Accessible label when in dark mode (e.g. "Switch to light mode"). */
    labelSwitchToLight: string;
};

/**
 * Toggle button for dark/light theme. Renders a single control next to the locale switcher.
 */
export default function DarkModeToggle(props: DarkModeToggleProps) {
    const { isDark, onToggle, labelSwitchToDark, labelSwitchToLight } = props;

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={onToggle}
            aria-label={isDark ? labelSwitchToLight : labelSwitchToDark}
            title={isDark ? labelSwitchToLight : labelSwitchToDark}
        >
            <span className={styles.icon} aria-hidden>
                {isDark ? "☀" : "☽"}
            </span>
        </button>
    );
}
