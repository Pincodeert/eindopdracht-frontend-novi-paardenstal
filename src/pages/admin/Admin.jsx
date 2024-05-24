import './Admin.css';
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import subscriptions from "../subscriptions/Subscriptions.jsx";
import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";


function Admin() {

    const [error, setError] = useState("");
    const [customers, setCustomers] = useState([]);
    const [editingNewEnrollment, toggleEditingNewEnrollment] = useState(false);
    const [horses, setHorses] = useState([]);
    const [newHorses, setNewHorses] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [horseInfo, setHorseInfo] = useState({});
    const [showNewEnrollmentForm, toggleShowNewEnrollmentForm] = useState(false);
    const [availableStalls, setAvailableStalls] = useState([]);
    const [chosenStall, setChosenStall] = useState({});
    const [horseAssignedSucces, toggleHorseAssignedSucces] = useState(false);
    const [enrollmentInfo, setEnrollmentInfo] = useState({});
    const [enrollmentCreatedSuccess, toggleEnrollmentCreatedSuccess] = useState(false);
    const [cancellationRequests, setCancellationRequests] = useState([]);
    const [cancellationInfo, setCancellationInfo] = useState(null);
    const [editingCancellation, toggleEditingCancellation] = useState(false);
    const [horseRemovedSuccess, toggleHorseRemovedSuccess] = useState(false);
    const [enrollmentTerminatedSuccess, toggleEnrollmentTerminatedSuccess] = useState(false);
    const [display, setDisplay] = useState("");

    async function fetchCustomers() {
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/customerprofiles");
            console.log("hier zijn alle klanten: ", response);
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    useEffect(() => {
        async function fetchHorses() {
            setError("");

            try {
                const response = await axios.get("http://localhost:8080/horses");
                console.log("hier zijn de paarden:", response);
                const fetchedHorses = response.data
                setHorses(fetchedHorses);
                const newHorses = fetchedHorses.filter((horse) => {
                    return horse.stall === null && horse.preferredSubscription != "activated";
                });
                console.log("en de nieuwe paarden:", newHorses);
                setNewHorses(newHorses);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        void fetchHorses();
    }, []);

    useEffect(() => {
        async function fetchCancellationRequests() {
            setError("");

            try {
                const response = await axios.get("http://localhost:8080/enrollments?cancellationRequested=true");
                console.log("annuleringsverzoeken", response.data);
                setCancellationRequests(response.data);
            } catch (error) {
                console.error(error);
                setError("error");
            }
        }

        void fetchCancellationRequests();
    }, []);

    useEffect(() => {
        async function fetchAllSubscriptions() {
            setError("");
            try {
                const response = await axios.get("http://localhost:8080/subscriptions");
                console.log("alle abonnementtypen: ", response.data);
                setSubscriptions(response.data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        void fetchAllSubscriptions();
    }, []);



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
        setError("");
        try {
            const response = await axios.get(`http://localhost:8080/stalls?type=${stallType}&isOccupied=false`);
            console.log(response);
            setAvailableStalls(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function handleNewHorseClick(horse) {

        console.log("paard", horse);
        // 1. zoek bij de voor dit paard gekozen abonnements-naam het juiste abonnement op en daarbij behorende staltype
        console.log(subscriptions);
        const selectedSubscription = selectSubscription(horse);
        console.log("de gekozen subscription: ", selectedSubscription);

        // 2. sla benodigde info van gekozen paard en bijbehorende subscroption info tijdelijk op in de State
        setHorseInfo({
            id: horse.id,
            name: horse.name,
            owner: horse.owner,
            preferredSubscription: horse.preferredSubscription,
            subscriptionId: selectedSubscription.id,
            typeOfStall: selectedSubscription.typeOfStall
        })
        // 3.haal alle  stallen van dit staltype op die nog beschikbaar zijn.
        const stalls = fetchAvailableStallsByType(selectedSubscription.typeOfStall)
        setAvailableStalls(stalls);
        // 4. toggle de show
        toggleEditingNewEnrollment(true);
        toggleShowNewEnrollmentForm(true);
    }

    console.log("de horseInfo:", horseInfo);
    console.log("de beschikbare stallen: ", availableStalls);

    function handleStallChange(e) {
        setChosenStall(
            {
                id: e.target.value,
            });
    }

    console.log("de gekozen stallId: ", chosenStall.id);

    async function assignHorseToStall(e) {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/stalls/${chosenStall.id}/horse`, {
                id: horseInfo.id,
            });
            console.log("het paard staat nu in de stal", response);
            setEnrollmentInfo({
                subscriptionId: horseInfo.subscriptionId,
                customerId: horseInfo.owner.id,
                horseId: horseInfo.id,
            });
            toggleShowNewEnrollmentForm(false);
            toggleHorseAssignedSucces(true);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    async function createNewEnrollment() {
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/enrollments", {
                ...enrollmentInfo
            });
            console.log(response);
            // setEnrollmentInfo({})
            toggleEnrollmentCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function setNewToDefault() {
        toggleEditingNewEnrollment(false);
        toggleHorseAssignedSucces(false);
    }

////////////////////// Annuleringen ///////////////////
    function handleCancellationClick(enrollment) {
        console.log("gekozen enrollement", enrollment);
        // 1.zoek voor het paard dat gekoppeld is aan het enrollment uit in welke stal het staat
        const selectedHorse = horses.find((horse) => {
            return horse.id === enrollment.horse.id;
        });
        console.log("paard: ,", selectedHorse);
        const stall = selectedHorse.stall;
        console.log("paard", selectedHorse.name, "staat in stal ", stall.id);
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
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/stalls/${stallId}`);
            console.log("hetpaard is verwijderd uit stallnr,", stallId, response);
            toggleHorseRemovedSuccess(true);
        } catch (error) {
            console.error(error);
            setError("error");
        }
    }

    async function terminateEnrollment(enrollmentId) {
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/enrollments/${enrollmentId}`, {
                "isOngoing": true,
                "subscriptionId": cancellationInfo.subscriptionId,
                "customerId": cancellationInfo.customerId,
            });
            toggleEnrollmentTerminatedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function setToCancellationDefault() {
        toggleEditingCancellation(false);
        toggleHorseRemovedSuccess(false);
        toggleEnrollmentTerminatedSuccess(false);
        setCancellationInfo(null);
    }
////////////////////////////////////////////






    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            {/*<h2>Blaze of Glory</h2>*/}
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            <h3>Here to make your day</h3>
                            <div className="profile-icon">CE</div>
                        </nav>
                    </div>
                </section>
            </header>
            <main className="outer-container outer-profile-container">
                <div className="inner-container inner-profile-container">
                    <nav className="side-nav">
                        <h2>Menu</h2>
                        <h3>Klanten</h3>
                        <Button
                            type="button"
                            handleClick={showCustomers}
                        >
                            Klanten
                        </Button>
                        <h3>Paarden</h3>
                        <Button
                            type="button"
                            handleClick={showHorses}
                        >
                            Paarden
                        </Button>
                        <Link><h3>Stallen</h3></Link>
                        <Button
                            type="button"
                            note="hier komt een link"
                        >
                            Stallen
                        </Button>
                        <Button
                            type="button"
                            note="hier komt een link"
                        >
                            zoek stal
                        </Button>
                        <Button
                            type="button"
                            note="hier komt een link"
                        >
                            voeg stal toe
                        </Button>
                        <Link><h3>Abonnementsoorten</h3></Link>
                        <Button
                            type="button"
                            note="hier komt een link"
                        >
                            abonnementstypen
                        </Button>
                        <Link><h3>Klanten</h3></Link>
                        <Link><h3>Paarden</h3></Link>
                        <Link><h3>Inschrijvingen</h3></Link>
                        <Button
                            type="button"
                        >
                            inschrijvingen
                        </Button>
                        <Button
                            type="button"
                            text="toon nieuwe aanvragen"
                        >
                            Nieuwe aanvragen
                        </Button>
                        <Button
                            type="button"
                            text="toon annuleringsverzoeken"
                        >
                            Annuleringsverzoeken
                        </Button>
                        <Button
                            type="button"
                            text=""
                        >
                            toon cijfers
                        </Button>
                    </nav>
                    <div className="profile-content-container">
                        <div className="intro-content-wrapper">
                            <h3>Welkom dirtyharry!</h3>
                            {/*<h3>Welkom {user.username} </h3>*/}
                        </div>
                        {!editingNewEnrollment &&
                            <article className="content-wrapper persona">
                                <div className="content-title">
                                    <h4>Nieuwe aanvragen</h4>
                                </div>
                                <div className="overwiew-container">
                                    <table className="admin-table">
                                        <thead>
                                        <tr className="admin-table-head">
                                            <th>Paard</th>
                                            <th>Gewenste abonnement</th>
                                            <th>Klant</th>
                                            <th>Telnr klant</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newHorses.length === 0 ?

                                            <p className="nothing-message">Er zijn momenteel geen nieuwe aanvragen.</p>

                                            : newHorses.map((horse) => {
                                                return <tr key={horse.id} className="admin-table-body">
                                                    <td>{horse.name}</td>
                                                    <td>{horse.preferredSubscription}</td>
                                                    {/*{horse.stall ? <td>{horse.stall.name}</td> : <td>---</td>}*/}
                                                    <td>{horse.owner.firstName} {horse.owner.lastName}</td>
                                                    <td>{horse.owner.telephoneNumber}</td>
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
                                    </table>
                                </div>
                            </article>}
                        {showNewEnrollmentForm && <article className="content-wrapper admin">
                            <div className="content-title">
                                <h4>Verwerk nieuwe aanvraag voor {horseInfo.preferredSubscription}</h4>
                            </div>
                            <div className="overwiew-container">

                                <ul className="horse-list">
                                    <li>{horseInfo.name}</li>
                                    <li>{horseInfo.preferredSubscription}</li>
                                    <li>{horseInfo.typeOfStall}</li>
                                    {/*<li>{horseInfo.owner.firstName} {horseInfo.owner.lastName}</li>*/}
                                </ul>
                                {availableStalls.length > 0 &&
                                    <form className="horse-form" onSubmit={assignHorseToStall}>
                                        <label htmlFor="stall-type-select-field">
                                            {horseInfo.typeOfStall}
                                        </label>
                                        <select
                                            name="typeOfStall"
                                            id="stall-type-select-field"
                                            value={chosenStall.id}
                                            onChange={handleStallChange}
                                        >{availableStalls.map((stall) => {
                                            return <option key={stall.id} value={stall.id}>{stall.name}</option>
                                        })}
                                        </select>
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Kies deze stal
                                        </Button>
                                    </form>}
                            </div>
                        </article>}
                        {horseAssignedSucces &&
                            <article className="content-wrapper admin">

                                <div className="content-title">

                                    <h4>Verwerk nieuwe aanvraag voor {horseInfo.preferredSubscription}</h4>
                                </div>
                                {!enrollmentCreatedSuccess ?
                                    <div className="overwiew-container">
                                        <p>{horseInfo.name} is succesvol toegevoegd aan een {horseInfo.typeOfStall}</p>
                                        <ul className="horse-list">
                                            <li>{horseInfo.name}</li>
                                            <li>{horseInfo.preferredSubscription}</li>
                                            <li>{horseInfo.typeOfStall}</li>
                                            {/*<li>{horseInfo.owner.firstName} {horseInfo.owner.lastName}</li>*/}
                                        </ul>


                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={createNewEnrollment}
                                        >
                                            Bevestig nieuwe inschrijving
                                        </Button>

                                    </div> : <div>
                                        <p>Gelukt!!!</p>
                                        <Button
                                            type="button"
                                            disabled={false}
                                            handleClick={setNewToDefault}
                                        >Ga terug naar overzicht</Button>
                                    </div>}
                            </article>}
   {/*///////////////////////////////////  ANNULERINGSGEDEELTE  //////////////////////////////////*/}
                        {!editingCancellation &&
                            <article className="content-wrapper persona">
                                <div className="content-title">
                                    <h4>Annuleringsverzoeken</h4>
                                </div>
                                <div className="overwiew-container">
                                    <table className="admin-table">
                                        <thead>
                                        <tr className="admin-table-head">
                                            <th>AbonNr</th>
                                            <th>Paard</th>
                                            {/*<th>Stal</th>*/}
                                            <th>Klant</th>
                                            <th>Telnr klant</th>
                                            <th>Abonnementtype</th>
                                            <th>Ingangsdatum</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cancellationRequests.length === 0 ?
                                            <tr>
                                                <td>Er zijn momenteel geen annuleringsverzoeken.</td>
                                            </tr>
                                            : cancellationRequests.map((enrollement) => {
                                                return <tr key={enrollement.id} className="admin-table-body">
                                                    <td>{enrollement.id}</td>
                                                    <td>{enrollement.horse.name}</td>
                                                    {/*{horse.stall ? <td>{horse.stall.name}</td> : <td>---</td>}*/}
                                                    <td>{enrollement.customer.firstName} {enrollement.customer.lastName}</td>
                                                    <td>{enrollement.customer.telephoneNumber}</td>
                                                    <td>{enrollement.subscription.name}</td>
                                                    <td>{enrollement.startDate}</td>
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
                                    </table>
                                </div>
                            </article>}
                        {editingCancellation &&
                            <article className="content-wrapper admin">
                                <div className="content-title">
                                    <h4>Verwerk nieuw annuleringsverzoek voor {cancellationInfo.horseName}</h4>
                                </div>
                                <div className="overwiew-container test">
                                    <div className="horse-info-container">
                                        <table className="table">
                                            <thead>
                                            <tr className="table-head table-test">
                                                <th>paard</th>
                                                <th>stal</th>
                                                <th>staltype</th>
                                                <th>abonnementtype</th>
                                                <th>sinds</th>
                                                <th>klant</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="table-body">
                                                <td>{cancellationInfo.horseName}</td>
                                                <td>{cancellationInfo.stallName}</td>
                                                <td>{cancellationInfo.stallType}</td>
                                                <td>{cancellationInfo.subscriptionName}</td>
                                                <td>{cancellationInfo.startDate}</td>
                                                <td>{cancellationInfo.customerFirstname} {cancellationInfo.customerLastname}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                        {/*<ul className="horse-list">*/}
                                        {/*    <li>{cancellationInfo.horseName}</li>*/}
                                        {/*    <li>{cancellationInfo.customerFirstname} {cancellationInfo.customerLastname}</li>*/}
                                        {/*    <li>{cancellationInfo.stallName}</li>*/}
                                        {/*    <li>{cancellationInfo.subscriptionName}</li>*/}
                                        {/*</ul>*/}
                                        {!horseRemovedSuccess &&
                                            <div className="edit-part">
                                                {error ?
                                                    <p className="error">Het paard kon uit de stal verwijderd worden.
                                                        Check of het in een
                                                        stal staat en/of probeer het opnieuw</p>
                                                    :
                                                    <p>Verwijder paard {cancellationInfo.horseName} uit
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
                                                    <p className="error">Het abonnement kon niet worden beeindigd.
                                                        Probeer het opnieuw.</p>
                                                    :
                                                    <p>Paard {cancellationInfo.horseName} is succesvol verwijderd uit
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
                                                <p>Het Abonnement voor paard {cancellationInfo.horseName} is succesvol
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
                            </article>
                        }
                        {display === "customers" && <article className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Klanten</h4>
                                {/*<Button*/}
                                {/*    type="button"*/}
                                {/*    text="wijzig"*/}
                                {/*/>*/}
                            </div>
                            <div className="overwiew-container">
                                {/*<form className="radio-form" action="/">*/}
                                {/*    {customers.length > 0 && customers.map((customer) => {*/}
                                {/*        return < input*/}
                                {/*            key={customer.id}*/}
                                {/*            type="radio"*/}
                                {/*            name="customer"*/}
                                {/*            value={customer.id}*/}
                                {/*        />*/}
                                {/*    })}*/}
                                {/*    <Button*/}
                                {/*        type="submit"*/}
                                {/*        disabled={false}*/}

                                {/*    >kies klant</Button>*/}
                                {/*</form>*/}
                                <table className="admin-table">
                                    <thead>
                                    <tr className="admin-table-head">
                                    <th>Nr</th>
                                        <th>Achternaam</th>
                                        <th>Voornaam</th>
                                        <th>Plaats</th>
                                        <th>Telnr</th>
                                        <th>E-mail</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {customers.length === 0 ?
                                        <tr>
                                            <td>Er zijn nog geen klanten. Keep the faith!</td>
                                        </tr>
                                        : customers.map((customer) => {
                                            return <tr key={customer.id} className="admin-table-body">
                                                <td>{customer.id}</td>
                                                <td>{customer.lastName}</td>
                                                <td>{customer.firstName}</td>
                                                <td>{customer.residence}</td>
                                                <td>{customer.telephoneNumber}</td>
                                                <td>{customer.emailAddress}</td>
                                                <td>
                                                    <button type="button"
                                                            onClick={() => showCustomerDetail(customer.id)}>kies
                                                    </button>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </article>}
                        {display === "horses" && <article className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Paarden</h4>
                                {/*<Button*/}
                                {/*    type="button"*/}
                                {/*    text="wijzig"*/}
                                {/*/>*/}
                            </div>
                            <div className="overwiew-container">
                                <form className="radio-form" action="/">
                                    {horses.length > 0 && horses.map((horse) => {
                                        return < input
                                            key={horse.id}
                                            type="radio"
                                            name="customer"
                                            value={horse.id}
                                        />
                                    })}
                                    <Button
                                        type="submit"
                                        disabled={false}

                                    >kies paard</Button>
                                </form>
                                <table className="admin-table">
                                    <thead>
                                    <tr className="admin-table-head">
                                        <th>Nr</th>
                                        <th>Naam</th>
                                        <th>Stal</th>
                                        <th>Dierenarts</th>
                                        <th>Telnr dierenarts</th>
                                        <th>voeding</th>
                                        <th>bodem</th>
                                        {/*<th>eigenaar</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {horses.length === 0 ?
                                        <tr>
                                            <td>Er zijn nog geen paarden. Keep the faith!</td>
                                        </tr>
                                        : horses.map((horse) => {
                                            return <tr key={horse.id} className="admin-table-body">
                                                <td>{horse.id}</td>
                                                <td>{horse.name}</td>
                                                {horse.stall ? <td>{horse.stall.name}</td> : <td>---</td>}
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
                                </table>
                            </div>
                        </article>}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Admin;