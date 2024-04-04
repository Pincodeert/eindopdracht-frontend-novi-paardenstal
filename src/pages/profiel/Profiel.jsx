import NavBar from "../../components/navBar/NavBar.jsx";
import "./Profiel.css"
import Button from "../../components/button/Button.jsx";
import axl from "../../constants/testdata.js";



function Profiel() {
    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <NavBar
                            classname="header-navigation"
                        />
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <Button
                            type="button"
                            text="Uw gegevens"
                        />
                        <Button
                            type="button"
                            text="Uw paarden"
                        />
                        <Button
                            type="button"
                            text="Uw abonnementen"
                        />
                    </nav>
                    <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            <h3>Welkom {axl.firstName} {axl.lastName}</h3>
                            <p>klantnummer: {axl.customerProfileId} </p>
                        </div>
                        <div className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Uw gegevens</h4>
                                <Button
                                    type="button"
                                    text="wijzig"
                                />
                            </div>
                            <table className="table">
                                <thead>
                                    <tr className="table-head">
                                        <th>adres:</th>
                                        <th>huisnummer:</th>
                                        <th>postcode</th>
                                        <th>plaats</th>
                                        <th>telefoonnumer</th>
                                        <th>e-mail</th>
                                        <th>IBAN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-body">
                                        <td>{axl.street}</td>
                                        <td>{axl.houseNumber}</td>
                                        <td>{axl.postalCode}</td>
                                        <td>{axl.residence}</td>
                                        <td>{axl.telephoneNumber}</td>
                                        <td>{axl.emailAddress}</td>
                                        <td>{axl.bankAccountNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="content-wrapper">
                            <h4>Uw paarden</h4>
                        </div>
                        <div className="content-wrapper">
                            <h4>Uw abonnementen</h4>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Profiel;