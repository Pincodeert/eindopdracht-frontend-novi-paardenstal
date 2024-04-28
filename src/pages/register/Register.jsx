import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import './Register.css'
import TextInput from "../../components/textInput/TextInput.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
const navigate = useNavigate();

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    console.log(usernameValue, passwordValue, emailValue);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("ha verstuurd")
        navigate("/inschrijven/:userId")
    }

    return (
        <>
            <header>
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
                        <h2>Register hier: </h2>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                inputName="username"
                                placeholder="gebruikersnaam"
                                textValue={usernameValue}
                                setTextValue={setUsernameValue}
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
                            <label htmlFor="email-field">
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    placeholder="e-mail"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                />
                            </label>
                            <div className="form-button-wrapper">
                                <Button
                                    type="submit"
                                    text="Registeer"
                                    classname="high-lighted"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="register-info-container">
                        <img src={nico} alt="nico"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;