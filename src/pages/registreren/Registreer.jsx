import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import './Registreer.css'

function Registreer() {
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
                        <h2>Registreer hier: </h2>
                        <form action="/">
                            <label htmlFor="username-text-field">
                                <input type="text" id="username-text-field" name="username"
                                       placeholder="gebruikersnaam"/>
                            </label>
                            <label htmlFor="password-text-field">
                                <input type="text" id="password-text-field" name="password"
                                       placeholder="wachtwoord"/>
                            </label>
                            <label htmlFor="email-field">
                                <input type="email" id="email-field" name="email"
                                       placeholder="e-mail"/>
                            </label>
                            <div className="form-button-wrapper">
                                <Button
                                    type="submit"
                                    text="Registreer"
                                    classname="high-lighted"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="info-container">
                        <img src={nico} alt="nico"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Registreer;