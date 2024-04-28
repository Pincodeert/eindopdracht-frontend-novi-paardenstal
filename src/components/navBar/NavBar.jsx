import Button from "../button/Button.jsx";
import './NavBar.css'
import {Link, NavLink, useNavigate} from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate();

    return (
        <nav className={props.classname}>
            {/*<h2>Blaze of Glory</h2>*/}
            <Link to="/"><h2>Blaze of Glory</h2></Link>
            <ul>
                {/*<li>*/}
                {/*    <NavLink to="/" className={({isActive}) => isActive ? "nav-active" : "nav-default"}>home</NavLink>*/}
                {/*</li>*/}
                <li>
                    <Button
                        type="button"
                        text="home"
                        handleClick={() => navigate("/")}
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="stallen"
                        handleClick={() => navigate("/stallen")}
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="abonnementen"
                        handleClick={() => navigate("/abonnementen")}
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="registreren"
                        handleClick={() => navigate("/registreer")}
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="inloggen"
                        handleClick={() => navigate("/login")}
                    />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;