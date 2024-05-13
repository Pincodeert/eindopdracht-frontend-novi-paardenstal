import "./SubscribeCard.css";

function SubscribeCard({subscribeCardTitle, children, subscribeStep}) {
    return (
        <article className="subscribe-card">
            <h4 className="italic">{subscribeCardTitle}</h4>
            {children}
        </article>
    );
}

export default SubscribeCard;