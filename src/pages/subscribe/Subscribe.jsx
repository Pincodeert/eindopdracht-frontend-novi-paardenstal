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
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Subscribe() {
    const navigate = useNavigate();
    const {subscriptionId} = useParams();

    const [susbscription, setSubscription] = useState({});
    const [error, setError] = useState("");

    const [customerFormState, setCustomerFormState] = useState({
        firstname: "",
        lastname: "",
        street: "",
        houseNumber: "",
        zipcode: "",
        residence: "",
        email: "",
        telephone: "",
        bankAccount: "",
    });

    const [horseFormState, setHorseFormState] = useState({
        horseName: "",
        horseNumber: "",
        typeOfFeed: "hay",
        typeOfbedding: "straw",
        vet: "",
        residenceOfVet: "",
        telephoneOfVet: "",
    });

    // const [termsAndConditionsValue, toggleTermsAndConditionsValue] = useState(false);
    // const [imageValue, setImageValue] = useState("");
    const [termsFormState, toggleTermsFormState] = useState({
        termsAndConditions: false,
    });

    //// alle abonnement-typen ophalen ////
    async function fetchSubscription(subscriptionId) {
        setError("");

        try {
            const response = await axios.get(`http://localhost:8080/subscriptions/${subscriptionId}`);
            console.log(response.data);
            setSubscription(response.data);
        } catch(error) {
            console.error(error);
            setError("het ophalen van de abonnement is niet gelukt");
        }
    }

    function handleCustomerChange(e) {
        const changedFieldName = e.target.name;

        setCustomerFormState({
            ...customerFormState,
            [changedFieldName]: e.target.value,
        })
    }

    function handleHorseChange(e) {
        const changedFieldName = e.target.name;

        setHorseFormState({
            ...horseFormState,
            [changedFieldName]: e.target.value,
        })
        console.log(horseFormState);
    }



    function handleTermsChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        toggleTermsFormState({
            ...termsFormState,
            [changedFieldName]: newValue,
        });
    }


    function handleSubmitCustomer(e) {
        e.preventDefault();
        console.log(customerFormState);
    }

    function handleSubmitHorse(e) {
        e.preventDefault();
        console.log(horseFormState, susbscription.name);
    }

    function handleSubmitPassport(e) {
        e.preventDefault();
        console.log("het bestand is geupload ");
    }

    function handleSubmitTerms(e) {
        e.preventDefault();
        console.log("akkoord?: " + termsFormState.termsAndConditions);
        navigate("/profiel/:klantId");
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
                        <p className="intro-line">Fijn dat u het {susbscription.name} wilt aflsuiten </p>
                        <p className="italic">{generateSubscriptionDetails(susbscription)}</p>
                        <button type="button" onClick={() => fetchSubscription(subscriptionId)}>haal het abonnement op</button>
                    </div>
                </section>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="profile-content-container">
                            <SubscribeCard
                                subscribeCardTitle="Stap 1 - Maak een account aan of login"
                            >
                                <p>Om een abonnement te kunnen af sluiten, heeft u eerst een account nodig:</p>
                                <Link to="/registreer">maak hier een account aan</Link>
                                <p>Heeft u al een account?</p>
                                <Link to="/login">log dan eerst hier in</Link>
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
                                        textValue={customerFormState.firstname}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="lastname-text-field"
                                        labelText="Achternaam:"
                                        inputId="lastname-text-field"
                                        inputName="lastname"
                                        textValue={customerFormState.lastname}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="street-text-field"
                                        labelText="Straat:"
                                        inputId="street-text-field"
                                        inputName="street"
                                        textValue={customerFormState.street}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="houseNumber-text-field"
                                        labelText="Huisnummer:"
                                        inputId="houseNumbername-text-field"
                                        inputName="houseNumber"
                                        textValue={customerFormState.houseNumber}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="zipcode-text-field"
                                        labelText="Postcode:"
                                        inputId="zipcode-text-field"
                                        inputName="zipcode"
                                        textValue={customerFormState.zipcode}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="residence-text-field"
                                        labelText="Woonplaats"
                                        inputId="residence-text-field"
                                        inputName="residence"
                                        textValue={customerFormState.residence}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <label htmlFor="email-field">
                                        E-mail:
                                        <input
                                            type="email"
                                            id="email-field"
                                            name="email"
                                            value={customerFormState.email}
                                            onChange={handleCustomerChange}
                                            required={true}
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
                                            value={customerFormState.telephone}
                                            onChange={handleCustomerChange}
                                            required={true}
                                        />
                                    </label>
                                    <TextInput
                                        labelFor="bankAccount-text-field"
                                        labelText="IBAN:"
                                        inputId="bankAccount-text-field"
                                        inputName="bankAccount"
                                        textValue={customerFormState.bankAccount}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={false}
                                    >
                                        Sla op
                                    </Button>
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
                                        inputName="horseName"
                                        textValue={horseFormState.horseName}
                                        changeHandler={handleHorseChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="horseNumber-text-field"
                                        labelText="Paardnummer:"
                                        inputId="horseNumber-text-field"
                                        inputName="horseNumber"
                                        textValue={horseFormState.horseNumber}
                                        changeHandler={handleHorseChange}
                                        required={true}
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
                                        textValue={horseFormState.vet}
                                        changeHandler={handleHorseChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="residenceOfVet-text-field"
                                        labelText="Woonplaats dierenarts:"
                                        inputId="residenceOfVet-text-field"
                                        inputName="residenceOfVet"
                                        textValue={horseFormState.residenceOfVet}
                                        changeHandler={handleHorseChange}
                                        required={true}
                                    />
                                    <label htmlFor="telephoneOfVet-field">
                                        Telnr dierenarts:
                                        <input
                                            type="tel"
                                            id="telephoneOfVet-field"
                                            name="telephoneOfVet"
                                            pattern="[0-9]{10}"
                                            placeholder="0123456789"
                                            value={horseFormState.telephoneOfVet}
                                            onChange={handleHorseChange}
                                            required={true}
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
                                        disabled={false}
                                    >
                                        Sla op
                                    </Button>
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
                                        disabled={false}
                                    >
                                        Sla op
                                    </Button>
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
                                            required={true}
                                        />
                                        <label htmlFor="terms-and-conditions-field">
                                            Ik ga akkoord met de voorwaarden
                                        </label>
                                    </div>
                                    {/*<input type="submit"/>*/}
                                    <Button
                                        type="submit"
                                        disabled={false}
                                    >
                                        Sla op
                                    </Button>
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