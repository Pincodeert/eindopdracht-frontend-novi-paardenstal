import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import "./Subscribe.css"
import {generateSubscriptionDetails} from "../../helpers/helpers.js";
import TextInput from "../../components/textInput/TextInput.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function Subscribe() {
    const [subscription, setSubscription] = useState({});
    const [error, setError] = useState("");
    const [customerFormState, setCustomerFormState] = useState({
        firstName: "",
        lastName: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        residence: "",
        emailAddress: "",
        telephoneNumber: "",
        bankAccountNumber: "",
    });
    const [horseFormState, setHorseFormState] = useState({
        name: "",
        horseNumber: "",
        typeOfFeed: "hay",
        typeOfBedding: "straw",
        nameOfVet: "",
        residenceOfVet: "",
        telephoneOfVet: "",
    });
    const [file, setFile] = useState();
    const [termsFormState, toggleTermsFormState] = useState({
        termsAndConditions: false,
    });
    const [newlyCustomerId, setNewlyCustomerId] = useState(null);
    const [assignUserSuccess, toggleAssignUserSuccess] = useState(false);
    const [newlyHorseId, setNewlyHorseId] = useState(null);
    const [step, setStep] = useState("step1");

    const navigate = useNavigate();
    const {subscriptionId} = useParams();

    const {user} = useContext(AuthContext);

/////////// Handle Change /////////////////////
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

    function handlePassportChange(e) {
        setFile(e.target.files[0]);
    }

    function handleTermsChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        toggleTermsFormState({
            ...termsFormState,
            [changedFieldName]: newValue,
        });
    }

/////////////////////////////

    //// alle abonnement-typen ophalen ////
    useEffect(() => {
        async function fetchSubscription(subscriptionId) {
            setError("");

            try {
                const response = await axios.get(`http://localhost:8080/subscriptions/${subscriptionId}`);
                console.log(response.data);
                setSubscription(response.data);
            } catch (error) {
                console.error(error);
                setError("het ophalen van de abonnement is niet gelukt");
            }
        }

        void fetchSubscription(subscriptionId);
    }, []);

///////// Handle Submit ////////////
    async function handleSubmitCustomer(e) {
        e.preventDefault();
        setError("");

        try {
            console.log("dit gaan we zo posten naar de backend: ", customerFormState);
            const response = await axios.post("http://localhost:8080/customerprofiles", {
                ...customerFormState
            });
            console.log(response);
            console.log(response.status);
            console.log("de klant is succesvol toegevoegd. de nieuwe id is: ", response.data);
            setNewlyCustomerId(response.data);
            // setStep("step2");
        } catch (error) {
            console.error(error);
            setError(error);
        }
        console.log(customerFormState); //hier nog een userId (voor de inputDTO) aan toevoegen?
        console.log("de nieuwe klantId = ", newlyCustomerId);
    }

    // koppelt user aan klant
    async function assignUserToCustomer() {
        setError("");
        console.log("deze klantId gaan we nu koppelen: ", newlyCustomerId);
        try {
            const response = await axios.put(`http://localhost:8080/customerprofiles/${newlyCustomerId}/user`, {
                username: "freshprince",
            });
            toggleAssignUserSuccess(true); // hebben we dit eigenlijk wel nodig?
            console.log("koppelen is gelukt: ", response) // de data in de response=null omdat backendfunctie hierin niet voorziet
            setStep("step2");
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    //maakt een nieuw paard aan
    async function handleSubmitHorse(e) {
        e.preventDefault();
        setError("");
        console.log("dit paard gaan we zo opslaan: ", horseFormState);
        try {
            const response = await axios.post("http://localhost:8080/horses", {
                ...horseFormState,
                preferredSubscription: subscription.name,
            });
            console.log(response);
            console.log(response.status);
            console.log("het paard is succesvol toegevoegd. de nieuwe id is: ", response.data);
            setNewlyHorseId(response.data);
            setStep("step3")
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }
    console.log("de newlyHorseId is: ",newlyHorseId);

    //paard koppelen aan klant:
    async function assignHorseToCustomer() {
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/horses/${newlyHorseId}/customerprofile`, {
                "id": newlyCustomerId,
            });
            console.log(response);
            console.log("het is je gewoon gelukt!!!")
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    async function handleSubmitPassport(e) {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        // formData.append("passportName", passport.name);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        try {
            const response = await axios.post(`http://localhost:8080/horses/${newlyHorseId}/passport`, formData, config);
            console.log("het bestand is geupload ");
            console.log(response);
            setStep("step4");
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function handleSubmitTerms(e) {
        e.preventDefault();
        void assignHorseToCustomer();
        console.log("akkoord?: " + termsFormState.termsAndConditions);
        navigate(`/profiel/${newlyCustomerId}`);
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
                        {Object.keys(subscription).length > 0 &&
                            <p className="intro-line">Fijn dat u het {subscription.name} wilt aflsuiten </p>}
                        <p className="italic">{generateSubscriptionDetails(subscription)}</p>
                    </div>
                </section>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="profile-content-container">
                            {/*<SubscribeCard*/}
                            {/*    subscribeCardTitle="Stap 0 - Maak een account aan of login"*/}
                            {/*    subscribeStep="thisWillBeSkippedStep"*/}
                            {/*>*/}
                            {/*    <p>Om een abonnement te kunnen af sluiten, heeft u eerst een account nodig:</p>*/}
                            {/*    <Link to="/registreer">maak hier een account aan</Link>*/}
                            {/*    <p>Heeft u al een account?</p>*/}
                            {/*    <Link to="/login">log dan eerst hier in</Link>*/}
                            {/*</SubscribeCard>*/}
                            {/*/////////// stap 1 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step1" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 1 - Vul uw persoonsgegevens in"
                                    subscribeStep="step1"
                                >
                                    {!newlyCustomerId ? <form onSubmit={handleSubmitCustomer}>
                                        <TextInput
                                            labelFor="firstName-text-field"
                                            labelText="Voornaam:"
                                            inputId="firstName-text-field"
                                            inputName="firstName"
                                            textValue={customerFormState.firstName}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Voornaam:
                                        </TextInput>
                                        <TextInput
                                            labelFor="lastName-text-field"
                                            inputId="lastName-text-field"
                                            inputName="lastName"
                                            textValue={customerFormState.lastName}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Achternaam:
                                        </TextInput>
                                        <TextInput
                                            labelFor="street-text-field"
                                            inputId="street-text-field"
                                            inputName="street"
                                            textValue={customerFormState.street}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Straat:
                                        </TextInput>
                                        <TextInput
                                            labelFor="houseNumber-text-field"
                                            inputId="houseNumbername-text-field"
                                            inputName="houseNumber"
                                            textValue={customerFormState.houseNumber}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Huisnummer:
                                        </TextInput>
                                        <TextInput
                                            labelFor="postalCode-text-field"
                                            inputId="postalCode-text-field"
                                            inputName="postalCode"
                                            textValue={customerFormState.postalCode}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Postcode:
                                        </TextInput>
                                        <TextInput
                                            labelFor="residence-text-field"
                                            inputId="residence-text-field"
                                            inputName="residence"
                                            textValue={customerFormState.residence}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            Woonplaats:
                                        </TextInput>
                                        <label htmlFor="email-field">
                                            E-mail:
                                            <input
                                                type="email"
                                                id="email-field"
                                                name="emailAddress"
                                                value={customerFormState.emailAddress}
                                                onChange={handleCustomerChange}
                                                required={true}
                                            />
                                        </label>
                                        <label htmlFor="telephone-field">
                                            Telefoonnummer:
                                            <input
                                                type="tel"
                                                id="telephone-field"
                                                name="telephoneNumber"
                                                pattern="[0-9]{10}"
                                                placeholder="0123456789"
                                                value={customerFormState.telephoneNumber}
                                                onChange={handleCustomerChange}
                                                required={true}
                                            />
                                        </label>
                                        <TextInput
                                            labelFor="bankAccount-text-field"
                                            inputId="bankAccount-text-field"
                                            inputName="bankAccountNumber"
                                            textValue={customerFormState.bankAccountNumber}
                                            changeHandler={handleCustomerChange}
                                            required={true}
                                        >
                                            IBAN:
                                        </TextInput>
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Sla op
                                        </Button>
                                    </form>
                                    : <div>
                                    <p> Uw persoonsgevens zijn succesvol toegevoegd!</p>
                                    <Button
                                        type="button"
                                        disabled={false}
                                        handleClick={assignUserToCustomer}
                                    >
                                        Volgende stap
                                    </Button>
                                    </div>}
                                </SubscribeCard>}
{/*/////////// stap 2 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step2" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 2 - Vul de gegevens van uw paard in"
                                    subscribeStep="step2"
                                >
                                    <form onSubmit={handleSubmitHorse}>
                                        <TextInput
                                            labelFor="horsename-text-field"
                                            inputId="horsename-text-field"
                                            inputName="name"
                                            textValue={horseFormState.name}
                                            changeHandler={handleHorseChange}
                                            required={true}
                                        >
                                            Naam:
                                        </TextInput>
                                        <TextInput
                                            labelFor="horseNumber-text-field"
                                            inputId="horseNumber-text-field"
                                            inputName="horseNumber"
                                            textValue={horseFormState.horseNumber}
                                            changeHandler={handleHorseChange}
                                            required={true}
                                        >
                                            Paardnummer:
                                        </TextInput>
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
                                            name="typeOfBedding"
                                            id="typeOfBedding-field"
                                            value={horseFormState.typeOfBedding}
                                            onChange={handleHorseChange}
                                        >
                                            <option value="straw">stro</option>
                                            <option value="shavings">houtvezel</option>
                                        </select>
                                        <TextInput
                                            labelFor="vet-text-field"
                                            inputId="vet-text-field"
                                            inputName="nameOfVet"
                                            textValue={horseFormState.nameOfVet}
                                            changeHandler={handleHorseChange}
                                            required={true}
                                        >
                                            Dierenarts:
                                        </TextInput>
                                        <TextInput
                                            labelFor="residenceOfVet-text-field"
                                            inputId="residenceOfVet-text-field"
                                            inputName="residenceOfVet"
                                            textValue={horseFormState.residenceOfVet}
                                            changeHandler={handleHorseChange}
                                            required={true}
                                        >
                                            Woonplaats dierenarts:
                                        </TextInput>
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
                                        {Object.keys(subscription).length > 0 &&
                                            <label htmlFor="subscription-hidden-field">
                                                {subscription.name}
                                                <input
                                                    type="hidden"
                                                    id="subscription-hidden-field"
                                                    name="preferredSubscription"
                                                    value={subscription.name}
                                                />
                                            </label>}
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Sla op
                                        </Button>
                                    </form>
                                    {/*<Button*/}
                                    {/*    type="button"*/}
                                    {/*    disabled={false}*/}
                                    {/*    handleClick={assignHorseToCustomer}*/}
                                    {/*>*/}
                                    {/*    Volgende stap*/}
                                    {/*</Button>*/}
                                </SubscribeCard>}
                            {/*/////////// stap 3 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step3" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 3 - Voeg een kopie van het paardenpaspport van uw paard toe"
                                    subscribeStep="step3"
                                >
                                    <form onSubmit={handleSubmitPassport}>
                                        <label htmlFor="file-upload-field">
                                            Upload hier uw paardenpaspoort:
                                            <input
                                                type="file"
                                                id="file-upload-field"
                                                name="file"
                                                // value={}
                                                onChange={handlePassportChange}
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
                                </SubscribeCard>}
                            {/*/////////// stap 4 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step4" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 4 - Ga akkoord en bevestig aanvraag"
                                    subscribeStep="step4"
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
                                </SubscribeCard>}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscribe;