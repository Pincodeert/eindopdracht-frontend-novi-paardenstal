import star from "../../assets/ster-image.jpg";
import styles from "./IntroSection.module.css";

function IntroSection({title, text, children}) {
    return (
        <section className="outer-container intro-section">
            <div className="inner-container">
                <div className={styles["intro-text-wrapper"]}>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <div>
                        <img className="star-image" src={star} alt="ster"/>
                        <img className="star-image" src={star} alt="ster"/>
                        <img className="star-image" src={star} alt="ster"/>
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}

export default IntroSection;