import horse from "../../assets/Paard-bewerkt-header.jpg";
import styles from './HeaderContent.module.css';

function HeaderContent() {
    return (
        <div className={styles["header-content-wrapper"]}>
                        <span className={styles["header-content-image"]}>
                            <img src={horse} alt="Original image by Taylor Brandon"/>
                        </span>
            <div className={styles["header-content-title"]}>
                <h1>Blaze of Glory</h1>
                <h2 className={styles["header-subtitle"]}>Pensionstallen</h2>
            </div>
        </div>
    );
}

export default HeaderContent;