import quoteup from "../../assets/quotes-up.jpg";
import quotedown from "../../assets/quotes-down.jpg";
import './Testimonial.css';

function Testimonial(props) {
    return (
        <article className="testimonial-article">
            <div className="quote-wrapper">
                <img src={quoteup} alt="quote-icon"/>
                <p>
                    {props.text}
                </p>
                <img src={quotedown} alt="quote-icon"/>
            </div>
            <p>-- {props.author} --</p>
        </article>
    );
}

export default Testimonial;