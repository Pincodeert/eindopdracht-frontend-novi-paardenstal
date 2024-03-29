import Button from "../Button/Button.jsx";
import './NavBar.css'

function NavBar(props) {
    return (
        <nav className={props.classname}>
            <h2>Blaze of Glory</h2>
            {/*<a href=""><img src="" alt="logo-blaze-of-glory"/>Blaze of Glory</a>*/}
            <ul>
                <li>
                    <Button
                        type="button"
                        text="home"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="stallen"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="abonnementen"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="registreren"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="inloggen"
                    />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;