import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import styles from './Register.module.css';
import TextInput from "../../components/textInput/TextInput.jsx";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import NavLinkList from "../../components/navLinkList/NavLinkList.jsx";
import HeaderTitle from "../../components/headerTitle/HeaderTitle.jsx";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, toggleIsLoading] = useState(false);

    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onBlur"});

    async function handleFormSubmit(formState) {
        setError("");
        toggleIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/users", {
                ...formState
            });
            console.log(response.status);
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            setError("De account kon niet worden aangemaakt. Probeer het opnieuw. Wanneer dit probleem zich " +
                "blijft voordoen, neem dan contact met op ons.");
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
                    <div className={styles["register-form-container"]}>
                        <h2 className={styles["register-text"]}>Registreer hier:</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <TextInput
                                labelFor="username-text-field"
                                inputId="username-text-field"
                                inputName="username"
                                placeholder="gebruikersnaam"
                                register={register}
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Gebruikersnaam is verplicht"
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
                                        }
                                    )}
                                />
                                {errors.password && <p className="form-error-login">{errors.password.message}</p>}
                            </label>
                            <label htmlFor="email-field">
                                <input
                                    type="email"
                                    id="email-field"
                                    placeholder="e-mail"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "e-mailadres is verplicht",
                                        }
                                    })}
                                />
                                {errors.email && <p className="form-error-login">{errors.email.message}</p>}
                            </label>
                            {isLoading &&
                                <p className="loading-login">Loading...</p>}
                            {error &&
                                <p className="form-error-login">{error}</p>}
                            <div className={styles["form-button-wrapper"]}>
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
                    <div className={styles["register-info-container"]}>
                        <img src={nico} alt="nico"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;