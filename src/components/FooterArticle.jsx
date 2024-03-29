import './FooterArticle.css';
function FooterArticle(props) {
    return (
        <article className={props.classname}>
            <div className="info-text-wrapper">
                <p className="footer-info-title">{props.title}</p>
                {props.children}
            </div>
        </article>
    );
}

export default FooterArticle;