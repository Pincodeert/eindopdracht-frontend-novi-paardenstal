import star from "../../assets/ster-image.jpg";
import stable from "../../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg";
import button from "../button/Button.jsx";
import Button from "../button/Button.jsx";
import './Feature.css';

function Feature(props) {
    return (
        <article className={props.classname}>
            <div className="feature-text">
                <h3>{props.title}</h3>
                <div className="feature-text-item">
                    <img src={star} alt="test-plaatje"/>
                    <p>{props.item1}</p>
                </div>
                <div className="feature-text-item">
                    <img src={star} alt="test-plaatje"/>
                    <p>{props.item2}</p>
                </div>
                <div className="feature-text-item">
                    <img src={star} alt="test"/>
                    <p>{props.item3}</p>
                </div>
                <div className="feature-text-item">
                    <img src={star} alt="test"/>
                    <p>{props.item4}</p>
                </div>
            </div>
            <div className="feature-image">
                                    <span>
                                    <img src={props.image} alt={props.info}/>
                                    </span>
                <Button
                    type="button"
                    text={props.buttontext}
                    note={props.event}
                />
            </div>
        </article>
    );
}

export default Feature;