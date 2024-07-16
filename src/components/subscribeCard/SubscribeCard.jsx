import styles from "./SubscribeCard.module.css";

function SubscribeCard({subscribeCardTitle, children, error}) {
    return (
        <article className={styles["subscribe-card"]}>
            <h4 className="italic">{subscribeCardTitle}</h4>
            {children}
            <p className="form-error">{error}</p>
        </article>
    );
}

export default SubscribeCard;