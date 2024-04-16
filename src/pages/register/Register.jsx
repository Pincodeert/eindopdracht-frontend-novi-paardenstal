import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import './Register.css'
import Input from "../../components/input/Input.jsx";

function Register() {
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
                        <form action="/">
                            <Input
                                labelFor="username-text-field"
                                inputType="text"
                                inputId="username-text-field"
                                inputName="username"
                                placeholder="gebruikersnaam"
                            />
                            <Input
                                labelFor="password-text-field"
                                inputType="password"
                                inputId="password-text-field"
                                inputName="password"
                                placeholder="wachtwoord"
                            />
                            <Input
                                labelFor="email-field"
                                inputType="email"
                                inputId="email-field"
                                inputName="email"
                                placeholder="e-mail"
                            />
                            <div className="form-button-wrapper">
                                <Button
                                    type="submit"
                                    text="Registeer"
                                    note="hier wordt aanmaak nieuwe account getriggerd"
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

export default Register;