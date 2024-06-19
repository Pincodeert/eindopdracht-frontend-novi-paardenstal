import Button from "../button/Button.jsx";
import styles from'./NavBar.module.css'
import {Link, NavLink, useNavigate} from "react-router-dom";

function NavBar({classname}) {
    const navigate = useNavigate();

    return (
        <nav className={styles[classname]}>
            <Link to="/"><h2>Blaze of Glory</h2></Link>
            <ul>
                <li>
                    <NavLink to="/stallen" className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>stallen</NavLink>
                </li>
                <li>
                    <NavLink to="/abonnementen" className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>abonnementen</NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? "nav-active" : "nav-default"}>home</NavLink>
                </li>

                <li>
                    <Button
                        type="button"
                        disabled={false}
                        handleClick={() => navigate("/")}
                    >
                        home
                    </Button>
                </li>
                <li>
                    <Button
                        type="button"
                        disabled={false}
                        handleClick={() => navigate("/stallen")}
                    >
                        stallen
                    </Button>
                </li>
                <li>
                    <Button
                        type="button"
                        disabled={false}
                        handleClick={() => navigate("/abonnementen")}
                    >
                        abonnementen
                    </Button>
                </li>
                <li>
                    <Button
                        type="button"
                        disabled={false}
                        handleClick={() => navigate("/registreer")}
                    >
                        registreren
                    </Button>
                </li>
                <li>
                    <Button
                        type="button"
                        disabled={false}
                        handleClick={() => navigate("/login")}
                    >
                        inloggen
                    </Button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;