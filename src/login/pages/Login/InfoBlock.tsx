import type { ReactNode } from "react";

import styles from "./InfoBlock.module.css";

export type InfoBlockProps = {
    infoNode: ReactNode;
    kcClsx?: unknown;
};

/**
 * Wraps infoNode in info block layout. Login-only; used as info slot in CdiTemplate.
 */
export default function InfoBlock(props: InfoBlockProps) {
    const { infoNode } = props;

    return (
        <div className={styles.infoBlock}>
            <div className={styles.infoWrapper}>{infoNode}</div>
        </div>
    );
}
