import { useRef } from "react";
import styles from "./TryAnotherWay.module.css";

export type TryAnotherWayProps = {
    url: { loginAction: string };
    msg: (key: "doTryAnotherWay") => React.ReactNode;
    kcClsx?: unknown;
};

/**
 * "Try another way" form and link. Login-only; used as tryAnotherWay slot in CdiTemplate.
 */
export default function TryAnotherWay(props: TryAnotherWayProps) {
    const { url, msg } = props;
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef} action={url.loginAction} method="post">
            <div className={styles.formGroup}>
                <input type="hidden" name="tryAnotherWay" value="on" />
                <a
                    href="#"
                    className={styles.tryAnotherWayLink}
                    onClick={event => {
                        formRef.current?.requestSubmit();
                        event.preventDefault();
                        return false;
                    }}
                >
                    {msg("doTryAnotherWay")}
                </a>
            </div>
        </form>
    );
}
