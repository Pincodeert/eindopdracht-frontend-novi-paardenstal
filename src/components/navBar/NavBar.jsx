import Button from "../button/Button.jsx";
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
                        note="hier komt een link"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="stallen"
                        note="hier komt een link"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="abonnementen"
                        note="hier komt een link"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="registreren"
                        note="hier komt een link"
                    />
                </li>
                <li>
                    <Button
                        type="button"
                        text="inloggen"
                        note="hier komt een link"
                    />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;