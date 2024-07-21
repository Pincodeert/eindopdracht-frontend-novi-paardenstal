import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import styles from './Login.module.css';
import TextInput from "../../components/textInput/TextInput.jsx";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {SubscriptionContext} from "../../context/SubscriptionContext.jsx";
import {useForm} from "react-hook-form";
import NavLinkList from "../../components/navLinkList/NavLinkList.jsx";
import HeaderTitle from "../../components/headerTitle/HeaderTitle.jsx";

function Login() {
    const [error, setError] = useState("");
    const [isLoading, toggleIsLoading] = useState(false);

    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onBlur"});
    const {signIn} = useContext(AuthContext);
    const {subscriptionId} = useContext(SubscriptionContext);

    async function handleFormSubmit(data) {
        setError("");
        toggleIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/authenticate", {
                ...data
            });
            signIn(response.data.jwt, subscriptionId);
        } catch (error) {
            console.error(error);
            setError("Inloggen niet gelukt. Probeer het opnieuw. Neem contact met ons op, wanneer dit probleem " +
                "zich blijft voordoen.");
        } finally {
            toggleIsLoading(false);
        }
    }

    return (
        <>
            <header>
                <section className="outer-container login-nav-section">
                    <div className="inner-container">
                        <NavBar>
                            <NavLinkList/>
                        </NavBar>
                    </div>
                </section>
                <section className="outer-container">
                    <div className="inner-container login-header-section">
                        <HeaderTitle classname="header-login-title"/>
                    </div>
                </section>
            </header>
            <main className="outer-container ">
                <section className="inner-container login-content-section">
                    <div className={styles["form-login-container"]}>
                        <h2 className={styles["login-text"]}>Inloggen:</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                placeholder="gebruikersnaam"
                                inputName="username"
                                register={register}
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Het invullen van een gebruikersnaam is verplicht"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Vul minimaal 8 tekens in"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Vul maximaal 20 tekens in"
                                    }
                                }}
                                errors={errors}
                            />
                            <label htmlFor="password-field">
                                <input
                                    type="password"
                                    placeholder="wachtwoord"
                                    id="password-field"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Wachtwoord is verplicht',
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Vul minimaal 8 tekens in",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Vul maximaal 20 tekens in",
                                        },
                                    })}
                                />
                                {errors.password && <p className="form-error-login">{errors.password.message}</p>}
                            </label>
                            {isLoading &&
                                <p className="loading-login">Loading...</p>}
                            {error &&
                                <p className="form-error-login">{error}</p>}
                            <div className={styles["form-button-wrapper"]}>
                                <a href="https://www.seniorweb.nl/tip/sterk-wachtwoord-maken-onthouden" target="_blank"
                                >
                                    wachtwoord vergeten?
                                </a>
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
                    <div className={styles["info-login-container"]}>
                        <p className={styles["title"]}>Nog geen member?</p>
                        <p className={styles["info-line"]}>Maak dan nu een gratis account aan en word lid!</p>
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