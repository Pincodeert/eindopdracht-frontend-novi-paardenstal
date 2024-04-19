import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import './Login.css'
import TextInput from "../../components/textInput/TextInput.jsx";
import {useState} from "react";

function Login() {

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    console.log(usernameValue, passwordValue);

    return (
        <>
            <header >
                <section className="outer-container nav-section">
                    <div className="inner-container">
                        <NavBar
                            classname="header-navigation"
                        />
                    </div>
                </section>
                <section className="outer-container">
                    <div className="inner-container title-section">
                        <div className="header-content-title">
                            <h1>Blaze of Glory</h1>
                            <h2>Pensionstallen</h2>
                        </div>
                    </div>
                </section>
            </header>
            <main className="outer-container ">
                <section className="inner-container content-section">
                    <div className="form-container">
                        <h2>Inloggen: </h2>
                        <form action="/">
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                inputName="username"
                                textValue={usernameValue}
                                setTextValue={setUsernameValue}
                                placeholder="gebruikersnaam"
                            />
                            <label htmlFor="password-field">
                                <input
                                    type="password"
                                    placeholder="wachtwoord"
                                    id="password-field"
                                    name="password"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                />
                            </label>
                            <div className="form-button-wrapper">
                                <a href="/">wachtwoord vergeten?</a>
                                <Button
                                    type="submit"
                                    text="Log in"
                                    note="hier wordt de authenticatie getriggerd"
                                    classname="high-lighted"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="info-container">
                        <p className="title">Nog geen member?</p>
                        <p className="info-line">Maak dan nu een gratis account aan en word lid!</p>
                        <Button
                            type="button"
                            text="Register"
                            note="hier komt een link"
                            classname="high-lighted"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;