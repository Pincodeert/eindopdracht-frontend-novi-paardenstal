import star from "../../assets/ster-image.jpg";
import Button from "../button/Button.jsx";
import './SubscriptionTile.css';
import {formatPrice} from "../../helpers/helpers.js";

function SubscriptionTile(props) {
    return (
        <article className="subscription-article" key={props.key}>
            <h2>{props.title}</h2>
            <img src={props.image} alt={props.imageinfo}/>
            <div className="subscription-text-wrapper">
                <p>{props.textline1}</p>
                <p>{props.textline2}</p>
                <p>{props.textline3}</p>
                <p>{props.textline4}</p>

            </div>
            <p className="price">{formatPrice(props.price)}</p>
            <p className={props.classname}>{props.remark}!</p>
            <Button
                type="button"
                text="Neem dit abonnement"
                // note={props.event}
                note="hier wordt een inschrijfformulier getoond"
            />
        </article>
    );
}

export default SubscriptionTile;