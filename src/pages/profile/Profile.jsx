import "./Profile.css"
import Button from "../../components/button/Button.jsx";
// import axl, {enrollments} from "../../constants/testdata.js";
import initialsName, {formatPrice} from "../../helpers/helpers.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import calculateCustomersPrice from "../../helpers/calculateCustomersPrice.js";
import axios from "axios";
import {useEffect, useState} from "react";
// import {i} from "vite/dist/node/types.d-FdqQ54oU.js";

function Profile() {
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [horseList, setHorseList] = useState([]);
    // const [enrollmentList, setEnrollmentList] = useState([]);
    const [enrollmentList, setEnrollmentList] = useState([]);
    const [stall, setStall] = useState({});

    const navigate = useNavigate();
    const{customerProfileId} = useParams();
        console.log(customerProfileId);


    //// klantprofiel ophalen uit de backend by Id ////
    useEffect(() => {
        async function fetchCustomerProfile(customerProfileId){
            setError("");

            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}`);
                const customer = response.data;
                console.log(customer);
                setProfile(customer);
                setHorseList([
                    customer.horses
                ]);
                setEnrollmentList([
                    customer.enrollments,
                ]);

            } catch(error) {
                console.error(error);
                setError("Uw klantgegevens kunnen niet worden opgehaald")
            }
        }
        void fetchCustomerProfile(customerProfileId);
    }, []);


    // //paarden ophalen uit backend
    // async function fetchHorsesByCustomer(id){
    //     try {
    //         const response = await axios.get("http://localhost:8080/horses/customerprofile", {
    //             "id": {id},
    //         }, {});
    //         const paarden = response.data;
    //         console.log(paarden);
    //         // setEnrollmentList(enrollments);
    //     } catch(error) {
    //         console.error(error);
    //         setError("uw paardgegevens kunnen niet worden opgehaald")
    //     }
    // }




    //// inschrijvingen van klant ophalen (uit backend) //////
    useEffect(() => {
        async function fetchEnrollementsByCustomer(customerProfileId){
            setError("");
            try {
                const response = await axios.get(`http://localhost:8080/customerprofiles/${customerProfileId}/enrollments`);
                const enrollments = response.data;
                // console.log(enrollments);
                setEnrollmentList(enrollments);
            } catch(error) {
                console.error(error);
                setError("uw abonnementgegevens kunnen niet worden opgehaald")
            }
        }
        void fetchEnrollementsByCustomer(customerProfileId)
    }, []);


    //// stallen ophalen uit de backend (omdat daar de koppeling met het paard zit/////
    useEffect(() => {
        async function fetchStall(horseId){
            setError("");

            try {
                const response = await axios.get("http://localhost:8080/stalls");
                const stalls = response.data;
                console.log("stallen", stalls);
                const stall = stalls.find((stall) => {
                    return stall.horse.id === horseId;
                });
                setStall(stall);
            } catch(error) {
                console.error(error);
                setError("de stalgegevens kunnen niet worden opgehaald")
            }
        }
        void fetchStall(1)
    }, []);

    console.log("dit is de lijst met paarden", horseList);
    // console.log(enrollmentList);
    console.log("dit is de bewust stal: ", stall);

    return (
        <>
            <header>
                <section className="outer-container">
                    <div className="inner-container inverted-header">
                        <nav className="header-navigation">
                            {/*<h2>Blaze of Glory</h2>*/}
                            <Link to="/"><h2>Blaze of Glory</h2></Link>
                            <div className="profile-icon">{Object.keys(profile).length > 0 && initialsName(profile.firstName, profile.lastName)}</div>
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
                            {/*<button type="button" onClick={() => fetchCustomerProfile(customerProfileId)}>haal klantgegegevens op</button>*/}
                            {/*    {error && <p className="error">{error}</p>}*/}
                            {/*<button type="button" onClick={() => fetchEnrollementsByCustomer(customerProfileId)}>haal abonnement gegevens op</button>*/}
                            {/*    {error && <p className="error">{error}</p>}*/}
                            {/*<button type="button" onClick={() => fetchStall(1)}>haal stallen op</button>*/}
                            {/*{error && <p className="error">{error}</p>}*/}

                        </div>
                        <article id="yourpersonalia" className="content-wrapper persona">
                            <div className="content-title">
                                <h4>Uw gegevens</h4>
                                <Button
                                    type="button"
                                    disabled={false}
                                    note="hier moet een formulier verschijnen"
                                >
                                    wijzig
                                </Button>
                            </div>
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
                                <tbody>
                                <tr className="table-body">
                                    <td>{profile.street}</td>
                                    <td>{profile.houseNumber}</td>
                                    <td>{profile.postalCode}</td>
                                    <td>{profile.residence}</td>
                                    <td>{profile.telephoneNumber}</td>
                                    <td>{profile.emailAddress}</td>
                                    <td>{profile.bankAccountNumber}</td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                        <article id="yourhorses" className="content-wrapper horses">
                            <div className="content-title">
                                <h4>Uw paarden</h4>
                                {/*<button type="button" onClick={() => getHorses(profile.id)}></button>*/}
                            </div>
                            {horseList.length === 0 ? <p>U heeft nog geen paarden toegevoegd</p> : horseList[0].map((horse) => {
                                return <div key={horse.id} className="horse-wrapper">
                                    <div className="head-line">
                                        <p className="horsename">{horse.name}</p>
                                        <Button
                                            type="button"
                                            disabled={false}
                                            note="hier moet een paard-formulier verschijnen"
                                        >
                                            wijzig
                                        </Button>
                                    </div>
                                    <table className="table">
                                        <thead>
                                        <tr className="table-head">
                                            <th>paardnummer</th>
                                            <th>type voeding</th>
                                            <th>type boedembedekking</th>
                                            <th>naam dierenarts</th>
                                            <th>woonplaats dierenarts</th>
                                            <th>telefoonnummer dierenarts</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="table-body">
                                            <td>{horse.horseNumber}</td>
                                            <td>{horse.typeOfFeed}</td>
                                            <td>{horse.typeOfBedding}</td>
                                            <td>{horse.nameOfVet}</td>
                                            <td>{horse.residenceOfVet}</td>
                                            <td>{horse.telephoneOfVet}</td>
                                        </tr>
                                        </tbody>
                                    </table>
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
                                            {stall.name && <td>{stall.name} </td>}
                                            <td>{<Button type="button" disabled={false} note="hier komt toon file">
                                                bekijk </Button>}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            })}
                        </article>
                        <article id="yoursubscriptions" className="content-wrapper subscriptions">
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
                            {enrollmentList.length === 0 ? <p>U heeft nog geen abonnementen</p> : enrollmentList.map((enrollment) => {
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
                                            <th>paard</th>
                                            <th>stalnaam</th>
                                            <th>type stal</th>
                                            <th>type verzorging</th>
                                            <th>start-datum</th>
                                            <th>annulering aangevraagd</th>
                                            <th>prijs</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="table-body">
                                            {enrollment.subscription && <td>{enrollment.subscription.name}</td>}
                                            {enrollment.horse && <td>{enrollment.horse.name}</td>}
                                            {stall.name && <td>{stall.name} </td>}
                                            {stall.type && <td>{stall.type}</td>}
                                            {enrollment.subscription && <td>{enrollment.subscription.typeOfCare}</td>}
                                            {enrollment.startDate && <td>{enrollment.startDate}</td>}
                                            {enrollment.cancellationRequested ? <td>ja</td> : <td>nee</td>}
                                            {enrollment.subscription && <td>{formatPrice(enrollment.subscription.price)}</td>}
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