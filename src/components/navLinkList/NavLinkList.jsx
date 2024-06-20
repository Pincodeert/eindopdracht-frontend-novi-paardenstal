import {NavLink} from "react-router-dom";
import styles from "./NavLinkList.module.css";

function NavLinkList() {
    return (
        <ul className={styles["nav-list"]}>
            <li>
                <NavLink to="/"
                         className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>home</NavLink>
            </li>
            <li>
                <NavLink to="/stallen"
                         className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>stallen</NavLink>
            </li>
            <li>
                <NavLink to="/abonnementen"
                         className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>abonnementen</NavLink>
            </li>
            <li>
                <NavLink to="/registreer"
                         className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>registreren</NavLink>
            </li>
            <li>
                <NavLink to="/login"
                         className={({isActive}) => isActive ? `${styles["nav-active"]}` : `${styles["nav-default"]}`}>inloggen</NavLink>
            </li>
        </ul>
    );
}

export default NavLinkList;