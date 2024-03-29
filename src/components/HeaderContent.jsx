import horse from "../assets/Paard-bewerkt-header.jpg";
import './HeaderContent.css';

function HeaderContent() {
    return (
        <div className="header-content-wrapper">
                        <span className="header-content-image">
                            <img src={horse} alt="Original image by Taylor Brandon"/>
                        </span>
            <div className="header-content-title">
                <h1>Blaze of Glory</h1>
                <h2>Pensionstallen</h2>
            </div>
        </div>
    );
}

export default HeaderContent;