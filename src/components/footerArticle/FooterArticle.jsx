import styles from './FooterArticle.module.css';

function FooterArticle({classname, title, children}) {
    return (
        <article className={`${styles["footer-info"]} ${styles[classname]}`}>
            <div className="info-text-wrapper">
                <p className={styles["footer-info-title"]}>{title}</p>
                {children}
            </div>
        </article>
    );
}

export default FooterArticle;