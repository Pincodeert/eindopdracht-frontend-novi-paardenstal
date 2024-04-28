import "./Profile.css"
import Button from "../../components/button/Button.jsx";
import axl, {enrollments, horses} from "../../constants/testdata.js";
import initialsName from "../../helpers/helpers.js";
import {Link, useNavigate} from "react-router-dom";
import calculateCustomersPrice from "../../helpers/calculateCustomersPrice.js";

function Profile() {

    const navigate = useNavigate();


    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            {/*<h2>Blaze of Glory</h2>*/}
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            <div className="profile-icon">{initialsName(axl.firstName, axl.lastName)}</div>
                        </nav>

                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2>Menu</h2>
                        <Link to="#yourpersonalia">Uw gegevens</Link>
                        <Link to="#yourhorses">Uw paarden</Link>
                        <Link to="#yoursubscriptions">Uw abonnementen</Link>
                        <Button
                            type="button"
                            text="Vraag nieuw abonnement aan"
                            handleClick={() => navigate("/abonnementen")}
                        />
                        <Button
                            type="button"
                            text="bereken uw totale abonnemenstkosten"
                            handleClick={calculateCustomersPrice}
                        />
                    </nav>
                    <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            <h3>Welkom {axl.firstName} {axl.lastName}</h3>
                            <p>klantnummer: {axl.customerProfileId} </p>
                        </div>
                        <article id="yourpersonalia" className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Uw gegevens</h4>
                                <Button
                                    type="button"
                                    text="wijzig"
                                    note="hier moet een formulier verschijnen"
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
                        <article id="yourhorses" className="content-wrapper horses">
                            <div className="content-title">
                                <h4>Uw paarden</h4>
                            </div>
                            {horses.map((horse) => {
                                return <div key={horse.horseId} className="horse-wrapper">
                                    <div className="head-line">
                                        <p className="horsename">{horse.name}</p>
                                        <Button
                                            type="button"
                                            text="wijzig"
                                            note="hier moet een paard-formulier verschijnen"
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
                                            <td>{horse.horseNumber}</td>
                                            <td>{horse.typeOfFeed}</td>
                                            <td>{horse.typeOfBedding}</td>
                                            <td>{horse.nameOfVet}</td>
                                            <td>{horse.residenceOfVet}</td>
                                            <td>{horse.telephoneOfVet}</td>
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
                                            <td>{horse.preferredSubscription.name}</td>
                                            <td>{horse.stall.name}</td>
                                            <td>{<Button type="button" text="bekijk" note="hier komt toon file"/>}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            })}
                        </article>
                        <article id="yoursubscriptions" className="content-wrapper subscriptions">
                            <div className="content-title">
                                <h4>Uw abonnementen</h4>
                                <Button
                                    type="button"
                                    text="bereken totale prijs"
                                    note="hier wordt een helperfunctie getriggerd"
                                />
                            </div>
                            {enrollments.map((enrollment) => {
                                return <div key={enrollment.enrollmentId} className="subscriptiom-wrapper">
                                    <div className="head-line">
                                        <p className="horsename">Abonnementnummer: {enrollment.enrollmentId}</p>
                                        <Button
                                            type="button"
                                            text="wijzig"
                                            note="er is een annuleringsverzoek doorgestuurd"
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
                                            <td>{enrollment.subscription.name}</td>
                                            <td>{enrollment.horse.name}</td>
                                            <td>{enrollment.stall.name}</td>
                                            <td>{enrollment.stall.typeOfStall}</td>
                                            <td>{enrollment.subscription.typeOfCare}</td>
                                            <td>{enrollment.startDate}</td>
                                            <td>{enrollment.cancellationRequested}</td>
                                            <td>{enrollment.subscription.price}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            })}
                        </article>
                        <article>

                        </article>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile;