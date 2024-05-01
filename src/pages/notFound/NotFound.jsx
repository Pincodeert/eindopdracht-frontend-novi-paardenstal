import {Link} from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="inner-container not-found">
            <h2>Swell ... this page doesn't exist</h2>
            <Link to="/"> terug naar de home-pagina</Link>
        </div>
    );
}

export default NotFound;