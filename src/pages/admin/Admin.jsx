import styles from './Admin.module.css';
import Button from "../../components/button/Button.jsx";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Display from "../../components/display/Display.jsx";
import Table from "../../components/table/Table.jsx";
import formatPrice from "../../helpers/formatPrice.js";
import {displayCompleteName} from "../../helpers/editName.js";
import reverseDate from "../../helpers/reverseDate.js";
import {generateAdminErrorString} from "../../helpers/generate ErrorString.js";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import {
    adminCustomerTableHead, adminEnrollmentTableHead, adminHorseTableHead,
    cancellationFormTableHead,
    cancellationTableHead,
    newHorseFormTableHead,
    newHorseTableHead, stallTableHead, subscriptionTableHead
} from "../../constants/tableContent.js";

function Admin() {

    const [error, setError] = useState("");
    const [newHorsesError, setNewHorsesError] = useState("");
    const [fetchStallError, setFetchStallError] = useState("");
    const [cancellationRequestError, setCancellationRequestError] = useState("");
    const [isLoading, toggleIsLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [editingNewEnrollment, toggleEditingNewEnrollment] = useState(false);
    const [horses, setHorses] = useState([]);
    const [newHorses, setNewHorses] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [horseInfo, setHorseInfo] = useState({});
    const [availableStalls, setAvailableStalls] = useState([]);
    // const [chosenStall, setChosenStall] = useState({});
    const [stalls, setStalls] = useState([]);
    const [horseAssignedSuccess, toggleHorseAssignedSuccess] = useState(false);
    const [enrollmentInfo, setEnrollmentInfo] = useState({});
    const [enrollmentCreatedSuccess, toggleEnrollmentCreatedSuccess] = useState(false);
    const [cancellationRequests, setCancellationRequests] = useState([]);
    const [cancellationInfo, setCancellationInfo] = useState(null);
    const [editingCancellation, toggleEditingCancellation] = useState(false);
    const [horseRemovedSuccess, toggleHorseRemovedSuccess] = useState(false);
    const [enrollmentTerminatedSuccess, toggleEnrollmentTerminatedSuccess] = useState(false);
    const [enrollments, setEnrollments] = useState([]);
    const [display, setDisplay] = useState("default");

    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onBlur"});
    const token = localStorage.getItem('token');
    const {isAuth, user, signOut} = useContext(AuthContext);

    useEffect(() => {
        // const abortController = new AbortController();
        async function fetchHorses() {
            toggleIsLoading(true);
            setNewHorsesError("");
            try {
                const response = await axios.get("http://localhost:8080/horses", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // signal: abortController.signal,
                });
                const fetchedHorses = response.data
                setHorses(fetchedHorses);
                const newHorses = fetchedHorses.filter((horse) => {
                    // return horse.stall === null && horse.preferredSubscription != "activated";
                    return horse.preferredSubscription != "activated";
                });
                setNewHorses(newHorses);
            } catch (error) {
                console.error(error);
                setNewHorsesError(generateAdminErrorString("het ophalen van de paarden", error.message));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchHorses();
        // return function cleanUp() {
        //     abortController.abort();
        // }
    }, [editingNewEnrollment]);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchCancellationRequests() {
            toggleIsLoading(true);
            setCancellationRequestError("");
            try {
                const response = await axios.get("http://localhost:8080/enrollments", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        cancellationRequested: true,
                    },
                    signal: abortController.signal,
                });
                setCancellationRequests(response.data);
            } catch (error) {
                console.error(error);
                setCancellationRequestError(generateAdminErrorString("het ophalen van de annuleringsverzoeken", error.message));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchCancellationRequests();
        return function cleanUp() {
            abortController.abort();
        }
    }, [editingCancellation]);

    useEffect(() => {
        // const abortController = new AbortController();
        async function fetchAllSubscriptions() {
            toggleIsLoading(true);
            setError("");
            try {
                const response = await axios.get("http://localhost:8080/subscriptions", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // signal: abortController.signal,
                });
                // console.log("alle abonnementtypen: ", response.data);
                setSubscriptions(response.data);
            } catch (error) {
                console.error(error);
                setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchAllSubscriptions();
        // return function cleanup() {
        //     abortController.abort();
        // }
    }, []);


    async function fetchCustomers() {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:8080/customerprofiles", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    function showCustomers() {
        void fetchCustomers();
        setDisplay("customers");
    }

    function showHorses() {
        // void fetchHorses();
        setDisplay("horses");
    }

/////////////////// Nieuwe aanvragen ///////////////////////

    function selectSubscription(horse) {
        const selectedSubscription = subscriptions.find((subscription) => {
            return horse.preferredSubscription === subscription.name;
        });
        return selectedSubscription;
    }

    async function fetchAvailableStallsByType(stallType) {
        toggleIsLoading(true);
        setFetchStallError("");
        try {
            const response = await axios.get(`http://localhost:8080/stalls`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        type: `${stallType}`,
                        isOccupied: false,
                    }
                }
            );
            setAvailableStalls(response.data);
        } catch (error) {
            console.error(error);
            setFetchStallError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }


    function handleNewHorseClick(horse) {
        const selectedSubscription = selectSubscription(horse);

        setHorseInfo({
            id: horse.id,
            name: horse.name,
            owner: horse.owner,
            preferredSubscription: horse.preferredSubscription,
            subscriptionId: selectedSubscription.id,
            typeOfStall: selectedSubscription.typeOfStall,
            typeOfFeed: horse.typeOfFeed,
            typeOfBedding: horse.typeOfBedding,
        })
        const stalls = fetchAvailableStallsByType(selectedSubscription.typeOfStall)
        setAvailableStalls(stalls);
        toggleEditingNewEnrollment(true);
    }

    async function assignHorseToStall(data) {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/stalls/${data.typeOfStall}/horse`, {
                id: horseInfo.id,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setEnrollmentInfo({
                subscriptionId: horseInfo.subscriptionId,
                customerId: horseInfo.owner.id,
                horseId: horseInfo.id,
            });
            toggleHorseAssignedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    async function createNewEnrollment() {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/enrollments", {
                ...enrollmentInfo
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            // setEnrollmentInfo({})
            toggleEnrollmentCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    function setToNewHorsesDefault() {
        toggleEditingNewEnrollment(false);
        toggleHorseAssignedSuccess(false);
        setEnrollmentInfo(null);
        toggleEnrollmentCreatedSuccess(false);
    }

////////////////////// Annuleringen ///////////////////
    function handleCancellationClick(enrollment) {
        const selectedHorse = horses.find((horse) => {
            return horse.id === enrollment.horse.id;
        });
        const stall = selectedHorse.stall;

        setCancellationInfo({
            horseName: selectedHorse.name,
            horseId: selectedHorse.id,
            stallName: stall.name,
            stallId: stall.id,
            stallType: stall.type,
            enrollmentId: enrollment.id,
            startDate: enrollment.startDate,
            subscriptionName: enrollment.subscription.name,
            subscriptionId: enrollment.subscription.id,
            customerFirstname: selectedHorse.owner.firstName,
            customerLastname: selectedHorse.owner.lastName,
            customerId: selectedHorse.owner.id,
        });
        toggleEditingCancellation(true);
    }

    async function removeHorseFromStall(stallId) {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/stalls/${stallId}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            toggleHorseRemovedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    async function terminateEnrollment(enrollmentId) {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/enrollments/${enrollmentId}`, {
                "isOngoing": true,
                "subscriptionId": cancellationInfo.subscriptionId,
                "customerId": cancellationInfo.customerId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            toggleEnrollmentTerminatedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    function setToCancellationDefault() {
        toggleEditingCancellation(false);
        toggleHorseRemovedSuccess(false);
        toggleEnrollmentTerminatedSuccess(false);
        setCancellationInfo(null);
    }

    async function fetchAllStalls() {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:8080/stalls", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setStalls(response.data);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    function showStalls() {
        void fetchAllStalls();
        setDisplay("stalls");
    }

////////////////////////////////////////// INSCHRIJVINGEN ////////////////////////
    async function fetchAllEnrollments() {
        toggleIsLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:8080/enrollments", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setEnrollments(response.data);
        } catch (error) {
            console.error(error);
            setError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }

    function determineEnrollmentStatus(cancellationRequested, isOngoing) {
        let status = "";
        if (cancellationRequested) {
            status = "annulering"
        } else if (isOngoing) {
            status = "lopend"
        } else {
            status = "beëindigd"
        }
        return status;
    }

    function showEnrollments() {
        void fetchAllEnrollments();
        setDisplay("enrollments");
    }

    function calculateNewTasks() {
        const newHorseTasks = newHorses.length;
        const newCancellationTasks = cancellationRequests.length;
        const newTasks = newHorseTasks + newCancellationTasks;
        return newTasks;
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
                                <div className="profile-icon">CE</div>
                            </div>
                        </NavBar>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2 className={styles["admin-menu-title"]}>Menu</h2>
                        <div className={styles["new-tasks-container"]}>
                            <h3 className={styles["new-tasks-title"]}>Taken</h3>
                            <div className={styles["notification"]}>{calculateNewTasks()}</div>
                        </div>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={() => setDisplay("default")}
                        >
                            Aanvragen & Annuleringen
                        </Button>
                        <h3>Klanten</h3>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={showCustomers}
                        >
                            Bekijk klanten
                        </Button>
                        <h3>Paarden</h3>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={showHorses}
                        >
                            Bekijk paarden
                        </Button>
                        <h3>Stallen</h3>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={showStalls}
                        >
                            Bekijk stallen
                        </Button>
                        <h3>Abonnementsoorten</h3>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={() => setDisplay("subscriptions")}
                        >
                            Bekijk abonnementstypen
                        </Button>
                        <h3>Inschrijvingen</h3>
                        <Button
                            type="button"
                            classname="admin-menu"
                            handleClick={showEnrollments}
                        >
                            Bekijk inschrijvingen
                        </Button>
                    </nav>
                    <div className="content-container">
                        <div className="intro-content-wrapper">
                            {user.username && <h3>Welkom {user.username}!</h3>}
                            {calculateNewTasks() > 0 ?
                                <h3>Je hebt vandaag {calculateNewTasks()} nieuwe taken.</h3>
                                :
                                <h3>Geen openstaande taken (meer).</h3>}
                        </div>
                        {!editingNewEnrollment && display === "default" &&
                            <Display
                                className="persona"
                                title="Nieuwe Aanvragen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {newHorsesError &&
                                    <p className="error">{newHorsesError}</p>}
                                {!newHorsesError && !isLoading && newHorses.length === 0 &&
                                    <p className={styles["nothing-message"]}>Er zijn momenteel geen nieuwe
                                        aanvragen.</p>}
                                {!newHorsesError && !isLoading && newHorses.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={newHorseTableHead}
                                    >
                                        <tbody>
                                        {newHorses.map((horse) => {
                                            return <tr key={horse.id} className="admin-table-body">
                                                <td>{horse.name}</td>
                                                <td>{horse.preferredSubscription}</td>
                                                {/*{horse.stall ? <td>{horse.stall.name}</td> : <td>---</td>}*/}
                                                <td>{displayCompleteName(horse.owner.firstName, horse.owner.lastName)}</td>
                                                <td>{horse.owner.telephoneNumber}</td>
                                                {/*<td>{console.log(horse.owner.enrollments)}</td>*/}
                                                <td>
                                                    <Button type="button"
                                                            classname="admin-select-button"
                                                            disabled={false}
                                                            handleClick={() => handleNewHorseClick(horse)}
                                                    >
                                                        neem in behandeling
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}
                        {editingNewEnrollment && display === "default" &&
                            <Display
                                className="admin"
                                title="Verwerk nieuwe aanvraag voor:"
                            >
                                <div className={styles["horse-edit-container"]}>
                                    <Table
                                        className="default-table"
                                        tableHeadClassName="edit-table-head"
                                        tableHeadArray={newHorseFormTableHead}
                                    >
                                        <tbody>
                                        <tr className="table-body">
                                            <td>{horseInfo.name}</td>
                                            <td>{horseInfo.preferredSubscription}</td>
                                            <td>{horseInfo.typeOfStall}</td>
                                            <td>{horseInfo.typeOfFeed}</td>
                                            <td>{horseInfo.typeOfBedding}</td>
                                            <td>{displayCompleteName(horseInfo.owner.firstName, horseInfo.owner.lastName)}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    {fetchStallError &&
                                        <p className="error">{fetchStallError}</p>}
                                    {availableStalls.length === 0 &&
                                        <p>er zijn geen stallen meer beschikbaar van dit type. Neem contact op met de
                                            klant</p>}
                                    {!horseAssignedSuccess && availableStalls.length > 0 &&
                                        <div className={styles["edit-part"]}>
                                            <form className={styles["horse-form"]}
                                                  onSubmit={handleSubmit(assignHorseToStall)}>
                                                <label htmlFor="stall-type-select-field">
                                                    {horseInfo.typeOfStall}
                                                </label>
                                                <select
                                                    // name="typeOfStall"
                                                    id="stall-type-select-field"
                                                    {...register("typeOfStall", {
                                                        required: {
                                                            value: true,
                                                            message: "maak een keuze",
                                                        }
                                                    })}
                                                >
                                                    <option className={styles["disabled"]}>kies een stal</option>
                                                    {availableStalls.map((stall) => {
                                                        return <option key={stall.id}
                                                                       value={stall.id}>{stall.name}</option>
                                                    })}
                                                </select>
                                                {errors.typeOfStall &&
                                                    <p className="form-error">{errors.typeOfStall}</p>}
                                                <Button
                                                    type="submit"
                                                    disabled={false}
                                                >
                                                    Kies deze stal
                                                </Button>
                                                {error &&
                                                    <p className="error">{error}</p>}
                                            </form>
                                        </div>}

                                    {horseAssignedSuccess && !enrollmentCreatedSuccess &&
                                        <div className={styles["edit-part"]}>
                                            {error ?
                                                <p className="error">{error}</p> :
                                                <p className={styles["success-message"]}>{horseInfo.name} is succesvol
                                                    toegevoegd
                                                    aan
                                                    een {horseInfo.typeOfStall}</p>}
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={createNewEnrollment}
                                            >
                                                Bevestig nieuwe inschrijving
                                            </Button>
                                        </div>}
                                    {horseAssignedSuccess && enrollmentCreatedSuccess &&
                                        <div className={styles["edit-part"]}>
                                            <p className={styles["success-message"]}>Gelukt!!!</p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={setToNewHorsesDefault}
                                            >Ga terug naar overzicht</Button>
                                        </div>}
                                </div>
                            </Display>}

                        {!editingCancellation && display === "default" &&
                            <Display
                                className="persona"
                                title="Annuleringsverzoeken"
                            >
                                {isLoading && <p>Loading...</p>}
                                {cancellationRequestError &&
                                    <p className="error">{cancellationRequestError}</p>}
                                {!cancellationRequestError && !isLoading && cancellationRequests.length === 0 &&
                                    <p className={styles["nothing-message"]}>Er zijn momenteel geen
                                        annuleringsverzoeken.</p>}
                                {!cancellationRequestError && cancellationRequests.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={cancellationTableHead}
                                    >
                                        <tbody>
                                        {cancellationRequests.map((enrollement) => {
                                            return <tr key={enrollement.id} className="admin-table-body">
                                                <td>{enrollement.id}</td>
                                                <td>{enrollement.horse.name}</td>
                                                {/*{horse.stall ? <td>{horse.stall.name}</td> : <td>---</td>}*/}
                                                <td>{displayCompleteName(enrollement.customer.firstName, enrollement.customer.lastName)}</td>
                                                <td>{enrollement.customer.telephoneNumber}</td>
                                                <td>{enrollement.subscription.name}</td>
                                                <td>{reverseDate(enrollement.startDate)}</td>
                                                <td>
                                                    <Button
                                                        type="button"
                                                        disabled={false}
                                                        handleClick={() => handleCancellationClick(enrollement)}
                                                    >
                                                        neem in behandeling
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}
                        {editingCancellation && display === "default" &&
                            <Display
                                className="admin"
                                title="Verwerk nieuw annuleringsverzoek voor:"
                            >
                                <div className={styles["horse-edit-container"]}>
                                    <Table
                                        className="default-table"
                                        tableHeadClassName="edit-table-head"
                                        tableHeadArray={cancellationFormTableHead}
                                    >
                                        <tbody>
                                        <tr className="table-body">
                                            <td>{cancellationInfo.horseName}</td>
                                            <td>{cancellationInfo.stallName}</td>
                                            <td>{cancellationInfo.stallType}</td>
                                            <td>{cancellationInfo.subscriptionName}</td>
                                            <td>{reverseDate(cancellationInfo.startDate)}</td>
                                            <td>{displayCompleteName(cancellationInfo.customerFirstname, cancellationInfo.customerLastname)}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    {!horseRemovedSuccess &&
                                        <div className={styles["edit-part"]}>
                                            {error ?
                                                <p className="error">Het paard kon uit de stal verwijderd worden.
                                                    Check of het in een stal staat en/of probeer het opnieuw</p>
                                                :
                                                <p className={styles["success-message"]}>Verwijder
                                                    paard {cancellationInfo.horseName} uit
                                                    stal {cancellationInfo.stallName} </p>}
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={() => removeHorseFromStall(cancellationInfo.stallId)}
                                            >
                                                Verwijder paard uit stal
                                            </Button>
                                        </div>}
                                    {horseRemovedSuccess && !enrollmentTerminatedSuccess &&
                                        <div className={styles["edit-part"]}>
                                            {error ?
                                                <p className="error">{error}</p>
                                                :
                                                <p className={styles["success-message"]}>Paard {cancellationInfo.horseName} is
                                                    succesvol verwijderd uit
                                                    stal {cancellationInfo.stallName} </p>}
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={() => terminateEnrollment(cancellationInfo.enrollmentId)}
                                            >
                                                Annuleer dit abonnement
                                            </Button>
                                        </div>}
                                    {horseRemovedSuccess && enrollmentTerminatedSuccess &&
                                        <div className={styles["edit-part"]}>
                                            <p className={styles["success-message"]}>Het Abonnement voor
                                                paard {cancellationInfo.horseName} is succesvol
                                                beëindigd </p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={setToCancellationDefault}
                                            >
                                                Terug naar overicht
                                            </Button>
                                        </div>}
                                </div>
                            </Display>}

                        {display === "customers" &&
                            <Display
                                className="persona"
                                title="Klanten"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && customers.length === 0 &&
                                    <p>Er zijn nog geen klanten. Keep the faith!</p>}
                                {customers.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={adminCustomerTableHead}
                                    >
                                        <tbody>
                                        {customers.map((customer) => {
                                            return <tr key={customer.id} className="admin-table-body">
                                                <td>{customer.lastName}</td>
                                                <td>{customer.firstName}</td>
                                                <td>{customer.residence}</td>
                                                <td>{customer.telephoneNumber}</td>
                                                <td>{customer.emailAddress}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}

                        {display === "horses" &&
                            <Display
                                className="persona"
                                title="Paarden"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && horses.length === 0 &&
                                    <p>Er zijn nog geen paarden. Keep the faith!</p>}
                                {horses.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={adminHorseTableHead}
                                    >
                                        <tbody>
                                        {horses.map((horse) => {
                                            return <tr key={horse.id} className="admin-table-body">
                                                <td>{horse.name}</td>
                                                {horse.stall ? <td>{horse.stall.name}</td>
                                                    : <td>---</td>}
                                                <td>{horse.nameOfVet}</td>
                                                <td>{horse.telephoneOfVet}</td>
                                                <td>{horse.typeOfFeed}</td>
                                                <td>{horse.typeOfBedding}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}

                        {display === "stalls" &&
                            <Display
                                className="persona"
                                title="Stallen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && stalls.length === 0 && <p>Er zijn geen stallen.</p>}
                                {stalls.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={stallTableHead}
                                    >
                                        <tbody>
                                        {stalls.map((stall) => {
                                            return <tr key={stall.id} className="admin-table-body">
                                                <td>{stall.name}</td>
                                                <td>{stall.type}</td>
                                                {stall.horse ? <td>{stall.horse.name}</td>
                                                    : <td>---</td>}
                                                {stall.horse ? <td>{stall.horse.nameOfVet}</td>
                                                    : <td>---</td>}
                                                {stall.horse ? <td>{stall.horse.telephoneOfVet}</td>
                                                    : <td>---</td>}
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}

                        {display === "subscriptions" &&
                            <Display
                                className="persona"
                                title="Abonnementstypen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && subscriptions.length === 0 &&
                                    <p>Er zijn nog geen abonnementsoorten.</p>}
                                {subscriptions.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={subscriptionTableHead}
                                    >
                                        <tbody>
                                        {subscriptions.map((subscription) => {
                                            return <tr key={subscription.id} className="admin-table-body">
                                                <td>{subscription.name}</td>
                                                <td>{subscription.typeOfCare}</td>
                                                <td>{subscription.typeOfStall}</td>
                                                <td>{formatPrice(subscription.price)}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}

                        {display === "enrollments" &&
                            <Display
                                className="persona"
                                title="Inschrijvingen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && enrollments.length === 0 && <p>Er zijn nog geen inschrijvingen.
                                    Keep the faith!</p>}
                                {enrollments.length > 0 &&
                                    <Table
                                        className="admin-table"
                                        tableHeadClassName="admin-table-head"
                                        tableHeadArray={adminEnrollmentTableHead}
                                    >
                                        <tbody>
                                        {enrollments.map((enrollment) => {
                                            return <tr key={enrollment.id} className="admin-table-body">
                                                <td>{enrollment.id}</td>
                                                {enrollment.subscription ? <td>{enrollment.subscription.name}</td>
                                                    : <td>---</td>}
                                                <td>{reverseDate(enrollment.startDate)}</td>
                                                <td>{determineEnrollmentStatus(enrollment.cancellationRequested, enrollment.ongoing)}</td>
                                                {enrollment.horse ? <td>{enrollment.horse}</td>
                                                    : <td>---</td>}
                                                {enrollment.customer ?
                                                    <td>{displayCompleteName(enrollment.customer.firstName, enrollment.customer.lastName)}</td>
                                                    : <td>---</td>}
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>}
                            </Display>}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Admin;