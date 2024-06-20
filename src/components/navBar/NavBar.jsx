import styles from './NavBar.module.css'
import {Link} from "react-router-dom";

function NavBar({children}) {
    return (
        <nav className={styles["header-navigation"]}>
            <Link to="/">
                <h2 className={styles.logo}>Blaze of Glory</h2>
            </Link>
            {children}
        </nav>
    );
}

export default NavBar;