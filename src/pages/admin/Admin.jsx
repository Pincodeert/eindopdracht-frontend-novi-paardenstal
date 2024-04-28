import './Admin.css';
import Button from "../../components/button/Button.jsx";
import axl from "../../constants/testdata.js";
import {Link} from "react-router-dom";

function Admin() {
    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            {/*<h2>Blaze of Glory</h2>*/}
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            <h3>Here to make your day</h3>
                            <div className="profile-icon">CE</div>
                        </nav>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2>Menu</h2>
                        <h3>Stallen</h3>
                        <Link><h3>Stallen</h3></Link>
                        <Button
                            type="button"
                            text="alle stallen"
                            note="hier komt een link"
                        />
                        <Button
                            type="button"
                            text="zoek stal"
                            note="hier komt een link"
                        />
                        <Button
                            type="button"
                            text="voeg stal toe"
                            note="hier komt een link"
                        />
                        <Link><h3>Abonnementsoorten</h3></Link>
                        <Link><h3>Klanten</h3></Link>
                        <Link><h3>Paarden</h3></Link>
                        <Link><h3>Inschrijvingen</h3></Link>
                        <Button
                            type="button"
                            text="toon nieuwe aanvragen"
                        />
                        <Button
                            type="button"
                            text="toon annuleringsverzoeken"
                        />
                        <Button
                            type="button"
                            text="maak nieuwe inschrijving aan"
                        />
                        <Button
                            type="button"
                            text="toon cijfers"
                        />
                    </nav>
                    <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            <h3>Welkom {axl.firstName} {axl.lastName}</h3>
                            {/*<p>klantnummer: {axl.customerProfileId} </p>*/}
                        </div>
                    </div>
                    <article className="content-wrapper persona">
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
                    </article>
                </div>
            </main>
        </>
    );
}

export default Admin;