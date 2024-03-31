import star from "../../assets/ster-image.jpg";
import Button from "../button/Button.jsx";
import './SubscriptionTile.css';

function SubscriptionTile(props) {
    return (
        <article className="subscription-article">
            <h2>{props.title}</h2>
            <img src={props.image} alt={props.imageinfo}/>
            <div className="subscription-text-wrapper">
                <p>{props.textline1}</p>
                <p>{props.textline2}</p>
                <p>{props.textline3}</p>
                <p>{props.textline4}</p>

            </div>
            <p className="price">€{props.price},-</p>
            <p className={props.classname}>{props.remark}!</p>
            <Button
                type="button"
                text="Neem dit abonnement"
            />
        </article>
    );
}

export default SubscriptionTile;