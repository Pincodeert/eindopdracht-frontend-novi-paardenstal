import "./SubscribeCard.css";

function SubscribeCard({subscribeCardTitle, children, subscribeStep, error}) {
    return (
        <article className="subscribe-card">
            <h4 className="italic">{subscribeCardTitle}</h4>
            {children}
            <p className="form-error">{error}</p>
        </article>
    );
}

export default SubscribeCard;