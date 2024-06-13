import "./Profile.css"
import Button from "../../components/button/Button.jsx";
import initialsName from "../../helpers/editName.js";
import formatPrice from "../../helpers/formatPrice.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import calculateCustomersPrice from "../../helpers/calculateCustomersPrice.js";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import TextInput from "../../components/textInput/TextInput.jsx";
import {useForm} from "react-hook-form";
import Display from "../../components/display/Display.jsx";
import generateSubscriptionDetails from "../../helpers/generateSubscriptionDetails.js";
// import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";

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
    const [selectedHorseId, setSelectedHorseId] = useState(0);
    const [horse, setHorse] = useState(null
        // id: 0,
        // name: "",
        // horseNumber: "",
        // typeOfFeed: "hay",
        // typeOfBedding: "straw",
        // nameOfVet: "",
        // residenceOfVet: "",
        // telephoneOfVet: "",
        // passport: null,
    );
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [selectedPassport, setSelectedPassport] = useState(null);
    const [cancellationSuccess, toggleCancellationSuccess] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(0);
    const [customerUpdateSuccess, toggleCustomerUpdateSuccess] = useState(false);
    const [horseUpdateSuccess, toggleHorseUpdateSuccess] = useState(false);
    const [editingCancellation, toggleEditingCancellation] = useState(false);
    const [selectedEnrollement, setSelectedEnrollement] = useState(null);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {customerProfileId} = useParams();
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     // street: `${profile.street}`,
        //     // houseNumber: `${profile.houseNumber}`,
        //     // postalCode: `${profile.postalCode}`,
        //     // residence: `${profile.residence}`,
        //     // telephoneNumber: `${profile.telephoneNumber}`,
        //     // emailAddress: `${profile.emailAddress}`,
        //     // bankAccountNumber: `${profile.bankAccountNumber}`,
        // }
    });
    const {isAuth, signOut} = useContext(AuthContext);
    console.log(isAuth);
    console.log(customerProfileId);

    //// klantprofiel ophalen uit de backend by Id ////
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchCustomerProfile(customerProfileId) {
            setError("");

            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: abortController.signal,
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
        return function cleanUp() {
            abortController.abort();
        }
    }, [customerUpdateSuccess]);
    console.log("dit zijn de paarden: ")

    //paarden van desbetreffende klant ophalen uit backend
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchHorsesByCustomer() {
            setError("");
            try {
                const response = await axios.get(`http://localhost:8080/horses/customerprofile/${customerProfileId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        signal: abortController.signal,
                    }
                );
                console.log(response)
                const paarden = response.data;
                console.log("paarden per klant:", paarden);
                const gesorteerdePaarden = paarden.sort((paardA, paardB) => {
                    return paardA.id - paardB.id;
                });
                setHorses(gesorteerdePaarden);
                // setEnrollmentList(enrollments);
            } catch (error) {
                console.error(error);
                setError("uw paardgegevens kunnen niet worden opgehaald")
            }
        }

        void fetchHorsesByCustomer();
        return function cleanUp() {
            abortController.abort();
        }
    }, [horseUpdateSuccess]);


    //// inschrijvingen van klant ophalen (uit backend) //////
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchEnrollementsByCustomer(customerProfileId) {
            setError("");
            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}/enrollments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: abortController.signal,
                });
                const enrollments = response.data;
                console.log("dit zijn de abonnementen", enrollments);
                setEnrollmentList(enrollments);
            } catch (error) {
                console.error(error);
                setError("uw abonnementgegevens kunnen niet worden opgehaald")
            }
        }

        void fetchEnrollementsByCustomer(customerProfileId);
        return function cleanUp() {
            abortController.abort();
        }
    }, [cancellationSuccess]);


    function selectHorse(selectedHorseId) {
        const selectedHorse = horses.find((horse) => {
            return horse.id === selectedHorseId;
        });
        console.log(horses);
        console.log(selectedHorse);
        setHorse({
            ...horse,
            selectedHorse
        });
        return selectedHorse;
    }

//////// handle change //////////////////
//     function handleCustomerChange(e) {
//         const changedFieldName = e.target.name;
//
//         setCustomerFormState({
//             ...profile,
//             [changedFieldName]: e.target.value,
//         })
//         // setProfile({
//         //     ...profile,
//         //     [changedFieldName]: e.target.value,
//         // })
//     }

    // function handleHorseChange(e) {
    //     const changedFieldName = e.target.name;
    //
    //     setHorseFormState({
    //         ...horse,
    //         [changedFieldName]: e.target.value,
    //     })
    //     console.log(horseFormState);
    // }

//////// click handlers /////////////
// function handleCustomerForm(customerFormState) {
//         void updateCustomer();
//         console.log("uw gegevens zijn gewijzigd");
//
//     }

//     async function updateCustomer() {
    async function handleCustomerForm(customerFormState) {
        setError("");
        toggleCustomerUpdateSuccess(false);
        console.log("dit is de customerFormState: ", customerFormState);
        try {
            const response = await axios.patch(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                ...customerFormState,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("updaten van de klantgegevens is gelukt")
            console.log(response);
            toggleCustomerUpdateSuccess(true);
            toggleEnableCustomerChange(false);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    // function handleHorseForm(horseFormState) {
    //     selectHorse(selectedHorseId);
    //     void updateHorse();
    //     console.log("uw paard gegevens zijn gewijzigd");
    //     toggleEnabledHorseChange(false);
    // }

    // async function updateHorse() {
    async function handleHorseForm(horseFormState) {
        setError("");
        toggleHorseUpdateSuccess(false);
        // selectHorse(selectedHorseId);
        console.log("dit is de horseFormState", horseFormState);
        try {
            const response = await axios.patch(`http://localhost:8080/horses/${selectedHorse.id}`, {
                ...horseFormState,
                preferredSubscription: "activated",
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(`het updaten van paard id ${selectedHorse.id} is gelukt!`);
            console.log(response);
            console.log("uw paard gegevens zijn gewijzigd");
            toggleHorseUpdateSuccess(true);
            // toggleEnabledHorseChange(false);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function showCustomerForm() {
        toggleEnableCustomerChange(true);
    }

    function editHorseForm(horse) {
        setSelectedHorse(horse);
        toggleEnabledHorseChange(true);
    }

    // function showHorseForm(horse) {
    //     setSelectedHorseId(horse.id)
    //     toggleEnabledHorseChange(true);
    // }

    function showPassport(id) {
        console.log("de horseId die we gaan gebruiken is", id);
        const selectedHorse = selectHorse(id);
        // console.log("en als het goed is dan hier de horseState waarde", selectedHorse);
        console.log("dit is het geselecteerde paard", selectedHorse);

        async function fetchPassport() {
            try {
                const selectedPassport = await axios.get(selectedHorse.passport.url);
                console.log(selectedPassport);
                // const passportUrl = URL.createObjectURL(selectedPassport);
                // const passportUrl = URL.revokeObjectURL(selectedPassport);
                setSelectedPassport(selectedPassport);
                console.log("en zie je het paard nu?")
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        void fetchPassport();
    }

    console.log("dit is het profiel", profile);

    // console.log("dit is de formState", customerFormState);

    function setToDefault() {
        toggleEnabledHorseChange(false);
        toggleHorseUpdateSuccess(false);
        setSelectedHorse(null);
    }

    function setToCancellationDefault() {
        toggleCancellationSuccess(false);
        toggleEditingCancellation(false);
        setSelectedEnrollement(null);
    }

    function handleCancellationClick(enrollement) {
        toggleEditingCancellation(true);
        setSelectedEnrollement(enrollement);
    }

     async function handleCancellation(id){
        setError("");
        toggleCancellationSuccess(false);
        try {
            const response = await axios.patch(`http://localhost:8080/enrollments/${id}`);
            console.log(response);
            // setSelectedEnrollmentId(id);
            toggleCancellationSuccess(true);
        } catch (error) {
            console.error(error);
            setError(error);
        }
     }

    // function handleCancellationRequest(id) {
    //     toggleCancellationSuccess(false);
    //     console.log("uw annulering wordt binnen 3 werkdagen verwerkt van abonnementNr", id);
    //
    //     async function makeCancellationRequest() {
    //         setError("");
    //         try {
    //             const response = await axios.patch(`http://localhost:8080/enrollments/${id}`);
    //             console.log(response);
    //             setSelectedEnrollmentId(id);
    //             toggleCancellationSuccess(true);
    //         } catch (error) {
    //             console.error(error);
    //             setError(error)
    //         }
    //     }
    //
    //     void makeCancellationRequest();
    // }

    // console.log(`dit is de selectedHorseId: ${selectedHorseId} , dit is het geselecteerde paard ${horse} met de horseFormState: ${horseFormState} `);

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
                                    <h4>Wijzig de gewenste persoonsgegevens:</h4>}
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
                                    <form className="profile-form" onSubmit={handleSubmit(handleCustomerForm)}>
                                        <TextInput
                                            inputName="street"
                                            placeholder={profile.street}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: false,
                                                    // message: "Straat is verplicht"
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: "Straat moet minimaal 3 letters bevatten"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Straat mag maximaal 60 letters bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        />
                                        <TextInput
                                            inputName="houseNumber"
                                            placeholder={profile.houseNumber}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: false,
                                                    // message: "Huisnummer is verplicht"
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "Huisnummer moet uit minimaal 1 teken bestaan"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Huisnummer mag maximaal uit 20 tekens bestaan"
                                                }
                                            }}
                                            errors={errors}
                                        />
                                        <TextInput
                                            inputName="postalCode"
                                            placeholder={profile.postalCode}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: false,
                                                    // message: "Postcode is verplicht"
                                                },
                                                minLength: {
                                                    value: 4,
                                                    message: "Postcode moet minimaal 4 tekens bevatten"
                                                },
                                                maxLength: {
                                                    value: 6,
                                                    message: "Postcode mag maximaal 6 tekens bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        />
                                        <TextInput
                                            inputName="residence"
                                            placeholder={profile.residence}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: false,
                                                    // message: "Woonplaats is verplicht"
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Woonplaats moet minimaal 2 letters bevatten"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Woonplaats mag maximaal 60 letters bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        />
                                        <input
                                            type="tel"
                                            id="telephoneOfVet-field"
                                            // name="telephoneOfVet"
                                            pattern="[0-9]{10}"
                                            placeholder={profile.telephoneNumber}
                                            {...register("telephoneNumber", {
                                                required: {
                                                    value: false,
                                                    // message: 'telefoonnummer is verplicht',
                                                },
                                                minLength: {
                                                    value: 10,
                                                    message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                }
                                            })}
                                        />
                                        {errors.telephoneNumber &&
                                            <p className="form-error-login">{errors.telephoneNumber.message}</p>}
                                        <input
                                            type="email"
                                            placeholder={profile.emailAddress}
                                            {...register("emailAddress", {
                                                required: {
                                                    value: false,
                                                    // message: 'e-mailadres is verplicht',
                                                },
                                            })}
                                        />
                                        {errors.emailAddress &&
                                            <p className="form-error">{errors.emailAddress.message}</p>}

                                        <TextInput
                                            inputName="bankAccountNumber"
                                            placeholder={profile.bankAccountNumber}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: false,
                                                    message: "bank/IBAN-nummer is verplicht"
                                                },
                                                minLength: {
                                                    value: 16,
                                                    message: "De Iban moet uit 16 tekens bestaan"
                                                },
                                                maxLength: {
                                                    value: 16,
                                                    message: "De Iban moet uit 16 tekens bestaan"
                                                }
                                            }}
                                            errors={errors}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Verstuur
                                        </Button>
                                    </form>}
                            </div>
                        </article>
                        {!enabledHorseChange &&
                            <Display
                                className="content-wrapper horses"
                                title="Uw paarden"
                            >
                                {horses.length === 0 ?
                                    <p>U heeft nog geen paarden toegevoegd</p>
                                    :
                                    horses.map((horse) => {
                                        return <div key={horse.id} className="horse-wrapper">
                                            <div className="head-line">
                                                <p className="horsename">{horse.name} {horse.id}</p>
                                                {/*{enabledHorseChange && selectedHorseId === horse.id && <p>Wijzig hieronder de gegevens van {horse.name}</p>}*/}
                                                {horse.preferredSubscription != "activated" && <p>-In aanvraag-</p>}
                                                <Button
                                                    type="button"
                                                    disabled={horse.preferredSubscription != "activated"}
                                                    handleClick={() => editHorseForm(horse)}
                                                >
                                                    wijzig
                                                </Button>
                                            </div>
                                            {/*<div className="horse-info-container">*/}
                                            <table className="table">
                                                <thead>
                                                <tr className="table-head">
                                                    <th>paardnummer</th>
                                                    <th>type voeding</th>
                                                    <th>type bodembedekking</th>
                                                    <th>naam dierenarts</th>
                                                    <th>woonplaats dierenarts</th>
                                                    <th>telefoonnummer dierenarts</th>
                                                    <th>Stal</th>
                                                    <th>Paardenpaspoort</th>
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
                                                    {horse.stall ?
                                                        <td>{horse.stall.name} </td>
                                                        :
                                                        <td>- in aanvraag -</td>}
                                                    <td>{<Button type="button" disabled={false}
                                                                 handleClick={() => showPassport(horse.id)}>
                                                        bekijk </Button>}</td>
                                                    {console.log(horse.passport ? horse.passport.url : "nope")}
                                                    <td>{horse.passport &&
                                                        <img src={`${horse.passport.url}`} alt="paspoort"/>}</td>
                                                    {horse.passport &&
                                                        <td>{horse.passport.url}</td>}
                                                </tr>
                                                </tbody>}
                                            </table>
                                            {selectedPassport && <img src={selectedPassport} alt="paspoort"/>}
                                        </div>
                                    })}
                            </Display>}
                        {enabledHorseChange &&
                            <Display
                                className="content-wrapper horses"
                                title="Wijzig hier uw paardgegevens:"
                            >
                                <div className="horse-wrapper">
                                    <div className="head-line">
                                        <p className="horsename">{selectedHorse.name} {selectedHorse.id}</p>
                                        {/*{enabledHorseChange && selectedHorseId === horse.id && <p>Wijzig hieronder de gegevens van {horse.name}</p>}*/}
                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={() => toggleEnabledHorseChange(false)}
                                        >
                                            Annuleer
                                        </Button>
                                    </div>
                                    <div className="horse-info-container">
                                        <table className="table">
                                            <thead>
                                            <tr className="table-head">
                                                <th>paardnummer</th>
                                                <th>Stal</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="table-body">
                                                <td>{selectedHorse.horseNumber}</td>
                                                {selectedHorse.stall ?
                                                    <td>{selectedHorse.stall.name} </td>
                                                    :
                                                    <td>- in aanvraag -</td>}
                                            </tr>
                                            </tbody>
                                        </table>
                                        {!horseUpdateSuccess &&
                                            <form className="profile-form" onSubmit={handleSubmit(handleHorseForm)}>
                                                <label htmlFor="typeOfFeed-field">
                                                    Voeding:
                                                    <select
                                                        id="typeOfFeed-field"
                                                        {...register("typeOfFeed", {
                                                            required: {
                                                                value: false,
                                                                // message: "maak een keuze",
                                                            }
                                                        })}
                                                    >
                                                        <option value="hooi">hooi</option>
                                                        <option value="haver">haver</option>
                                                        <option value="vers gras">vers gras</option>
                                                    </select></label>
                                                {errors.typeOfFeed &&
                                                    <p className="form-error-login">{errors.typeOfFeed.message}</p>}
                                                <label htmlFor="typeOfBedding-field">
                                                    Bodembedekking:
                                                    <select
                                                        id="typeOfBedding-field"
                                                        {...register("typeOfBedding", {
                                                            required: {
                                                                value: false,
                                                                // message: "maak een keuze",
                                                            }
                                                        })}
                                                    >
                                                        <option value="stro">stro</option>
                                                        <option value="houtvezel">houtvezel</option>
                                                        <option value="houtvezel">vlas</option>
                                                    </select></label>
                                                {errors.typeOfBedding &&
                                                    <p className="form-error-login">{errors.typeOfBedding.message}</p>}
                                                <TextInput
                                                    labelFor="vet-text-field"
                                                    inputId="vet-text-field"
                                                    inputName="nameOfVet"
                                                    placeholder={selectedHorse.nameOfVet}
                                                    register={register}
                                                    validationRules={{
                                                        required: {
                                                            value: false,
                                                            // message: "Naam van dierenarts is verplicht"
                                                        },
                                                        minLength: {
                                                            value: 2,
                                                            message: "Naam moet minimaal 2 letters bevatten"
                                                        },
                                                        maxLength: {
                                                            value: 60,
                                                            message: "Naam mag maximaal 60 letters bevatten"
                                                        }
                                                    }}
                                                    errors={errors}
                                                >Naam dierenarts:</TextInput>
                                                <TextInput
                                                    labelFor="residenceOfVet-text-field"
                                                    inputId="residenceOfVet-text-field"
                                                    inputName="residenceOfVet"
                                                    placeholder={selectedHorse.residenceOfVet}
                                                    register={register}
                                                    validationRules={{
                                                        required: {
                                                            value: false,
                                                            // message: "Woonplaats van dierenarts is verplicht"
                                                        },
                                                        minLength: {
                                                            value: 2,
                                                            message: "Woonplaats moet minimaal 2 letters bevatten"
                                                        },
                                                        maxLength: {
                                                            value: 60,
                                                            message: "Woonplaats mag maximaal 60 letters bevatten"
                                                        }
                                                    }}
                                                    errors={errors}
                                                >Woonplaats dierenarts:</TextInput>
                                                <label htmlFor="telephoneOfVet-field">Telefoonnummer dierenarts:
                                                    <input
                                                        type="tel"
                                                        id="telephoneOfVet-field"
                                                        pattern="[0-9]{10}"
                                                        placeholder={selectedHorse.telephoneOfVet}
                                                        {...register("telephoneOfVet", {
                                                            required: {
                                                                value: false,
                                                                // message: 'telefoonnummer is verplicht',
                                                            },
                                                            minLength: {
                                                                value: 10,
                                                                message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                            },
                                                            maxLength: {
                                                                value: 10,
                                                                message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                            }
                                                        })}
                                                    /></label>
                                                {errors.telephoneOfVet &&
                                                    <p className="form-error-login">{errors.telephoneOfVet.message}</p>}
                                                <Button
                                                    type="submit"
                                                    // disabled={horse.preferredSubscription!="activated"}
                                                    disabled={false}
                                                >
                                                    Wijzig
                                                </Button>
                                            </form>}
                                        {horseUpdateSuccess && <div>
                                            <p className="success">De gegevens van uw paard {selectedHorse.name} zijn
                                                succesvol gewijzigd!</p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={setToDefault}
                                            >
                                                Terug naar overzicht
                                            </Button>
                                        </div>}
                                    </div>
                                </div>
                            </Display>}
                        {!editingCancellation &&
                        <Display
                            className="content-wrapper horses"
                            title="Uw abonnementen"
                        >
                            {enrollmentList.length === 0 ?
                                <p>U heeft nog geen abonnementen</p> : enrollmentList.map((enrollment) => {
                                    return <div key={enrollment.id} className="subscriptiom-wrapper">
                                        <div className="head-line">
                                            <p className="horsename">Abonnementnummer: {enrollment.id}</p>
                                            <Button
                                                type="button"
                                                disabled={enrollment.cancellationRequested}
                                                handleClick={() => handleCancellationClick(enrollment)}
                                            >
                                                {enrollment.cancellationRequested ? <p>annulering aangevraagd</p> :
                                                    <p>annuleer</p>}
                                            </Button>
                                        </div>
                                        {/*{cancellationSuccess && selectedEnrollmentId === enrollment.id &&*/}
                                        {/*    <p className="success-message">Uw verzoek tot annulering van abonnementnr*/}
                                        {/*        {enrollment.id} is ontvangen en wordt binnen 3 werkdagen verwerkt</p>}*/}
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
                                                {enrollment.subscription &&
                                                    <td>{enrollment.subscription.typeOfStall}</td>}
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
                        </Display>}
                        {editingCancellation &&
                            <Display
                                className="content-wrapper horses"
                                title="Annuleer het volgende abonnement:"
                            >
                                <div className="horse-wrapper">
                                    <div className="head-line">
                                        <p className="horsename">Abonnementnummer: {selectedEnrollement.id}</p>
                                        {/*{enabledHorseChange && selectedHorseId === horse.id && <p>Wijzig hieronder de gegevens van {horse.name}</p>}*/}
                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={() => toggleEditingCancellation(false)}
                                        >
                                            Ga terug
                                        </Button>
                                    </div>
                                    {!cancellationSuccess &&
                                    <div className="cancellation-container">
                                        <p>U staat op het punt om het volgende abonnement te annuleren voor uw
                                            paard {selectedEnrollement.horse.name} </p>
                                        <p>{selectedEnrollement.subscription.name} sinds {selectedEnrollement.startDate}</p>
                                        {selectedEnrollement.subscription &&
                                            <p className="italic">{generateSubscriptionDetails(selectedEnrollement.subscription)}</p>}
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={() => handleCancellation(selectedEnrollement.id)}
                                            >
                                                Bevestig annulering
                                            </Button>
                                    </div>}
                                        {cancellationSuccess && <div>
                                            <p className="success">Uw verzoek tot annulering van dit abonnement is
                                                succesvol verstuurd en wordt binnen 3 werkdagen door ons verwerkt.</p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={setToCancellationDefault}
                                            >
                                                Terug naar overzicht
                                            </Button>
                                        </div>}
                                    </div>
                            </Display>}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile;