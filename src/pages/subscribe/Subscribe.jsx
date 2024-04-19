import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import {averell} from "../../constants/testdata.js";
import "./Subscribe.css"
import {generateSubscriptionDetails} from "../../helpers/helpers.js";
import TextInput from "../../components/textInput/TextInput.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";
import React, {useState} from "react";

function Subscribe() {

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [streetValue, setStreetValue] = useState("");
    const [houseNumberValue, setHouseNumberValue] = useState("");
    const [zipcodeValue, setZipcodeValue] = useState("");
    const [residenceValue, setResidenceValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [telephoneValue, setTelephoneValue] = useState("");
    const [bankAccountValue, setbankAccountValue] = useState("");
    const [horseNameValue, setHorseNameValue] = useState("");
    const [horseNumberValue, setHorseNumberValue] = useState("");
    // const [typeOfFeedValue, setTypeOfFeedValue] = useState("");
    // const [typeOfBeddingValue, SetTypeOfBeddingValue] = useState("");
    const [vetNameValue, setVetNameValue] = useState("");
    const [vetResidenceValue, setVetResidenceValue] = useState("");
    const [vetTelephoneValue, setVetTelephoneValue] = useState("");
    const [termsAndConditionsValue, toggleTermsAndConditionsValue] = useState(false);
    // const [imageValue, setImageValue] = useState("");

    const [customerFormState, setCustomerFormState] = useState({
        // firstname: "",
        email: "",
        telephone: "",
    });

    function handleCustomerChange(e) {
        const changedFieldName = e.target.name;

        setCustomerFormState({
            ...customerFormState,
            [changedFieldName]: e.target.value,
        })
        console.log(customerFormState);
    }

    const [horseFormState, setHorseFormState] = useState({
        typeOfFeed: "hay",
        typeOfbedding: "straw",
        telephoneOfVet: "",
    });

    function handleHorseChange(e) {
        const changedFieldName = e.target.name;

        setHorseFormState({
            ...horseFormState,
            [changedFieldName]: e.target.value,
        })
        console.log(horseFormState);
    }

    const [termsFormState, setTermsFormState] = useState({
        termsAndConditions: false,
    });

    function handleTermsChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setTermsFormState({
            ...termsFormState,
            [changedFieldName]: newValue,
        });
    }


    function handleSubmitCustomer(e) {
        e.preventDefault();
        console.log(firstNameValue, lastNameValue, streetValue, houseNumberValue, zipcodeValue, residenceValue, emailValue,
            telephoneValue, customerFormState ,bankAccountValue);
    }

    function handleSubmitHorse(e) {
        e.preventDefault();
        console.log(horseNameValue, horseNumberValue, vetNameValue, vetResidenceValue, vetTelephoneValue, horseFormState);
    }

    function handleSubmitPassport(e) {
        e.preventDefault();
        console.log("het bestand is geupload ");
    }

    function handleSubmitTerms(e) {
        e.preventDefault();
        console.log("akkoord?: " + termsFormState.termsAndConditions);
    }

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
                            <SubscribeCard
                                subscribeCardTitle="Stap 1 - Maak een account aan of login"
                            >
                                <p>Om een abonnement te kunnen af sluiten, heeft u eerst een account nodig:</p>
                                <a href="/">maak hier een account aan</a>
                                <p>Heeft u al een account?</p>
                                <a href="/">log dan eerst hier in</a>
                            </SubscribeCard>

                            <SubscribeCard
                                subscribeCardTitle="Stap 2 - Vul uw persoonsgegevens in"
                            >
                                <form onSubmit={handleSubmitCustomer}>
                                    <TextInput
                                        labelFor="firstname-text-field"
                                        labelText="Voornaam:"
                                        inputId="firstname-text-field"
                                        inputName="firstname"
                                        textValue={firstNameValue}
                                        setTextValue={setFirstNameValue}
                                        // textValue={customerFormState.firstname}
                                        // setTextValue={handleChange}
                                    />
                                    <TextInput
                                        labelFor="lastname-text-field"
                                        labelText="Achternaam:"
                                        inputId="lastname-text-field"
                                        inputName="lasstname"
                                        textValue={lastNameValue}
                                        setTextValue={setLastNameValue}
                                    />
                                    <TextInput
                                        labelFor="street-text-field"
                                        labelText="Straat:"
                                        inputId="street-text-field"
                                        inputName="street"
                                        textValue={streetValue}
                                        setTextValue={setStreetValue}
                                    />
                                    <TextInput
                                        labelFor="houseNumber-text-field"
                                        labelText="Huisnummer:"
                                        inputId="houseNumbername-text-field"
                                        inputName="houseNumber"
                                        textValue={houseNumberValue}
                                        setTextValue={setHouseNumberValue}
                                    />
                                    <TextInput
                                        labelFor="zipcode-text-field"
                                        labelText="Postcode:"
                                        inputId="zipcode-text-field"
                                        inputName="zipcode"
                                        textValue={zipcodeValue}
                                        setTextValue={setZipcodeValue}
                                    />
                                    <TextInput
                                        labelFor="residence-text-field"
                                        labelText="Woonplaats"
                                        inputId="residence-text-field"
                                        inputName="residence"
                                        textValue={residenceValue}
                                        setTextValue={setResidenceValue}
                                    />
                                    <label htmlFor="email-field">
                                        E-mail:
                                        <input
                                            type="email"
                                            id="email-field"
                                            name="email"
                                            // value={emailValue}
                                            // onChange={(e) => setEmailValue(e.target.value)}
                                            value={customerFormState.email}
                                            onChange={handleCustomerChange}
                                        />
                                    </label>
                                    <label htmlFor="telephone-field">
                                        Telefoonnummer:
                                        <input
                                            type="tel"
                                            id="telephone-field"
                                            name="telephone"
                                            pattern="[0-9]{10}"
                                            placeholder="0123456789"
                                            // value={telephoneValue}
                                            // onChange={(e) => setTelephoneValue(e.target.value)}
                                            value={customerFormState.telephone}
                                            onChange={handleCustomerChange}
                                        />
                                    </label>
                                    <TextInput
                                        labelFor="bankAccount-text-field"
                                        labelText="IBAN:"
                                        inputId="bankAccount-text-field"
                                        inputName="bankAccount"
                                        textValue={bankAccountValue}
                                        setTextValue={setbankAccountValue}
                                    />
                                    <Button
                                        type="submit"
                                        text="Sla op"
                                    />
                                </form>
                            </SubscribeCard>

                            <SubscribeCard
                                subscribeCardTitle="Stap 3 - Vul de gegevens van uw paard in"
                            >
                                <form onSubmit={handleSubmitHorse}>
                                    <TextInput
                                        labelFor="horsename-text-field"
                                        labelText="Naam:"
                                        inputId="horsename-text-field"
                                        inputName="horsename"
                                        textValue={horseNameValue}
                                        setTextValue={setHorseNameValue}
                                    />
                                    <TextInput
                                        labelFor="horseNumber-text-field"
                                        labelText="Paardnummer:"
                                        inputId="horseNumber-text-field"
                                        inputName="horseNumber"
                                        textValue={horseNumberValue}
                                        setTextValue={setHorseNumberValue}
                                    />
                                    <label htmlFor="typeOfFeed-field">
                                        Voeding:</label>
                                        <select
                                            name="typeOfFeed"
                                            id="typeOfFeed-field"
                                            value={horseFormState.typeOfFeed}
                                            onChange={handleHorseChange}
                                        >
                                            <option value="hay">hooi</option>
                                            <option value="oats">haver</option>
                                        </select>

                                    <label htmlFor="typeOfBedding-field">
                                        Bodembedekking:</label>
                                        <select
                                            name="typeOfbedding"
                                            id="typeOfBedding-field"
                                            value={horseFormState.typeOfbedding}
                                            onChange={handleHorseChange}
                                        >
                                            <option value="straw">stro</option>
                                            <option value="shavings">houtvezel</option>
                                        </select>

                                    <TextInput
                                        labelFor="vet-text-field"
                                        labelText="Dierenarts:"
                                        inputId="vet-text-field"
                                        inputName="vet"
                                        textValue={vetNameValue}
                                        setTextValue={setVetNameValue}
                                    />
                                    <TextInput
                                        labelFor="residenceOfVet-text-field"
                                        labelText="Woonplaats dierenarts:"
                                        inputId="residenceOfVet-text-field"
                                        inputName="residenceOfVet"
                                        textValue={vetResidenceValue}
                                        setTextValue={setVetResidenceValue}
                                    />
                                    <label htmlFor="telephoneOfVet-field">
                                        Telnr dierenarts:
                                        <input
                                            type="tel"
                                            id="telephoneOfVet-field"
                                            name="telephoneOfVet"
                                            pattern="[0-9]{10}"
                                            placeholder="0123456789"
                                            // value={vetTelephoneValue}
                                            // onChange={(e) => setVetTelephoneValue(e.target.value)}
                                            value={horseFormState.telephoneOfVet}
                                            onChange={handleHorseChange}
                                        />
                                    </label>
                                    <label htmlFor="subscription-hidden-field">
                                        {averell.name}
                                        <input
                                            type="hidden"
                                            id="subscription-hidden-field"
                                            name="preferredSubscription"
                                            value={averell.name}
                                        />
                                    </label>
                                    <Button
                                        type="submit"
                                        text="Sla op"
                                    />
                                </form>
                            </SubscribeCard>

                            <SubscribeCard
                                subscribeCardTitle="Stap 4 - Voeg een kopie van het paardenpaspport van uw paard toe"
                            >
                                <form onSubmit={handleSubmitPassport}>
                                    <label htmlFor="file-upload-field">
                                        Upload hier uw paardenpaspoort:
                                        <input
                                            type="file"
                                            id="file-upload-field"
                                            name="file"
                                        />
                                    </label>
                                    <input type="submit"/>

                                    <Button
                                        type="submit"
                                        text="Sla op"
                                    />
                                </form>
                            </SubscribeCard>

                            <SubscribeCard
                                subscribeCardTitle="Stap 5 - Ga akkoord en bevestig aanvraag"
                            >
                                <form onSubmit={handleSubmitTerms}>
                                    <div className="label-input-combi">

                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            id="terms-and-conditions-field"
                                            name="termsAndConditions"
                                            // checked={termsAndConditionsValue}
                                            // onChange={() => toggleTermsAndConditionsValue(!termsAndConditionsValue)}
                                            checked={termsFormState.termsAndConditions}
                                            onChange={handleTermsChange}
                                        />
                                        <label htmlFor="terms-and-conditions-field">
                                            Ik ga akkoord met de voorwaarden
                                        </label>
                                    </div>
                                    {/*<input type="submit"/>*/}
                                    <Button
                                        type="submit"
                                        text="Sla op"
                                    />
                                </form>
                            </SubscribeCard>

                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscribe;