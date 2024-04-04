import "./Profiel.css"
import Button from "../../components/button/Button.jsx";
import axl, {averell, enrollment1, stallYoung3, sweethorse} from "../../constants/testdata.js";




function Profiel() {
    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            <h2>Blaze of Glory</h2>
                            <div className="profile-icon">AR</div>
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
                        <article className="content-wrapper horses">
                            <div className="content-title">
                                <h4>Uw paarden</h4>
                            </div>
                            <div className="horse-wrapper">
                                <div className="head-line">
                                    <p className="horsename">{sweethorse.name}</p>
                                    <Button
                                        type="button"
                                        text="wijzig"
                                    />
                                </div>
                                <table className="table">
                                    <thead>
                                    <tr className="table-head">
                                        <th>paardnummer</th>
                                        <th>type voeding</th>
                                        <th>type boedembedekking</th>
                                        <th>naam dierenarts</th>
                                        <th>woonplaats dierenarts</th>
                                        <th>telefoonnummer dierenarts</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>{sweethorse.horseNumber}</td>
                                        <td>{sweethorse.typeOfFeed}</td>
                                        <td>{sweethorse.typeOfBedding}</td>
                                        <td>{sweethorse.nameOfVet}</td>
                                        <td>{sweethorse.residenceOfVet}</td>
                                        <td>{sweethorse.telephoneOfVet}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table className="table">
                                    <thead>
                                    <tr className="table-head">
                                        <th>Abonnement</th>
                                        <th>Stal</th>
                                        <th>Paardenpaspoort</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>{averell.name}</td>
                                        <td>{stallYoung3.name}</td>
                                        <td>{<Button type="button" text="bekijk"/>}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="horse-wrapper">
                                <div className="head-line">
                                    <p className="horsename">{sweethorse.name}</p>
                                    <Button
                                        type="button"
                                        text="wijzig"
                                    />
                                </div>
                                <table className="table">
                                    <thead>
                                    <tr className="table-head">
                                        <th>paardnummer</th>
                                        <th>type voeding</th>
                                        <th>type boedembedekking</th>
                                        <th>naam dierenarts</th>
                                        <th>woonplaats dierenarts</th>
                                        <th>telefoonnummer dierenarts</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>{sweethorse.horseNumber}</td>
                                        <td>{sweethorse.typeOfFeed}</td>
                                        <td>{sweethorse.typeOfBedding}</td>
                                        <td>{sweethorse.nameOfVet}</td>
                                        <td>{sweethorse.residenceOfVet}</td>
                                        <td>{sweethorse.telephoneOfVet}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table className="table">
                                    <thead>
                                    <tr className="table-head">
                                        <th>Abonnement</th>
                                        <th>Stal</th>
                                        <th>Paardenpaspoort</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>{averell.name}</td>
                                        <td>{stallYoung3.name}</td>
                                        <td>{<Button type="button" text="bekijk"/>}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </article>
                        <article className="content-wrapper subscriptions">
                            <div className="content-title">
                                <h4>Uw abonnementen</h4>
                                <Button
                                    type="button"
                                    text="bereken totale prijs"
                                />
                            </div>
                            <div className="subscriptiom-wrapper">
                                <div className="head-line">
                                    <p className="horsename">Abonnementnummer: {enrollment1.enrollmentId}</p>
                                    <Button
                                        type="button"
                                        text="wijzig"
                                    />
                                </div>
                                <table className="table">
                                    <thead>
                                    <tr className="table-head">
                                        <th>abonnement type</th>
                                        <th>paard</th>
                                        <th>stalnaam</th>
                                        <th>type stal</th>
                                        <th>type verzorging</th>
                                        <th>start-datum</th>
                                        <th>annulering aangevraagd</th>
                                        <th>prijs</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>{averell.name}</td>
                                        <td>{sweethorse.name}</td>
                                        <td>{stallYoung3.name}</td>
                                        <td>{averell.typeOfStall}</td>
                                        <td>{averell.typeOfCare}</td>
                                        <td>{enrollment1.startDate}</td>
                                        <td>{enrollment1.cancellationRequested}</td>
                                        <td>{averell.price}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profiel;