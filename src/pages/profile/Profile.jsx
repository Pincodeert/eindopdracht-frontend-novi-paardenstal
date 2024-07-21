import styles from "./Profile.module.css";
import Button from "../../components/button/Button.jsx";
import initialsName, {displayCompleteName} from "../../helpers/editName.js";
import formatPrice from "../../helpers/formatPrice.js";
import {useNavigate, useParams} from "react-router-dom";
import calculateCustomersPrice from "../../helpers/calculateCustomersPrice.js";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import TextInput from "../../components/textInput/TextInput.jsx";
import {useForm} from "react-hook-form";
import Display from "../../components/display/Display.jsx";
import generateSubscriptionDetails from "../../helpers/generateSubscriptionDetails.js";
import Table from "../../components/table/Table.jsx";
import generateFetchErrorString, {generateSaveErrorString} from "../../helpers/generate ErrorString.js";
import NavBar from "../../components/navBar/NavBar.jsx";
import {
    horseFormTableHead,
    profileEnrollmentTableHead,
    profileHorseTableHead,
    profilePersonaTableHead
} from "../../constants/tableContent.js";
import reverseDate from "../../helpers/reverseDate.js";

function Profile() {
    const [error, setError] = useState("");
    const [customerError, setCustomerError] = useState("");
    const [horsesError, setHorsesError] = useState("");
    const [enrollmentsError, setEnrollmentsError] = useState("");
    const [customerUpdateError, setCustomerUpdateError] = useState("");
    const [horseUpdateError, setHorseUpdateError] = useState("");
    const [passportError, setPassportError] = useState("");
    const [profile, setProfile] = useState({});
    const [horses, setHorses] = useState([]);
    const [enrollmentList, setEnrollmentList] = useState([]);
    const [enableCustomerChange, toggleEnableCustomerChange] = useState(false);
    const [enabledHorseChange, toggleEnabledHorseChange] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [selectedPassport, setSelectedPassport] = useState(null);
    const [cancellationSuccess, toggleCancellationSuccess] = useState(false);
    const [isLoading, toggleIsLoading] = useState(false);
    const [customerUpdateSuccess, toggleCustomerUpdateSuccess] = useState(false);
    const [horseUpdateSuccess, toggleHorseUpdateSuccess] = useState(false);
    const [editingCancellation, toggleEditingCancellation] = useState(false);
    const [selectedEnrollement, setSelectedEnrollement] = useState(null);
    const [passportDownloadSuccess, togglePassportDownloadSuccess] = useState(false);
    const [totalPrice, setTotalPrice] = useState(null);
    const [showingTotalPrice, toggleShowingTotalPrice] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {customerProfileId} = useParams();
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onBlur",
    });

    const {isAuth, signOut} = useContext(AuthContext);

    //// klantprofiel ophalen uit de backend by Id ////
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchCustomerProfile(customerProfileId) {
            setError("");
            toggleIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: abortController.signal,
                });
                const customer = response.data;
                setProfile(customer);
            } catch (error) {
                console.error(error);
                setCustomerError(generateFetchErrorString("klantgegegevens"));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchCustomerProfile(customerProfileId);
        return function cleanUp() {
            abortController.abort();
        }
    }, [customerUpdateSuccess]);

    //paarden van desbetreffende klant ophalen uit backend
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchHorsesByCustomer() {
            setError("");
            toggleIsLoading(true);
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
                const horseList = response.data;
                const sortedHorseList = horseList.sort((horseA, horseB) => {
                    return horseA.id - horseB.id;
                });
                setHorses(sortedHorseList);
            } catch (error) {
                console.error(error);
                setHorsesError(generateFetchErrorString("paardgegevens"));
            } finally {
                toggleIsLoading(false);
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
            toggleIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}/enrollments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: abortController.signal,
                });
                const enrollments = response.data;
                setEnrollmentList(enrollments);
            } catch (error) {
                console.error(error);
                setEnrollmentsError(generateFetchErrorString("abonnementgegevens"));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchEnrollementsByCustomer(customerProfileId);
        return function cleanUp() {
            abortController.abort();
        }
    }, [cancellationSuccess]);


//     async function updateCustomer() {
    async function handleCustomerForm(customerFormState) {
        setError("");
        toggleIsLoading(true);
        toggleCustomerUpdateSuccess(false);
        try {
            const response = await axios.patch(`http://localhost:8080/customerprofiles/${customerProfileId}`, {
                ...customerFormState,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            toggleCustomerUpdateSuccess(true);
            toggleEnableCustomerChange(false);
        } catch (error) {
            console.error(error);
            setCustomerUpdateError(generateSaveErrorString("persoonsgegevens"));
        } finally {
            toggleIsLoading(false);
        }
    }

    useEffect(() => {
        if (selectedHorse) {
            let defaultValues = {
                telephoneOfVet: selectedHorse.telephoneOfVet,
            };
            reset({...defaultValues});
        }
    }, [horseUpdateSuccess, enabledHorseChange]);


    // async function updateHorse() {
    async function handleHorseForm(horseFormState) {
        setError("");
        toggleHorseUpdateSuccess(false);
        toggleIsLoading(true);
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
            toggleHorseUpdateSuccess(true);
        } catch (error) {
            console.error(error);
            setHorseUpdateError(generateSaveErrorString("paardgegevens"));
        } finally {
            toggleIsLoading(false);
            // reset({...defaultValues})
        }
    }

    function showCustomerForm() {
        toggleEnableCustomerChange(true);
    }

    function editHorseForm(horse) {
        setSelectedHorse(horse);
        toggleEnabledHorseChange(true);
    }

    function showPassport(horse) {
        setSelectedHorse(horse);

        async function fetchPassport() {
            setError("");
            toggleIsLoading(true);
            try {
                const selectedPassport = await axios.get(horse.passport.url);
                setSelectedPassport(selectedPassport);
                togglePassportDownloadSuccess(true);
            } catch (error) {
                console.error(error);
                setPassportError(generateFetchErrorString("paardenpaspoort"));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchPassport();
    }

    function hidePassport() {
        togglePassportDownloadSuccess(false);
        setSelectedHorse({});
    }

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

    async function handleCancellation(id) {
        setError("");
        toggleIsLoading(true);
        toggleCancellationSuccess(false);
        try {
            const response = await axios.patch(`http://localhost:8080/enrollments/${id}`);
            console.log(response);
            toggleCancellationSuccess(true);
        } catch (error) {
            console.error(error);
            setError(generateSaveErrorString("annuleringsverzoek"));
        } finally {
            toggleIsLoading(false);
        }
    }

    function handleTotalPriceClick(enrollmentList) {
        toggleShowingTotalPrice(!showingTotalPrice);
        const result = calculateCustomersPrice(enrollmentList);
        setTotalPrice(result);
    }

    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <NavBar>
                            <div className="nav-portal">
                                {isAuth && <Button
                                    type="button"
                                    handleClick={signOut}
                                >
                                    uitloggen
                                </Button>}
                                <div
                                    className="profile-icon">{Object.keys(profile).length > 0 ? initialsName(profile.firstName, profile.lastName) :
                                    <span>???</span>}</div>
                            </div>
                        </NavBar>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2 className={styles["profile-menu"]}>Menu</h2>
                        <Button
                            type="button"
                            disabled={enableCustomerChange}
                            handleClick={showCustomerForm}
                        >
                            Wijzig uw persoonsgegevens
                        </Button>
                        <Button
                            type="button"
                            disabled={false}
                            handleClick={() => navigate("/abonnementen")}
                        >
                            Vraag een abonnement aan
                        </Button>
                        <Button
                            type="button"
                            disabled={false}
                            handleClick={() => handleTotalPriceClick(enrollmentList)}
                        >
                            Bereken uw totale abonnementskosten
                        </Button>
                        {showingTotalPrice &&
                            <Display
                                title="Totale kosten:"
                                className="price"
                            >
                                <p className={styles["price-display"]}>{formatPrice(totalPrice)}</p>

                                <Button
                                    type="button"
                                    handleClick={() => toggleShowingTotalPrice(!showingTotalPrice)}
                                >
                                    klap in
                                </Button>
                            </Display>}
                    </nav>
                    <div className="content-container">
                        {Object.keys(profile).length > 0 &&
                            <div className="intro-content-wrapper">
                                <h3>Welkom {displayCompleteName(profile.firstName, profile.lastName)}</h3>
                                <p>klantnummer: 20240{profile.id}</p>
                            </div>}
                        {!enableCustomerChange &&
                            <Display
                                className="persona"
                                title="Uw gegevens"
                            >
                                {isLoading && <p>...Loading</p>}
                                {customerError ? <p className="error">{customerError}</p> :
                                    <div className={styles["table-form-container"]}>
                                        <Table
                                            className="default-table"
                                            tableHeadClassName="default-table-head"
                                            tableHeadArray={profilePersonaTableHead}
                                        >
                                            <tbody>
                                            <tr className="table-body">
                                                {profile.street && <td>{profile.street}</td>}
                                                {profile.houseNumber && <td>{profile.houseNumber}</td>}
                                                {profile.postalCode && <td>{profile.postalCode}</td>}
                                                {profile.residence && <td>{profile.residence}</td>}
                                                {profile.telephoneNumber && <td>{profile.telephoneNumber}</td>}
                                                {profile.emailAddress && <td>{profile.emailAddress}</td>}
                                                {profile.bankAccountNumber && <td>{profile.bankAccountNumber}</td>}
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>}
                            </Display>}
                        {enableCustomerChange &&
                            <Display
                                className="persona"
                                title="Wijzig de gewenste persoonsgegevens:"
                            >
                                <div className={styles["table-form-container"]}>
                                    <Table
                                        className="default-table"
                                        tableHeadClassName="default-table-head"
                                        tableHeadArray={profilePersonaTableHead}
                                    />
                                    <form className={styles["profile-form"]}
                                          onSubmit={handleSubmit(handleCustomerForm)}>
                                        {isLoading &&
                                            <p>...Loading</p>}
                                        <TextInput
                                            inputName="street"
                                            // labelClassName="persona-form"
                                            register={register}
                                            textValue={profile.street}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Straat is verplicht"
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
                                            register={register}
                                            textValue={profile.houseNumber}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Huisnummer is verplicht"
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
                                            register={register}
                                            textValue={profile.postalCode}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Postcode is verplicht"
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
                                            textValue={profile.residence}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Woonplaats is verplicht"
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
                                            pattern="[0-9]{10}"
                                            defaultValue={profile.telephoneNumber}
                                            {...register("telephoneNumber", {
                                                required: {
                                                    value: true,
                                                    message: 'telefoonnummer is verplicht',
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
                                            defaultValue={profile.emailAddress}
                                            {...register("emailAddress", {
                                                required: {
                                                    value: true,
                                                    message: 'e-mailadres is verplicht',
                                                },
                                            })}
                                        />
                                        {errors.emailAddress &&
                                            <p className="form-error-login">{errors.emailAddress.message}</p>}

                                        <TextInput
                                            inputName="bankAccountNumber"
                                            textValue={profile.bankAccountNumber}
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
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
                                            classname="profile-form-button"
                                            disabled={false}
                                        >
                                            Verstuur
                                        </Button>
                                        {customerUpdateError && <p className="error">{customerUpdateError}</p>}
                                    </form>
                                    <Button
                                        type="button"
                                        disabled={false}
                                        handleClick={() => toggleEnableCustomerChange(false)}
                                    >
                                        Annuleer
                                    </Button>
                                </div>
                            </Display>}
                        {!enabledHorseChange &&
                            <Display
                                className="horses"
                                title="Uw paarden"
                            >
                                {isLoading && <p>...Loading</p>}
                                {horsesError && <p className="error">{horsesError}</p>}
                                {!horsesError && horses.length === 0 ?
                                    <p>U heeft nog geen paarden toegevoegd</p>
                                    :
                                    horses.map((horse) => {
                                        return <div key={horse.id} className={styles["horse-wrapper"]}>
                                            <div className={styles["head-line"]}>
                                                <p className={styles.horsename}>{horse.name} {horse.id}</p>
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
                                            <div className="horse-info-container">
                                                <Table
                                                    className="default-table"
                                                    tableHeadClassName="default-table-head"
                                                    tableHeadArray={profileHorseTableHead}
                                                >
                                                    {!enabledHorseChange &&
                                                        <tbody>
                                                        <tr className="table-body">
                                                            {horse.horseNumber && <td>{horse.horseNumber}</td>}
                                                            {horse.typeOfFeed && <td>{horse.typeOfFeed}</td>}
                                                            {horse.typeOfBedding && <td>{horse.typeOfBedding}</td>}
                                                            {horse.nameOfVet && <td>{horse.nameOfVet}</td>}
                                                            {horse.residenceOfVet && <td>{horse.residenceOfVet}</td>}
                                                            {horse.telephoneOfVet && <td>{horse.telephoneOfVet}</td>}
                                                            {horse.stall ?
                                                                <td>{horse.stall.name} </td>
                                                                :
                                                                <td>- in aanvraag -</td>}
                                                            {!passportDownloadSuccess &&
                                                                <td>{<Button type="button" disabled={false}
                                                                             handleClick={() => showPassport(horse)}>
                                                                    bekijk </Button>}</td>}
                                                            {passportDownloadSuccess && horse.id === selectedHorse.id &&
                                                                <td>{<Button type="button" disabled={false}
                                                                             handleClick={hidePassport}>
                                                                    Verberg</Button>}</td>}
                                                            <td>{horse.passport && passportDownloadSuccess && horse.id === selectedHorse.id &&
                                                                <div className={styles["passport-image"]}><img
                                                                    src={`${horse.passport.url}`}
                                                                    alt="paardenpaspoort"/></div>}</td>
                                                        </tr>
                                                        </tbody>}
                                                </Table>
                                            </div>
                                            {isLoading && <p>...isLoading</p>}
                                            {passportError && <p className="error">{passportError}</p>}
                                        </div>
                                    })}
                            </Display>}
                        {enabledHorseChange &&
                            <Display
                                className="horses"
                                title="Wijzig hier uw paardgegevens:"
                            >
                                <div className={styles["horse-wrapper"]}>
                                    <div className={styles["head-line"]}>
                                        {isLoading && <p>...Loading</p>}
                                        <p className={styles.horsename}>{selectedHorse.name} {selectedHorse.id}</p>
                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={() => toggleEnabledHorseChange(false)}
                                        >
                                            Annuleer
                                        </Button>
                                    </div>
                                    <div className="horse-info-container">
                                        <Table
                                            className="default-table"
                                            tableHeadClassName="default-table-head"
                                            tableHeadArray={horseFormTableHead}
                                        >
                                            <tbody>
                                            <tr className="table-body">
                                                <td>{selectedHorse.horseNumber}</td>
                                                {selectedHorse.stall ?
                                                    <td>{selectedHorse.stall.name} </td>
                                                    :
                                                    <td>- in aanvraag -</td>}
                                            </tr>
                                            </tbody>
                                        </Table>
                                        {!horseUpdateSuccess &&
                                            <form className={styles["profile-form"]}
                                                  onSubmit={handleSubmit(handleHorseForm)} key={selectedHorse.id}>
                                                <label htmlFor="typeOfFeed-field">
                                                    Voeding:
                                                    <select
                                                        id="typeOfFeed-field"
                                                        defaultValue={selectedHorse.typeOfFeed}
                                                        {...register("typeOfFeed", {
                                                            required: {
                                                                value: true,
                                                                message: "maak een keuze",
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
                                                        defaultValue={selectedHorse.typeOfBedding}
                                                        {...register("typeOfBedding", {
                                                            required: {
                                                                value: true,
                                                                message: "maak een keuze",
                                                            }
                                                        })}
                                                    >
                                                        <option value="stro">stro</option>
                                                        <option value="houtvezel">houtvezel</option>
                                                        <option value="vlas">vlas</option>
                                                    </select></label>
                                                {errors.typeOfBedding &&
                                                    <p className="form-error-login">{errors.typeOfBedding.message}</p>}
                                                <TextInput
                                                    labelFor="vet-text-field"
                                                    inputId="vet-text-field"
                                                    inputName="nameOfVet"
                                                    textValue={selectedHorse.nameOfVet}
                                                    register={register}
                                                    validationRules={{
                                                        required: {
                                                            value: true,
                                                            message: "Naam van dierenarts is verplicht"
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
                                                    textValue={selectedHorse.residenceOfVet}
                                                    register={register}
                                                    validationRules={{
                                                        required: {
                                                            value: true,
                                                            message: "Woonplaats van dierenarts is verplicht"
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
                                                        defaultValue={selectedHorse.telephoneOfVet}
                                                        {...register("telephoneOfVet", {
                                                            required: {
                                                                value: true,
                                                                message: 'telefoonnummer is verplicht',
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
                                                <div className={styles["horse-edit-button-wrapper"]}>
                                                    <Button
                                                        type="submit"
                                                        classname="profile-form-button"
                                                        // disabled={horse.preferredSubscription!="activated"}
                                                        disabled={false}
                                                    >
                                                        Wijzig
                                                    </Button>
                                                </div>
                                                {horseUpdateError && <p className="error">{horseUpdateError}</p>}
                                            </form>}
                                        {horseUpdateSuccess && <div>
                                            <p className={styles.success}>De gegevens van uw
                                                paard {selectedHorse.name} zijn
                                                succesvol gewijzigd!</p>
                                            <div className={styles["horse-edit-button-wrapper"]}>
                                                <Button
                                                    type="button"
                                                    disabled={false}
                                                    handleClick={setToDefault}
                                                >
                                                    Terug naar overzicht
                                                </Button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </Display>}
                        {!editingCancellation &&
                            <Display
                                className="horses"
                                title="Uw abonnementen"
                            >
                                {isLoading && <p>...Loading</p>}
                                {enrollmentsError && <p className="error">{enrollmentsError}</p>}
                                {!enrollmentsError && enrollmentList.length === 0 ?
                                    <p>U heeft nog geen geactiveerde
                                        abonnementen</p> : enrollmentList.map((enrollment) => {
                                        return <div key={enrollment.id} className="subscriptiom-wrapper">
                                            <div className={styles["head-line"]}>
                                                <p className={styles.horsename}>Abonnementnummer: {enrollment.id}</p>
                                                <Button
                                                    type="button"
                                                    disabled={enrollment.cancellationRequested}
                                                    handleClick={() => handleCancellationClick(enrollment)}
                                                >
                                                    {enrollment.cancellationRequested ? <p>annulering aangevraagd</p> :
                                                        <p>annuleer</p>}
                                                </Button>
                                            </div>
                                            <Table
                                                className="default-table"
                                                tableHeadClassName="default-table-head"
                                                tableHeadArray={profileEnrollmentTableHead}
                                            >
                                                <tbody>
                                                <tr className="table-body">
                                                    {enrollment.subscription && <td>{enrollment.subscription.name}</td>}
                                                    {/*{stall.name && <td>{stall.name} </td>}*/}
                                                    {enrollment.subscription &&
                                                        <td>{enrollment.subscription.typeOfStall}</td>}
                                                    {enrollment.subscription &&
                                                        <td>{enrollment.subscription.typeOfCare}</td>}
                                                    {enrollment.horse && <td>{enrollment.horse.name}</td>}
                                                    {enrollment.startDate &&
                                                        <td>{reverseDate(enrollment.startDate)}</td>}
                                                    {enrollment.cancellationRequested ? <td>ja</td> : <td>nee</td>}
                                                    {enrollment.subscription &&
                                                        <td>{formatPrice(enrollment.subscription.price)}</td>}
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    })}
                            </Display>}
                        {editingCancellation &&
                            <Display
                                className="horses"
                                title="Annuleer het volgende abonnement:"
                            >
                                <div className={styles["horse-wrapper"]}>
                                    <div className={styles["head-line"]}>
                                        <p className={styles["horsename"]}>Abonnementnummer: {selectedEnrollement.id}</p>
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
                                        <div className={styles["cancellation-container"]}>
                                            {isLoading && <p>...Loading</p>}
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
                                            {error && <p className="error">{error}</p>}
                                        </div>}
                                    {cancellationSuccess && <div>
                                        <p className={styles.success}>Uw verzoek tot annulering van dit abonnement is
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