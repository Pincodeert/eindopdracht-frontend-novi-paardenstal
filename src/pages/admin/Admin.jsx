import './Admin.css';
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Display from "../../components/display/Display.jsx";
import TableHead from "../../components/tableHead/TableHead.jsx";
import formatPrice from "../../helpers/formatPrice.js";
import {displayCompleteName} from "../../helpers/editName.js";
import reverseDate from "../../helpers/reverseDate.js";
import {generateAdminErrorString} from "../../helpers/generate ErrorString.js";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";

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
    const [chosenStall, setChosenStall] = useState({});
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
    const {isAuth, signOut} = useContext(AuthContext);

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
                // console.log("hier zijn de paarden:", response);
                const fetchedHorses = response.data
                setHorses(fetchedHorses);
                const newHorses = fetchedHorses.filter((horse) => {
                    // return horse.stall === null && horse.preferredSubscription != "activated";
                    return horse.preferredSubscription != "activated";
                });
                // console.log("en de nieuwe paarden:", newHorses);
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
                // console.log("annuleringsverzoeken", response.data);
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
            // console.log("hier zijn alle klanten: ", response);
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

    function showCustomerDetail(id) {
        console.log("dit is klant: ", id)
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
            console.log("de available stalls" ,response);
            setAvailableStalls(response.data);
        } catch (error) {
            console.error(error);
            setFetchStallError(generateAdminErrorString("het ophalen/bewerken van de gegevens", error.message));
        } finally {
            toggleIsLoading(false);
        }
    }


    function handleNewHorseClick(horse) {

        // console.log("paard", horse);
        // 1. zoek bij de voor dit paard gekozen abonnements-naam het juiste abonnement op en daarbij behorende staltype
        // console.log(subscriptions);
        const selectedSubscription = selectSubscription(horse);
        // console.log("de gekozen subscription: ", selectedSubscription);

        // 2. sla benodigde info van gekozen paard en bijbehorende subscroption info tijdelijk op in de State
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
        // 3.haal alle  stallen van dit staltype op die nog beschikbaar zijn.
        const stalls = fetchAvailableStallsByType(selectedSubscription.typeOfStall)
        setAvailableStalls(stalls);
        // 4. toggle de show
        toggleEditingNewEnrollment(true);
    }

    // console.log("de horseInfo:", horseInfo);
    // console.log("de beschikbare stallen: ", availableStalls);

    // function handleStallChange(e) {
    //     setChosenStall(
    //         {
    //             id: e.target.value,
    //         });
    // }

    // console.log("de gekozen stallId: ", chosenStall.id);

    async function assignHorseToStall(data) {
        toggleIsLoading(true);
        setError("");
        console.log("horseInfo.Id = ", horseInfo.id, " en data.id = ", data.id, " en data = ", data);
        try {
            const response = await axios.put(`http://localhost:8080/stalls/${data.typeOfStall}/horse`, {
                id: horseInfo.id,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("het paard staat nu in de stal", response);
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
            // console.log(response);
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
        // console.log("gekozen enrollement", enrollment);
        // 1.zoek voor het paard dat gekoppeld is aan het enrollment uit in welke stal het staat
        const selectedHorse = horses.find((horse) => {
            return horse.id === enrollment.horse.id;
        });
        // console.log("paard: ,", selectedHorse);
        const stall = selectedHorse.stall;
        // console.log("paard", selectedHorse.name, "staat in stal ", stall.id);
        // 2. sla de gecombineerde info tijdelijk op in cancellationInfo
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
        // 3. toggle weergave venster
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
            // console.log("hetpaard is verwijderd uit stallnr,", stallId, response);
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
            // console.log("abonnement beeindigd!!", response);
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
////////////////////////////////////////////
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
            // console.log("dit zijn de stallen", response.data);
            setStalls(response.data);
        } catch(error) {
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
            console.log(response.data);
            setEnrollments(response.data);
        } catch(error) {
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
///////////////////////////////////////////////
function calculateNewTasks() {
        const newHorseTasks = newHorses.length;
        const newCancellationTasks = cancellationRequests.length;
        const newTasks = newHorseTasks + newCancellationTasks;
        return newTasks;
}

/////////////////////////////////////////////////////////////////

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
                        <nav className="header-navigation">
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            {isAuth && <Button
                                type="button"
                                handleClick={signOut}
                            >
                                uitloggen
                            </Button>}
                            <div className="profile-icon">CE</div>
                        </nav>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2>Menu</h2>
                        <div className="new-tasks-container">
                            <h3 className="new-tasks-title">Taken</h3>
                            <div className="notification">{calculateNewTasks()}</div>
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
                <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            <h3>Welkom dirtyharry!</h3>
                            {/*<h3>Welkom {user.username} </h3>*/}
                        </div>
{/*///////////////////////////////////  NIEUWE AANVRAGEN  //////////////////////////////////*/}
                        {!editingNewEnrollment && display === "default" &&
                            <Display
                                className="content-wrapper persona"
                                title="Nieuwe Aanvragen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {newHorsesError &&
                                    <p className="error">{newHorsesError}</p>}
                                {!newHorsesError && !isLoading && newHorses.length === 0 &&
                                    <p className="nothing-message">Er zijn momenteel geen nieuwe aanvragen.</p>}
                                {!newHorsesError && !isLoading && newHorses.length > 0 &&
                                    <table className="admin-table">
                                        <TableHead
                                            className="admin-table-head"
                                            // list={["Paard", "Gewenste abonnement", "Klant", "Klant Label", "Bekijk Klant"]}
                                            >
                                            <th>Paard</th>
                                            <th>Gewenste abonnement</th>
                                            <th>Klant</th>
                                            <th>Klant Label</th>
                                            <th>Bekijk Klant</th>
                                        </TableHead>
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
                                                            disabled={false}
                                                            handleClick={() => handleNewHorseClick(horse)}
                                                    >
                                                        neem in behandeling
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>}
                            </Display>}
                        {editingNewEnrollment && display === "default" &&
                            <Display
                                className="content-wrapper admin"
                                title="Verwerk nieuwe aanvraag voor:"
                            >
                                <div className="horse-info-container">
                                    <table className="table">
                                        <TableHead className="table-head table-test">
                                            <th>paard</th>
                                            <th>abonnementtype</th>
                                            <th>staltype</th>
                                            <th>voeding</th>
                                            <th>bodem</th>
                                            <th>klant</th>
                                        </TableHead>
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
                                    </table>
                                </div>
                                {fetchStallError &&
                                    <p className="error">{fetchStallError}</p>}
                                {availableStalls.length === 0 &&
                                    <p>er zijn geen stallen meer beschikbaar van dit type. Neem contact op met de
                                        klant</p>}
                                {!horseAssignedSuccess && availableStalls.length > 0 &&
                                    <div className="edit-part">
                                        <form className="horse-form" onSubmit={handleSubmit(assignHorseToStall)}>
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
                                                // value={chosenStall.id}
                                                // onChange={handleStallChange}
                                            ><option className="disabled" >kies een stal</option>
                                                {availableStalls.map((stall) => {
                                                return <option key={stall.id} value={stall.id}>{stall.name}</option>
                                            })}
                                            </select>
                                            {errors.typeOfStall && <p className="form-error">{errors.typeOfStall}</p>}
                                            <Button
                                                type="submit"
                                                disabled={false}
                                            >
                                                Kies deze stal
                                            </Button>
                                            {error &&
                                                // <p className="error">Het paard kon niet toegewezen worden aan de
                                                //     stal. Probeer het opnieuw.</p>}
                                                <p className="error">{error}</p>}
                                        </form>
                                    </div>}
                                {horseAssignedSuccess && !enrollmentCreatedSuccess &&
                                    <div className="edit-part">
                                        {error ?
                                            // <p className="error">Er kon geen nieuw abonnement worden aangemaakt.
                                            //     Probeer het opnieuw.</p>
                                            <p className="error">{error}</p> :
                                            <p className="success-message">{horseInfo.name} is succesvol toegevoegd
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
                                    <div className="edit-part">
                                        <p className="success-message">Gelukt!!!</p>
                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={setToNewHorsesDefault}
                                        >Ga terug naar overzicht</Button>
                                    </div>}
                            </Display>}

{/*///////////////////////////////////  ANNULERINGEN  //////////////////////////////////*/}
                        {!editingCancellation && display === "default" &&
                            <Display
                                className="content-wrapper persona"
                                title="Annuleringsverzoeken"
                            >
                                {isLoading && <p>Loading...</p>}
                                {cancellationRequestError &&
                                    <p className="error">{cancellationRequestError}</p>}
                                {!cancellationRequestError && !isLoading && cancellationRequests.length === 0 &&
                                    <p className="nothing-message">Er zijn momenteel geen annuleringsverzoeken.</p>}
                                {!cancellationRequestError && cancellationRequests.length > 0 &&
                                    <table className="admin-table">
                                        <TableHead className="admin-table-head">
                                            <th>AbonNr</th>
                                            <th>Paard</th>
                                            {/*<th>Stal</th>*/}
                                            <th>Klant</th>
                                            <th>Telnr klant</th>
                                            <th>Abonnementtype</th>
                                            <th>Ingangsdatum</th>
                                        </TableHead>
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
                                    </table>}
                            </Display>}
                        {editingCancellation && display === "default" &&
                            <Display
                                className="content-wrapper admin"
                                title="Verwerk nieuw annuleringsverzoek voor:"
                            >
                                <div className="horse-info-container">
                                    <table className="table">
                                        <TableHead className="table-head table-test">
                                            <th>paard</th>
                                            <th>stal</th>
                                            <th>staltype</th>
                                            <th>abonnementtype</th>
                                            <th>sinds</th>
                                            <th>klant</th>
                                        </TableHead>
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
                                    </table>
                                </div>
                                {!horseRemovedSuccess &&
                                    <div className="edit-part">
                                        {error ?
                                            // <p className="error">Het paard kon uit de stal verwijderd worden.
                                            //     Check of het in een
                                            //     stal staat en/of probeer het opnieuw</p>
                                            <p className="error">{error}</p>
                                            :
                                            <p className="success-message">Verwijder
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
                                    <div className="edit-part">
                                        {error ?
                                            // <p className="error">Het abonnement kon niet worden beeindigd.
                                            //     Probeer het opnieuw.</p>
                                            <p className="error">{error}</p>
                                            :
                                            <p className="success-message">Paard {cancellationInfo.horseName} is
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
                                    <div className="edit-part">
                                        <p className="success-message">Het Abonnement voor
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
                            </Display>}

{/*///////////////////////////////////  KLANTEN  //////////////////////////////////*/}
                        {display === "customers" &&
                            <Display
                                className="content-wrapper persona"
                                title="Klanten"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && customers.length === 0 && <p>Er zijn nog geen klanten. Keep the faith!</p>}
                                {customers.length > 0 &&
                                <table className="admin-table">
                                    <TableHead className="admin-table-head">
                                        <th>Achternaam</th>
                                        <th>Voornaam</th>
                                        <th>Plaats</th>
                                        <th>Telnr</th>
                                        <th>E-mail</th>
                                    </TableHead>
                                    <tbody>

                                    {customers.map((customer) => {
                                            return <tr key={customer.id} className="admin-table-body">
                                                <td>{customer.lastName}</td>
                                                <td>{customer.firstName}</td>
                                                <td>{customer.residence}</td>
                                                <td>{customer.telephoneNumber}</td>
                                                <td>{customer.emailAddress}</td>
                                                <td>
                                                    <Button type="button"
                                                            handleClick={() => showCustomerDetail(customer.id)}
                                                    >
                                                        kies
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>}
                            </Display>}

{/*///////////////////////////////////  PAARDEN  //////////////////////////////////*/}
                        {display === "horses" &&
                            <Display
                                className="content-wrapper persona"
                                title="Paarden"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && horses.length === 0 && <p>Er zijn nog geen paarden. Keep the faith!</p>}
                                {horses.length > 0 &&
                                <table className="admin-table">
                                    <TableHead className="admin-table-head">
                                        <th>Naam</th>
                                        <th>Stal</th>
                                        <th>Dierenarts</th>
                                        <th>Telnr dierenarts</th>
                                        <th>voeding</th>
                                        <th>bodem</th>
                                    </TableHead>
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
                                                {/*<td>{horse.owner.firstName}</td>*/}
                                                {/*<td>*/}
                                                {/*    /!*<button type="button" onClick={() => showHorseDetail(horse.id)}>kies</button>*!/*/}
                                                {/*</td>*/}
                                            </tr>
                                        })}
                                    </tbody>
                                </table>}
                            </Display>}
{/*///////////////////////////////////  STALLEN  //////////////////////////////////*/}
                        {display === "stalls" &&
                        <Display
                            className="content-wrapper persona"
                            title="Stallen"
                        >
                            {isLoading && <p>Loading...</p>}
                            {error && <p className="error">{error}</p>}
                            {!isLoading && !error && stalls.length === 0 && <p>Er zijn geen stallen.</p>}
                            {stalls.length > 0 &&
                            <table className="admin-table">
                                <TableHead className="admin-table-head">
                                    <th>Naam</th>
                                    <th>Staltype</th>
                                    <th>Paard</th>
                                    <th>Dierenarts</th>
                                    <th>Tel dierenarts</th>
                                </TableHead>
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
                            </table>}
                        </Display>}
{/*///////////////////////////////////  ABONNEMENTTYPEN  //////////////////////////////////*/}
                        {display === "subscriptions" &&
                            <Display
                                className="content-wrapper persona"
                                title="Abonnementstypen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && subscriptions.length === 0 && <p>Er zijn nog geen abonnementsoorten.</p>}
                                {subscriptions.length > 0 &&
                                <table className="admin-table">
                                    <TableHead className="admin-table-head">
                                        <th>Naam</th>
                                        <th>Verzorging</th>
                                        <th>Stal</th>
                                        <th>Prijs</th>
                                    </TableHead>
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
                                </table>}
                            </Display>}
{/*///////////////////////////////////  INSCHRIJVINGEN  //////////////////////////////////*/}
                        {display === "enrollments" &&
                            <Display
                                className="content-wrapper persona"
                                title="Inschrijvingen"
                            >
                                {isLoading && <p>Loading...</p>}
                                {error && <p className="error">{error}</p>}
                                {!isLoading && !error && enrollments.length === 0 && <p>Er zijn nog geen inschrijvingen.
                                    Keep the faith!</p>}
                                {enrollments.length > 0 &&
                                <table className="admin-table">
                                    <TableHead className="admin-table-head">
                                        <th>AbonNr</th>
                                        <th>Abonnementtype</th>
                                        <th>Ingangsdatum</th>
                                        <th>Status</th>
                                        <th>Paard</th>
                                        <th>Klant</th>
                                    </TableHead>
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
                                </table>}
                            </Display>}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Admin;