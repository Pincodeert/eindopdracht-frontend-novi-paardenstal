import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import './Register.css'
import TextInput from "../../components/textInput/TextInput.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Register() {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [registerSubmitSuccessId, setRegisterSubmitSuccessId] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setRegisterSubmitSuccessId(false);
        // console.log(formState)
        try {
            const response = await axios.post("http://localhost:8080/users", {
                ...formState
            });
            console.log(response);
            // setRegisterSubmitSuccessId(response.data);
            setRegisterSubmitSuccessId(true);
        } catch (error) {
            console.error(error);
            setError(error);
        }
        navigate("/login");
    }

    console.log(registerSubmitSuccessId);

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
                    {error && <p className="error">De account kon niet worden aangemaakt. Probeer het opnieuw</p>}
                    <div className="form-container">
                        <h2>Registreer hier: </h2>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                inputName="username"
                                placeholder="gebruikersnaam"
                                textValue={formState.username}
                                changeHandler={handleChange}
                            />
                            <label htmlFor="password-field">
                                <input
                                    type="password"
                                    placeholder="wachtwoord"
                                    id="password-field"
                                    name="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="email-field">
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    placeholder="e-mail"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="form-button-wrapper">
                                <Button
                                    type="submit"
                                    disabled={false}
                                    classname="high-lighted"
                                >
                                    Registeer
                                </Button>
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