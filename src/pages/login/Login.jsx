import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import './Login.css'
import TextInput from "../../components/textInput/TextInput.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {abonnementen} from "../../constants/testdata.js";

function Login() {
    const navigate = useNavigate();

    const [loginFormState, setLoginFormState] = useState({
        username: "",
        password: "",
    });

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setLoginFormState({
            ...loginFormState,
            [changedFieldName]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(loginFormState);
        navigate("/profiel/:customerProfileId")
    }

    // function handleSubmit(userId) {
    //     // e.preventDefault();
    //     //hier code die inloggegevens checkt en token genereert
    //     navigate(`/profiel/${userId}`);
    //
    // }

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
                        <h2>Inloggen: </h2>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                inputName="username"
                                textValue={loginFormState.username}
                                changeHandler={handleChange}
                                placeholder="gebruikersnaam"
                            />
                            <label htmlFor="password-field">
                                <input
                                    type="password"
                                    placeholder="wachtwoord"
                                    id="password-field"
                                    name="password"
                                    value={loginFormState.password}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="form-button-wrapper">
                                <a href="https://www.seniorweb.nl/tip/sterk-wachtwoord-maken-onthouden" target="_blank">wachtwoord
                                    vergeten?</a>
                                <Button
                                    type="submit"
                                    disabled={false}
                                    classname="high-lighted"
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="info-container">
                        <p className="title">Nog geen member?</p>
                        <p className="info-line">Maak dan nu een gratis account aan en word lid!</p>
                        <Button
                            type="button"
                            diasbled={false}
                            handleClick={() => navigate("/registreer")}
                            classname="high-lighted"
                        >
                            Registreer
                        </Button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;