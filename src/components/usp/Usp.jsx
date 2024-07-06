import star from "../../assets/ster-image.jpg";
import styles from './Usp.module.css';

function Usp({text}) {
    return (
        <article className={styles["usp-article"]}>
            <img src={star} alt="ster"/>
            <p>{text}</p>
        </article>
    );
}

export default Usp;