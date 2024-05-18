import "./Profile.css"
import Button from "../../components/button/Button.jsx";
// import axl, {enrollments} from "../../constants/testdata.js";
import initialsName, {formatPrice} from "../../helpers/helpers.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import calculateCustomersPrice from "../../helpers/calculateCustomersPrice.js";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import TextInput from "../../components/textInput/TextInput.jsx";
import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";

// import {i} from "vite/dist/node/types.d-FdqQ54oU.js";

function Profile() {
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [horseList, setHorseList] = useState([]);
    const [horses, setHorses] = useState([]);
    // const [enrollmentList, setEnrollmentList] = useState([]);
    const [enrollmentList, setEnrollmentList] = useState([]);
    const [stall, setStall] = useState({});
    const [enableCustomerChange, toggleEnableCustomerChange] = useState(false);
    const [enabledHorseChange, toggleEnabledHorseChange] = useState(false);
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
    const [selectedHorseId, setSelectedHorseId] = useState(0);
    const [horse, setHorse] = useState({
        id: 0,
        name: "",
        horseNumber: "",
        typeOfFeed: "hay",
        typeOfBedding: "straw",
        nameOfVet: "",
        residenceOfVet: "",
        telephoneOfVet: "",
    });

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {customerProfileId} = useParams();
    console.log(customerProfileId);
    const {isAuth, signOut} = useContext(AuthContext);
    console.log(isAuth);

    //// klantprofiel ophalen uit de backend by Id ////
    useEffect(() => {
        async function fetchCustomerProfile(customerProfileId) {
            setError("");

            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                const customer = response.data;
                console.log(customer);
                setProfile(customer);
                // setHorseList([
                //     customer.horses
                // ]);
                // setEnrollmentList([
                //     customer.enrollments,
                // ]);

            } catch (error) {
                console.error(error);
                setError("Uw klantgegevens kunnen niet worden opgehaald")
            }
        }

        void fetchCustomerProfile(customerProfileId);
    }, []);
    console.log("dit zijn de paarden: ")

    //paarden van desbetreffende klant ophalen uit backend
    useEffect(() => {
        async function fetchHorsesByCustomer() {
            setError("");
            try {
                const response = await axios.get("http://localhost:8080/horses/customerprofile/5",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log(response)
                const paarden = response.data;
                console.log("paarden per klant:", paarden);
                setHorses(paarden);
                // setEnrollmentList(enrollments);
            } catch (error) {
                console.error(error);
                setError("uw paardgegevens kunnen niet worden opgehaald")
            }
        }
        void fetchHorsesByCustomer();
    }, []);



    //// inschrijvingen van klant ophalen (uit backend) //////
    useEffect(() => {

        async function fetchEnrollementsByCustomer(customerProfileId) {
            setError("");
            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}/enrollments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                const enrollments = response.data;
                console.log("dit zijn de abonnementen",enrollments);
                setEnrollmentList(enrollments);
            } catch (error) {
                console.error(error);
                setError("uw abonnementgegevens kunnen niet worden opgehaald")
            }
        }

        void fetchEnrollementsByCustomer(customerProfileId)
    }, []);



    function selectHorse(selectedHorseId) {
        const selectedHorse = horses.find((horse) => {
            return horse.id === selectedHorseId;
        });
        console.log(horses);
        console.log(selectedHorse);
        setHorse(selectedHorse);
    }

//////// handle change //////////////////
    function handleCustomerChange(e) {
        const changedFieldName = e.target.name;

        setCustomerFormState({
            ...profile,
            [changedFieldName]: e.target.value,
        })
        // setProfile({
        //     ...profile,
        //     [changedFieldName]: e.target.value,
        // })
    }

    function handleHorseChange(e) {
        const changedFieldName = e.target.name;

        setHorseFormState({
            ...horse,
            [changedFieldName]: e.target.value,
        })
        console.log(horseFormState);
    }

//////// click handlers /////////////
    async function updateCustomer() {
        setError("");

        try {
            const response = await axios.patch(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                ...customerFormState
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("updaten van de klantgegevens is gelukt")
            console.log(response);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    async function updateHorse() {
        setError("");

        try {
            const response = await axios.patch(`http://localhost:8080/horses/${selectedHorseId}`, {
                ...horseFormState,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(`het updaten van paard id ${selectedHorseId} is gelukt!`);
            console.log(response);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function showCustomerForm() {
        toggleEnableCustomerChange(true);
    }

    function showHorseForm(id) {
        setSelectedHorseId(id)
        toggleEnabledHorseChange(true);
    }

    function handleCustomerForm(e) {
        e.preventDefault();
        void updateCustomer();
        console.log("uw gegevens zijn gewijzigd");
        toggleEnableCustomerChange(false);


    }

    console.log("dit is het profiel", profile);
    console.log("dit is de formState", customerFormState);

    function handleHorseForm(e) {
        e.preventDefault();
        selectHorse(selectedHorseId);
        void updateHorse();
        console.log("uw paard gegevens zijn gewijzigd");
        toggleEnabledHorseChange(false);
    }

    function handleEnrollementForm(e) {
        e.preventDefault();
        console.log("uw annulering wordt binnen 3 werkdagen verwerkt");
    }


    console.log(`dit is de selectedHorseId: ${selectedHorseId} , dit is het geselecteerde paard ${horse} met de horseFormState: ${horseFormState} `);

    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            {isAuth && <Button
                                type="button"
                                handleClick={signOut}
                            >
                                uitloggen
                            </Button>}
                            <div
                                className="profile-icon">{Object.keys(profile).length > 0 ? initialsName(profile.firstName, profile.lastName) :
                                <span>???</span>}</div>
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
                            disabled={false}
                            handleClick={() => navigate("/abonnementen")}
                        >
                            Vraag nieuw abonnement aan
                        </Button>
                        <Button
                            type="button"
                            disabled={false}
                            handleClick={calculateCustomersPrice}
                        >
                            bereken uw totale abonnementskosten
                        </Button>
                    </nav>
                    <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            {Object.keys(profile).length > 0 && <h3>Welkom {profile.firstName} {profile.lastName}</h3>}
                            {Object.keys(profile).length > 0 && <p>klantnummer: 20240{profile.id} </p>}
                        </div>
                        <article id="yourpersonalia" className="content-wrapper persona">
                            <div className="content-title">
                                {!enableCustomerChange ? <h4>Uw gegevens</h4> :
                                    <h4>Vul de persoonsgegevens die u wilt wijzigen hieronder in</h4>}
                                {!enableCustomerChange ? <Button
                                    type="button"
                                    disabled={false}
                                    handleClick={showCustomerForm}
                                >
                                    wijzig uw gegevens
                                </Button> : <Button
                                    type="button"
                                    disabled={false}
                                    handleClick={() => toggleEnableCustomerChange(false)}
                                >
                                    Annuleer
                                </Button>}
                            </div>
                            <div className="table-form-container">
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
                                    {!enableCustomerChange && <tbody>
                                    <tr className="table-body">
                                        <td>{profile.street}</td>
                                        <td>{profile.houseNumber}</td>
                                        <td>{profile.postalCode}</td>
                                        <td>{profile.residence}</td>
                                        <td>{profile.telephoneNumber}</td>
                                        <td>{profile.emailAddress}</td>
                                        <td>{profile.bankAccountNumber}</td>
                                    </tr>
                                    </tbody>}
                                </table>
                                {enableCustomerChange &&
                                    <form className="profile-form" onSubmit={handleCustomerForm}>
                                        <TextInput
                                            inputName="street"
                                            textValue={customerFormState.street}
                                            placeholder={profile.street}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        <TextInput
                                            inputName="houseNumber"
                                            textValue={customerFormState.houseNumber}
                                            placeholder={profile.houseNumber}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        <TextInput
                                            inputName="postalCode"
                                            textValue={customerFormState.postalCode}
                                            placeholder={profile.postalCode}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        <TextInput
                                            inputName="residence"
                                            textValue={customerFormState.residence}
                                            placeholder={profile.residence}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        <TextInput
                                            inputName="telephoneNumber"
                                            textValue={customerFormState.telephoneNumber}
                                            placeholder={profile.telephoneNumber}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        <TextInput
                                            inputName="bankAccountNumber"
                                            textValue={customerFormState.bankAccountNumber}
                                            placeholder={profile.bankAccountNumber}
                                            changeHandler={handleCustomerChange}
                                            required={false}
                                        />
                                        {/*<input type="text" placeholder={profile.street}/>*/}
                                        {/*<input type="text" placeholder={profile.houseNumber}/>*/}
                                        {/*<input type="text" placeholder={profile.postalCode}/>*/}
                                        {/*<input type="text" placeholder={profile.residence}/>*/}
                                        {/*<input type="text" placeholder={profile.telephoneNumber}/>*/}
                                        {/*<input type="text" placeholder={profile.emailAddress}/>*/}
                                        {/*<input type="text" placeholder={profile.bankAccountNumber}/>*/}
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Verstuur
                                        </Button>
                                    </form>}

                            </div>

                        </article>


                        <article id="yourhorses" className="content-wrapper horses">
                            <div className="content-title">
                                <h4>Uw paarden</h4>
                                {/*<button type="button" onClick={() => getHorses(profile.id)}></button>*/}
                            </div>
                            {horses.length === 0 ?
                                <p>U heeft nog geen paarden toegevoegd</p> : horses.map((horse) => {
                                    return <div key={horse.id} className="horse-wrapper">
                                        <div className="head-line">
                                            <p className="horsename">{horse.name}, {horse.id}</p>
                                            {/*{enabledHorseChange && selectedHorseId === horse.id && <p>Wijzig hieronder de gegevens van {horse.name}</p>}*/}
                                            {!enabledHorseChange && <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={() => showHorseForm(horse.id)}
                                            >
                                                wijzig
                                            </Button>}
                                            {enabledHorseChange && selectedHorseId === horse.id && <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={() => toggleEnabledHorseChange(false)}
                                            >
                                                Annuleer
                                            </Button>}
                                        </div>
                                        <div className="horse-info-container">
                                            <table className="table">
                                                <thead>
                                                <tr className="table-head">
                                                    <th>paardnummer</th>
                                                    <th>type voeding</th>
                                                    <th>type bodembedekking</th>
                                                    <th>naam dierenarts</th>
                                                    <th>woonplaats dierenarts</th>
                                                    <th>telefoonnummer dierenarts</th>
                                                </tr>
                                                </thead>
                                                {!enabledHorseChange && <tbody>
                                                <tr className="table-body">
                                                    <td>{horse.horseNumber}</td>
                                                    <td>{horse.typeOfFeed}</td>
                                                    <td>{horse.typeOfBedding}</td>
                                                    <td>{horse.nameOfVet}</td>
                                                    <td>{horse.residenceOfVet}</td>
                                                    <td>{horse.telephoneOfVet}</td>
                                                </tr>
                                                </tbody>}
                                            </table>
                                            {enabledHorseChange && selectedHorseId === horse.id &&
                                                <form className="profile-form" onSubmit={handleHorseForm}>
                                                    <p>{horse.horseNumber}</p>
                                                    {/*<label htmlFor="typeOfFeed-field">*/}
                                                    {/*    Voeding:</label>*/}
                                                    <select
                                                        name="typeOfFeed"
                                                        id="typeOfFeed-field"
                                                        value={horseFormState.typeOfFeed}
                                                        onChange={handleHorseChange}
                                                    >
                                                        <option value="hay">hooi</option>
                                                        <option value="oats">haver</option>
                                                    </select>
                                                    {/*<label htmlFor="typeOfBedding-field">*/}
                                                    {/*    Bodembedekking:</label>*/}
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
                                                        // labelFor="vet-text-field"
                                                        // inputId="vet-text-field"
                                                        inputName="nameOfVet"
                                                        textValue={horseFormState.nameOfVet}
                                                        placeholder={horse.nameOfVet}
                                                        changeHandler={handleHorseChange}
                                                        required={false}
                                                    />
                                                    {/*    Dierenarts:*/}
                                                    {/*</TextInput>*/}
                                                    <TextInput
                                                        // labelFor="residenceOfVet-text-field"
                                                        // inputId="residenceOfVet-text-field"
                                                        inputName="residenceOfVet"
                                                        textValue={horseFormState.residenceOfVet}
                                                        placeholder={horse.residenceOfVet}
                                                        changeHandler={handleHorseChange}
                                                        required={false}
                                                    />
                                                    {/*    Woonplaats dierenarts:*/}
                                                    {/*</TextInput>*/}
                                                    {/*<label htmlFor="telephoneOfVet-field">*/}
                                                    {/*    Telnr dierenarts:*/}
                                                    <input
                                                        type="tel"
                                                        id="telephoneOfVet-field"
                                                        name="telephoneOfVet"
                                                        pattern="[0-9]{10}"
                                                        placeholder={horse.telephoneOfVet}
                                                        value={horseFormState.telephoneOfVet}
                                                        onChange={handleHorseChange}
                                                        required={false}
                                                    />
                                                    {/*</label>*/}
                                                    <Button
                                                        type="submit"
                                                        disabled={false}
                                                    >
                                                        Wijzig
                                                    </Button>
                                                </form>}
                                        </div>
                                        <table className="table">
                                            <thead>
                                            <tr className="table-head">
                                                {/*<th>Abonnement</th>*/}
                                                <th>Stal</th>
                                                <th>Paardenpaspoort</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="table-body">
                                                {/*<td>{horse.preferredSubscription}</td>*/}
                                                {horse.stall ? <td>{horse.stall.name} </td> : <td>- in aanvraag -</td>}
                                                <td>{<Button type="button" disabled={false} note="hier komt toon file">
                                                    bekijk </Button>}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                })}
                        </article>
                        <article className="content-wrapper subscriptions">
                            <div className="content-title">
                                <h4>Uw abonnementen</h4>
                                <Button
                                    type="button"
                                    disabled={false}
                                    note="hier wordt een helperfunctie getriggerd"
                                >
                                    bereken totale prijs
                                </Button>
                            </div>
                            {enrollmentList.length === 0 ?
                                <p>U heeft nog geen abonnementen</p> : enrollmentList.map((enrollment) => {
                                    return <div key={enrollment.id} className="subscriptiom-wrapper">
                                        <div className="head-line">
                                            <p className="horsename">Abonnementnummer: {enrollment.id}</p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                note="er is een annuleringsverzoek doorgestuurd"
                                            >
                                                wijzig
                                            </Button>
                                        </div>
                                        <table className="table">
                                            <thead>
                                            <tr className="table-head">
                                                <th>abonnement type</th>
                                                {/*<th>stalnaam</th>*/}
                                                <th>type stal</th>
                                                <th>type verzorging</th>
                                                <th>paard</th>
                                                <th>start-datum</th>
                                                <th>annulering aangevraagd</th>
                                                <th>prijs</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="table-body">
                                                {enrollment.subscription && <td>{enrollment.subscription.name}</td>}
                                                {/*{stall.name && <td>{stall.name} </td>}*/}
                                                {enrollment.subscription && <td>{enrollment.subscription.typeOfStall}</td>}
                                                {enrollment.subscription &&
                                                    <td>{enrollment.subscription.typeOfCare}</td>}
                                                {enrollment.horse && <td>{enrollment.horse.name}</td>}
                                                {enrollment.startDate && <td>{enrollment.startDate}</td>}
                                                {enrollment.cancellationRequested ? <td>ja</td> : <td>nee</td>}
                                                {enrollment.subscription &&
                                                    <td>{formatPrice(enrollment.subscription.price)}</td>}
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