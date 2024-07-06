import React from "react";
import styles from "./Display.module.css";

function Display({className ,title, children}) {


    return (
        <article className={`${styles["content-wrapper"]} ${styles[className]}`}>
            <div className={styles["content-title"]}>
                <h4>{title}</h4>
            </div>
            <div className={styles["overwiew-column-container"]}>
                {children}
            </div>
        </article>
    );
}

export default Display;