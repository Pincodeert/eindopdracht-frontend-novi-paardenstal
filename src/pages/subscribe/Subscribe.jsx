import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import {averell} from "../../constants/testdata.js";
import "./Subscribe.css"
import {generateSubscriptionDetails} from "../../helpers/helpers.js";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";

function Subscribe() {
    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar
                        classname="header-navigation"
                    />
                    <HeaderContent/>
                </div>
            </header>
            <main>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <p className="intro-line">Fijn dat u het {averell.name} wilt aflsuiten </p>
                        <p className="italic">{generateSubscriptionDetails(averell)}</p>
                    </div>
                </section>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="profile-content-container">
                            <div className="step-wrapper">
                                <h4 className="italic">Stap 1 - Maak een account aan of login</h4>
                                <p>Om een abonnement te kunnen af sluiten, heeft u eerst een account nodig:</p>
                                <a href="/">maak hier een account aan</a>
                                <p>Heeft u al een account?</p>
                                <a href="/">log dan eerst hier in</a>
                            </div>
                            <div className="step-wrapper">
                                <h4 className="italic">Stap 2 - Vul uw persoonsgegevens in</h4>
                                <form action="/">
                                    <Input
                                        labelFor="firstname-text-field"
                                        inputType="text"
                                        inputId="firstname-text-field"
                                        inputName="firstname"
                                        labelText="Voornaam:"
                                    />
                                    <Input
                                        labelFor="lastname-text-field"
                                        inputType="text"
                                        inputId="lastname-text-field"
                                        inputName="lasstname"
                                        labelText="Achternaam:"
                                    />
                                    <Input
                                        labelFor="street-text-field"
                                        inputType="text"
                                        inputId="street-text-field"
                                        inputName="street"
                                        labelText="Straat:"
                                    />
                                    <Input
                                        labelFor="houseNumber-text-field"
                                        inputType="text"
                                        inputId="houseNumbername-text-field"
                                        inputName="houseNumber"
                                        labelText="Huisnummer:"
                                    />
                                    <Input
                                        labelFor="zipcode-text-field"
                                        inputType="text"
                                        inputId="zipcode-text-field"
                                        inputName="zipcode"
                                        labelText="Postcode:"
                                    />
                                    <Input
                                        labelFor="residence-text-field"
                                        inputType="text"
                                        inputId="residence-text-field"
                                        inputName="residence"
                                        labelText="Woonplaats"
                                    />
                                    <Input
                                        labelFor="email-text-field"
                                        inputType="email"
                                        inputId="email-text-field"
                                        inputName="email"
                                        labelText="E-mail:"
                                    />
                                    <Input
                                        labelFor="user-telephone-field"
                                        inputType="tel"
                                        inputId="user-telephone-field"
                                        inputName="telephoneNumber"
                                        pattern="[0-9]{10}"
                                        placeholder="0123456789"
                                        labelText="Telefoonnummer:"
                                    />
                                    <Input
                                        labelFor="bankAccount-text-field"
                                        inputType="text"
                                        inputId="bankAccount-text-field"
                                        inputName="bankAccount"
                                        labelText="IBAN:"
                                    />
                                    <Button
                                        type="submit"
                                        text="Sla op"
                                        note="hier komt een eventlistener"/>
                                </form>
                            </div>
                            <div className="step-wrapper">
                                <h4 className="italic">Stap 3 - Vul de gegevens van uw paard in</h4>
                                <form action="/">
                                    <div className="horizontal">
                                        <label htmlFor="horsename-text-field">Naam:</label>
                                        <input type="text" id="horsename-text-field" name="horsename"/>
                                    </div>
                                    <Input
                                        labelFor="horsename-text-field"
                                        inputType="text"
                                        inputId="horsename-text-field"
                                        inputName="horsename"
                                        labelText="Naam:"
                                    />
                                    <Input
                                        labelFor="horseNumber-text-field"
                                        inputType="text"
                                        inputId="horseNumber-text-field"
                                        inputName="horseNumber"
                                        labelText="Paardnummer:"
                                    />
                                    <label htmlFor="typeOfFeed-field">Voeding:</label>
                                    <select name="typeOfFeed" id="typeOfFeed-field">
                                        <option value="hay">hooi</option>
                                        <option value="oats">haver</option>
                                    </select>
                                    <label htmlFor="typeOfBedding-field">Voeding:</label>
                                    <select name="typeOfbedding" id="typeOfBedding-field">
                                        <option value="straw">stro</option>
                                        <option value="shavings">houtvezel</option>
                                    </select>
                                    <Input
                                        labelFor="vet-text-field"
                                        inputType="text"
                                        inputId="vet-text-field"
                                        inputName="vet"
                                        labelText="Dierenarts:"
                                    />
                                    <Input
                                        labelFor="residenceOfVet-text-field"
                                        inputType="text"
                                        inputId="residenceOfVet-text-field"
                                        inputName="residenceOfVet"
                                        labelText="Woonplaats dierenarts:"
                                    />
                                    <Input
                                        labelFor="telephoneofVet-text-field"
                                        inputType="tel"
                                        inputId="telephoneofVet-text-field"
                                        inputName="telephoneofVet"
                                        pattern="[0-9]{10}"
                                        placeholder="0123456789"
                                        labelText="Telnr dierenarts:"
                                    />
                                    <Input
                                        labelFor="subscription-hidden-field"
                                        inputType="hidden"
                                        inputId="subscription-hidden-field"
                                        inputName="preferredSubscription"
                                        labelText={averell.name}
                                    />
                                    <Button
                                        type="submit"
                                        text="Sla op"
                                        note="hier komt een eventlistener"/>
                                </form>
                            </div>
                            <div className="step-wrapper">
                                <h4 className="italic">Stap 4 - Voeg een kopie van het paardenpaspport van uw paard
                                    toe</h4>
                                <form action="/">
                                    <Input
                                        labelFor="file-upload-field"
                                        inputType="file"
                                        inputId="file-upload-field"
                                        inputName="file"
                                        labelText="Upload hier het paardenpaspoort:"
                                    />
                                    <input type="submit"/>

                                    <Button
                                        type="submit"
                                        text="Sla op"
                                        note="hier komt een eventlistener"/>
                                </form>
                            </div>
                            <div className="step-wrapper">
                                <h4 className="italic">Stap 5 - Ga akkoord en bevestig aanvraag</h4>
                                <form action="/">
                                    <div className="label-input-combi">

                                        <input className="checkbox" type="checkbox" id="terms-and-condtions-field" name="terms-and-condtions"
                                               value="agree"/>
                                        <label htmlFor="terms-and-condtions-field">
                                        Ik ga akkoord met de voorwaarden
                                        </label>
                                    </div>
                                    <input type="submit"/>

                                    <Button
                                        type="submit"
                                        text="Sla op"
                                        note="hier komt een eventlistener"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscribe;