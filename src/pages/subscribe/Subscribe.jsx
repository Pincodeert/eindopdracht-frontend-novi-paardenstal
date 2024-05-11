import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import {averell} from "../../constants/testdata.js";
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
    const [submitCustomerSuccessId, setSubmitCustomerSuccessId] = useState(null);
    const [submitHorseSuccessId, setSubmitHorseSuccessId] = useState(null);


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
    function handleSubmitCustomer(e) {
        e.preventDefault();
        setError("");
        async function addNewCustomer() {
            setError("");
            try {
                console.log("dit gaan we zo posten naar de backend: ", customerFormState);
                const response = await axios.post("http://localhost:8080/customerprofiles", {
                    ...customerFormState
                });
                console.log(response);
                console.log(response.status);
                console.log("de klant is succesvol toegevoegd. de nieuwe id is: ", response.data);
                setSubmitCustomerSuccessId(response.data);

            } catch (error) {
                console.error(error);
                setError(error);
            }

        }

        addNewCustomer();
        console.log(customerFormState); //hier nog een userId (voor de inputDTO) aan toevoegen?
        console.log("de nieuwe klantId = ", submitCustomerSuccessId);
        //put request assignUserToCustomerProfile: axios.put("/customerprofiles/{customerId}/user")
    }

    // koppelt user aan klant
    async function assignUserToCustomer(submitCustomerSuccessId) {
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/customerprofiles/${submitCustomerSuccessId}/user`, {
                username: user.username,
            });
            console.log(response)
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    //maakt een nieuw paard aan
    function handleSubmitHorse(e) {
        e.preventDefault();

        async function addNewHorse() {
            setError("");
            try {
                const response = await axios.post("http://localhost:8080/horses", {
                    ...horseFormState,
                    preferredSubscription: subscription.name,
                });
                console.log(response);
                console.log(response.status);
                console.log("het paard is succesvol toegevoegd. de nieuwe id is: ", response.data);
                setSubmitHorseSuccessId(response.data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        console.log(submitHorseSuccessId);
        addNewHorse();
        //put request assignCustomerProfileToHorse axios.put("/horses/{horseId}/customerprofile")
    }

    //paard koppelen aan klant:
    async function assignHorseToCustomer() {
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/horses/${submitHorseSuccessId}/customerprofile`, {
                "id": {submitCustomerSuccessId}
            });
            console.log(response);
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
            const response = await axios.post(`http://localhost:8080/horses/4/passport`, formData, config);
            console.log("het bestand is geupload ");
            console.log(response);
        } catch (error) {
            console.error(error);
            setError(error);
        }

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
                        {Object.keys(subscription).length > 0 &&
                            <p className="intro-line">Fijn dat u het {subscription.name} wilt aflsuiten </p>}
                        <p className="italic">{generateSubscriptionDetails(subscription)}</p>
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
                                        labelFor="firstName-text-field"
                                        labelText="Voornaam:"
                                        inputId="firstName-text-field"
                                        inputName="firstName"
                                        textValue={customerFormState.firstName}
                                        changeHandler={handleCustomerChange}
                                        required={true}
                                    />
                                    <TextInput
                                        labelFor="lastName-text-field"
                                        labelText="Achternaam:"
                                        inputId="lastName-text-field"
                                        inputName="lastName"
                                        textValue={customerFormState.lastName}
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
                                        labelFor="postalCode-text-field"
                                        labelText="Postcode:"
                                        inputId="postalCode-text-field"
                                        inputName="postalCode"
                                        textValue={customerFormState.postalCode}
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
                                        labelText="IBAN:"
                                        inputId="bankAccount-text-field"
                                        inputName="bankAccountNumber"
                                        textValue={customerFormState.bankAccountNumber}
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
                                <Button
                                    type="button"
                                    disabled={false}
                                    handleClick={assignUserToCustomer}
                                >
                                    Volgende stap
                                </Button>
                            </SubscribeCard>

                            <SubscribeCard
                                subscribeCardTitle="Stap 3 - Vul de gegevens van uw paard in"
                            >
                                <form onSubmit={handleSubmitHorse}>
                                    <TextInput
                                        labelFor="horsename-text-field"
                                        labelText="Naam:"
                                        inputId="horsename-text-field"
                                        inputName="name"
                                        textValue={horseFormState.name}
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
                                        labelText="Dierenarts:"
                                        inputId="vet-text-field"
                                        inputName="nameOfVet"
                                        textValue={horseFormState.nameOfVet}
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
                                <Button
                                    type="button"
                                    disabled={false}
                                    handleClick={assignHorseToCustomer}
                                >
                                    Volgende stap
                                </Button>
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