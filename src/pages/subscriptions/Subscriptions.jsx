import './Subscriptions.css';

import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import SubscriptionTile from "../../components/subscriptionTile/SubscriptionTile.jsx";
import {beschikbareStallen, indoorSubscriptions, outdoorSubscriptions} from "../../constants/testdata.js";
import {abonnementen} from "../../constants/testdata.js";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import {s} from "vite/dist/node/types.d-FdqQ54oU.js";
// import {ReactComponent as StrawIcon} from '../../assets/strawIcon.svg';
// import { ReactComponent as Hay } from '../../assets/Hay.svg';
// import {ReactComponent as Hay} from "../../assets/Hay.svg";

function Subscriptions() {
    const navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);
    const [availableStalls, setAvailableStalls] = useState([]);

    const [subscription, setSubscription] = useState({});

    ////// ALLE ABONNEMENTEN OPHALEN UIT DE BACKEND /////
    async function fetchSubscriptions() {
        try {
            const response = await axios.get("/subscriptions");
            console.log(response.data);
            setAvailableStalls(response.data);
        } catch(error) {
            console.error(error);
            console.log(error.response.status);
        }
    }

    // OPGEHAALDE ABONNEMENTEN FILTEREN OP BINNEN - EN BUITEN STALLEN (2x)

    const binnenAbonnementen = abonnementen.filter((abonnement) => {
        return abonnement.typeOfStall === "kleine binnenstal" || abonnement.typeOfStall === "grote binnenstal";
    });
    console.log(binnenAbonnementen);

    const buitenAbonnementen = abonnementen.filter((abonnement) => {
        return abonnement.typeOfStall === "kleine buitenstal" || abonnement.typeOfStall === "grote buitenstal";
    });
    console.log(buitenAbonnementen);

    ////// ALLE BESCHIKBARE STALLEN OPHALEN UIT DE BACKEND /////

    // {isOccupied} = false
    async function fetchAvailableStalls() {
        try {
            const response = await axios.get("/stalls/isOccupied/{isOccupied}");
            console.log(response.data);
            setSubscriptions(response.data);
        } catch (error) {
            console.error(error);
            console.log(error.response.status);
        }
    }

    // OPGEHAALDE BESCHIKBARE STALLEN FILTEREN OP TYPE (4x)
    const beschikbareKleineBinnenStallen = beschikbareStallen.filter((stal) => {
        return stal.type === "kleine binnenstal";
    });
    console.log(beschikbareKleineBinnenStallen);

    // const beschikbareGroteBinnenstallen = beschikbareStallen.filter((stal) => {
    //     return stal.type === "grote binnenstal";
    // });
    // console.log(beschikbareGroteBinnenstallen);
    //
    // const beschikbareKleineBuitenStallen = beschikbareStallen.filter((stal) => {
    //     return stal.type === "kleine buitenstal";
    // });
    // console.log(beschikbareKleineBuitenStallen);
    //
    // const beschikbareGroteBuitenStallen = beschikbareStallen.filter((stal) => {
    //     return stal.type === "grote buitenstal";
    // });
    // console.log(beschikbareGroteBuitenStallen);

    // en nu een functie ervan maken die per map-ronde toegepast kan worden op de hele aray:
    function getBeschikbareStallenByType (typeOfStall) {
        const beschikbareStallenByType = beschikbareStallen.filter((stal) => {
            return stal.type === typeOfStall;
        });
        return beschikbareStallenByType;
    }


    function handleSubscriptionClick(abonnementId) {
        // e.preventDefault();
        const abonnement = abonnementen[abonnementId - 1];
        setSubscription(abonnement);
        console.log(abonnement);
        navigate(`/inschrijven/${abonnementId}`);

    }
    console.log(subscription);

    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar
                        classname="header-navigation"
                    />
                    <HeaderContent/>
                    {/*<a href="./Stalls.jsx">Naar stallen</a>*/}
                </div>
            </header>
            <main>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="intro-text-wrapper">
                            <h2>Onze abonnementen en tarieven</h2>
                            <p>Bij Pensiostal Blaze of Glory kunt u kiezen uit maar liefts 2 uitstekende
                                verzorgingsniveaus Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit. At consectetur corporis deleniti dolor,
                                est necessitatibus officiis pariatur sapiente sint temporibus.
                            </p>
                            {/*<StrawIcon className="straw-icon" />*/}
                            {/*<Hay />*/}
                            <div>
                                <img className="star-image" src={star} alt="ster"/>
                                <img className="star-image" src={star} alt="ster"/>
                                <img className="star-image" src={star} alt="ster"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="outer-container subscription-section">
                    <div className="inner-container">
                        <h2>Binnen Stal Abonnementen</h2>
                        {binnenAbonnementen.length > 0 && <div className="subscription-article-wrapper">
                            {binnenAbonnementen.map((binnenAbonnement) => {
                                return <SubscriptionTile
                                    title={binnenAbonnement.name}
                                    image={star}
                                    // image={subscription.subscriptionId}
                                    imageinfo="star"
                                    textline1={binnenAbonnement.typeOfStall}
                                    textline2={binnenAbonnement.typeOfCare}
                                    textline3="inclusief extra's"
                                    // textline4="vele extra's"
                                    textline4={binnenAbonnement.id}
                                    price={binnenAbonnement.price}
                                    remark="niet meer beschikbaar"
                                    // classname="visible"
                                    isSoldOut={getBeschikbareStallenByType(binnenAbonnement.typeOfStall).length === 0}
                                    key={binnenAbonnement.subscriptionId}
                                    handleSubscriptionClick={() => handleSubscriptionClick(binnenAbonnement.id)}
                                />
                            })}
                            </div>}
                    </div>
                </section>
                <section className="outer-container subscription-section">
                    <div className="inner-container">
                        <h2>Buiten Stal Abonnementen</h2>
                        {buitenAbonnementen.length > 0 && <div className="subscription-article-wrapper">
                             {buitenAbonnementen.map((buitenAbonnement) => {
                                return <SubscriptionTile
                                    title={buitenAbonnement.name}
                                    image={star}
                                    // image={subscription.subscriptionId}
                                    imageinfo="star"
                                    textline1={buitenAbonnement.typeOfStall}
                                    textline2={buitenAbonnement.typeOfCare}
                                    textline3="inclusief extra's"
                                    textline4="vele extra's"
                                    price={buitenAbonnement.price}
                                    remark="niet meer beschikbaar"
                                    // classname="visible"
                                    isSoldOut={getBeschikbareStallenByType(buitenAbonnement.typeOfStall).length === 0}
                                    key={buitenAbonnement.id}
                                    handleSubscriptionClick={() => handleSubscriptionClick(buitenAbonnement.id)}
                                />
                            })}
                        </div>}
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscriptions;