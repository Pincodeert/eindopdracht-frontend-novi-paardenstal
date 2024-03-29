import star from "../assets/ster-image.jpg";
import './Usp.css';

function Usp(props) {
    return (
        <article className="usp-article">
            <img src={star} alt="ster"/>
            <p>{props.text}</p>
        </article>
    );
}

export default Usp;