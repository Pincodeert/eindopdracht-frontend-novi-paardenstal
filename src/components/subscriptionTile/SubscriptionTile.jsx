import star from "../../assets/ster-image.jpg";
import Button from "../button/Button.jsx";
import styles from './SubscriptionTile.module.css';
import formatPrice from "../../helpers/formatPrice.js";


function SubscriptionTile({isSoldOut, key, title, stallType, careType, price, handleSubscriptionClick}) {

    let inventoryClass = "default";
    if (isSoldOut) {
        inventoryClass = "visible"
    }

    return (
        <article className={styles["subscription-article"]} key={key}>
            <h2>{title}</h2>
            <img src={star} alt="ster"/>
            <div className={styles["subscription-text-wrapper"]}>
                <p>{stallType}</p>
                <p>{careType}</p>
                <p>inclusief extra's</p>
                <p>flexibel opzeggen</p>

            </div>
            <p className={styles["price"]}>{formatPrice(price)}</p>
            <Button
                type="button"
                handleClick={handleSubscriptionClick}
                disabled={isSoldOut}
            >
                {isSoldOut ? <p className={inventoryClass}>Niet meer beschikbaar !</p> :
                    <p>Neem dit abonnement</p>}
            </Button>
        </article>
    );
}

export default SubscriptionTile;