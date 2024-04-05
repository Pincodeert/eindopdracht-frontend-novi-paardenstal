import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import './Login.css'

function Login() {
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
                            <label htmlFor="username-text-field">
                                <input type="text" id="username-text-field" name="username"
                                       placeholder="gebruikersnaam"/>
                            </label>
                            <label htmlFor="password-text-field">
                                <input type="text" id="password-text-field" name="password"
                                       placeholder="wachtwoord"/>
                            </label>
                            <div className="form-button-wrapper">
                                <a href="/">wachtwoord vergeten?</a>
                                <Button
                                    type="submit"
                                    text="Log in"
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
                            classname="high-lighted"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;