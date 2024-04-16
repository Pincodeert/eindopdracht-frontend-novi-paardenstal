import './Admin.css';
import Button from "../../components/button/Button.jsx";
import axl from "../../constants/testdata.js";

function Admin() {
    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            <h2>Blaze of Glory</h2>
                            <h3>Here to make your day</h3>
                            <div className="profile-icon">CE</div>
                        </nav>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <Button
                            type="button"
                            text="Uw gegevens"
                            note="hier komt een link"
                        />
                        <Button
                            type="button"
                            text="Uw paarden"
                            note="hier komt een link"
                        />
                        <Button
                            type="button"
                            text="Uw abonnementen"
                            note="hier komt een link"
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