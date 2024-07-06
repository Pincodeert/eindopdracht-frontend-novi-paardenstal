import horse from "../../assets/Paard-bewerkt-header.jpg";
import styles from './HeaderContent.module.css';
import HeaderTitle from "../headerTitle/HeaderTitle.jsx";

function HeaderContent() {
    return (
        <div className={styles["header-content-wrapper"]}>
            <span className={styles["header-content-image"]}>
                <img src={horse} alt="Original image by Taylor Brandon"/>
            </span>
            <HeaderTitle classname="header-default-title"/>
        </div>
    );
}

export default HeaderContent;