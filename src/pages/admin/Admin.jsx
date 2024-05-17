import './Admin.css';
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


function Admin() {

    const [error, setError] = useState("");
    const [customers, setCustomers] = useState([]);
    const [horses, setHorses] = useState([]);
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

    async function fetchHorses() {
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/horses");
            console.log("hier zijn de paarden:", response);
            setHorses(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
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
        void fetchHorses();
        setDisplay("horses");
    }



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
                        >
                            maak nieuwe inschrijving
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
                        {display === "customers" && <article className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Klanten</h4>
                                {/*<Button*/}
                                {/*    type="button"*/}
                                {/*    text="wijzig"*/}
                                {/*/>*/}
                            </div>
                            <div className="overwiew-container">
                                <form className="radio-form" action="/">
                                    {customers.length > 0 && customers.map((customer) => {
                                        return < input
                                            key={customer.id}
                                            type="radio"
                                            name="customer"
                                            value={customer.id}
                                        />
                                    })}
                                    <Button
                                        type="submit"
                                        disabled={false}

                                    >kies klant</Button>
                                </form>
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
                                            <tr><td>Er zijn nog geen klanten. Keep the faith!</td></tr>
                                             : customers.map((customer) => {
                                        return <tr key={customer.id} className="admin-table-body">
                                            <td>{customer.id}</td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.firstName}</td>
                                            <td>{customer.residence}</td>
                                            <td>{customer.telephoneNumber}</td>
                                            <td>{customer.emailAddress}</td>
                                            <td>
                                                <button type="button" onClick={() => showCustomerDetail(customer.id)}>kies</button>
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
                                        <tr><td>Er zijn nog geen paarden. Keep the faith!</td></tr>
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