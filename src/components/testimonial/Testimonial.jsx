import quoteup from "../../assets/quotes-up.jpg";
import quotedown from "../../assets/quotes-down.jpg";
import styles from './Testimonial.module.css';

function Testimonial({text, author}) {
    return (
        <article className={styles["testimonial-article"]}>
            <div className={styles["quote-wrapper"]}>
                <img src={quoteup} alt="quote-icon"/>
                <p>
                    {text}
                </p>
                <img src={quotedown} alt="quote-icon"/>
            </div>
            <p>-- {author} --</p>
        </article>
    );
}

export default Testimonial;