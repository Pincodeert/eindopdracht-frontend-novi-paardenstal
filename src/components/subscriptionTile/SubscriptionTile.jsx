import star from "../../assets/ster-image.jpg";
import Button from "../button/Button.jsx";
import './SubscriptionTile.css';
import formatPrice from "../../helpers/formatPrice.js";
import {useNavigate} from "react-router-dom";

function SubscriptionTile(props) {

    let inventoryClass = "default";
    if (props.isSoldOut) {
        inventoryClass = "visible"
    }

    return (
        <article className="subscription-article" key={props.componentKey}>
            <h2>{props.title}</h2>
            <img src={props.image} alt={props.imageinfo}/>
            <div className="subscription-text-wrapper">
                <p>{props.textline1}</p>
                <p>{props.textline2}</p>
                <p>{props.textline3}</p>
                <p>{props.textline4}</p>

            </div>
            <p className="price">{formatPrice(props.price)}</p>
            {/*<p className={props.classname}>{props.remark}!</p>*/}
            <p className={inventoryClass}>Niet meer beschikbaar</p>
            {/*<p className={props.isSoldOut ? "visible" : "default"}>Niet meer beschikbaar!</p>*/}
            <Button
                type="button"
                handleClick={props.handleSubscriptionClick}
                disabled={props.isSoldOut}
            >
                {props.isSoldOut ? <p className={inventoryClass}>Niet meer beschikbaar !</p> :
                    <p>Neem dit abonnement</p>}
            </Button>
        </article>
    );
}

export default SubscriptionTile;