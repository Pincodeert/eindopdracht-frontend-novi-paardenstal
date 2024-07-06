import styles from'./Subscriptions.module.css';
import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SubscriptionTile from "../../components/subscriptionTile/SubscriptionTile.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SubscriptionContext} from "../../context/SubscriptionContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {generateAdminErrorString} from "../../helpers/generate ErrorString.js";
import NavLinkList from "../../components/navLinkList/NavLinkList.jsx";
import IntroSection from "../../components/introSection/IntroSection.jsx";
import {subscriptionsIntro} from "../../constants/introText.js";

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [availableStalls, setAvailableStalls] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, toggleIsLoading] = useState(false);
    // const [subscription, setSubscription] = useState({});

    const navigate = useNavigate();
    const {isAuth} = useContext(AuthContext);
    const {selectSubscription} = useContext(SubscriptionContext);

    ////// ALLE ABONNEMENTEN OPHALEN UIT DE BACKEND /////
    useEffect(() => {
        // const abortController = new AbortController();
        async function fetchSubscriptions() {
            setError("");
            toggleIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/subscriptions", {
                    // signal: abortController.signal,
                });
                setSubscriptions(response.data);
            } catch (error) {
                console.error(error);
                setError(generateAdminErrorString("het ophalen van de abonnementen", error.message));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchSubscriptions();
        // return function cleanup() {
        //     abortController.abort();
        // }
    }, [availableStalls]);

    // OPGEHAALDE ABONNEMENTEN FILTEREN OP BINNEN - EN BUITEN STALLEN (2x)
    const indoorSubscriptions = subscriptions.filter((subscription) => {
        return subscription.typeOfStall === "kleine binnenstal" || subscription.typeOfStall === "grote binnenstal";
    });

    const outdoorSubscriptions = subscriptions.filter((subscription) => {
        return subscription.typeOfStall === "kleine buitenstal" || subscription.typeOfStall === "grote buitenstal";
    });

    ////// ALLE BESCHIKBARE STALLEN OPHALEN UIT DE BACKEND /////
    useEffect(() => {
        // const abortController = new AbortController();
        async function fetchAvailableStalls() {
            setError("");
            toggleIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/stalls/isOccupied/false", {
                    // signal: abortController.signal,
                });
                setAvailableStalls(response.data);
            } catch (error) {
                console.error(error);
                console.log(error.response.status);
                setError(generateAdminErrorString(" het ophalen van de beschikbare stallen", error.message));
            } finally {
                toggleIsLoading(false);
            }
        }

        void fetchAvailableStalls();
        // return function cleanUp() {
        //     abortController.abort();
        // }
    }, []);

    // en nu een functie ervan maken die per map-ronde toegepast kan worden op de hele aray:
    function getAvailableStallsByType(typeOfStall) {
        const availableStallsByType = availableStalls.filter((stall) => {
            return stall.type === typeOfStall;
        });
        return availableStallsByType;
    }

    function handleSubscriptionClick(subscriptionId) {
        // e.preventDefault();
        selectSubscription(subscriptionId);
        // e.preventDefault();
        // const subscription = subscriptions[subscriptionId - 1];
        // setSubscription(subscription);
        // console.log(subscription);
        // navigate(`/inschrijven/${subscriptionId}`);
        if (isAuth) {
            navigate(`/inschrijven/${subscriptionId}`)
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar>
                        <NavLinkList/>
                    </NavBar>
                    <HeaderContent/>
                    {/*<a href="./Stalls.jsx">Naar stallen</a>*/}
                </div>
            </header>
            <main>
                <IntroSection
                    title="Onze abonnementen en tarieven"
                    text={subscriptionsIntro}
                />
                <section className="outer-container ">
                    <div className="inner-container">
                        <h2 className={styles["indoor-title"]}>Binnen Stal Abonnementen</h2>
                        {isLoading &&
                            <p>Loading...</p>}
                        {error &&
                            <p className="error">{error}</p>}
                        {indoorSubscriptions.length > 0 &&
                            <div className={styles["subscription-article-wrapper"]}>
                                {indoorSubscriptions.map((indoorSubscription) => {
                                    return <SubscriptionTile
                                        title={indoorSubscription.name}
                                        stallType={indoorSubscription.typeOfStall}
                                        careType={indoorSubscription.typeOfCare}
                                        price={indoorSubscription.price}
                                        isSoldOut={getAvailableStallsByType(indoorSubscription.typeOfStall).length === 0}
                                        key={indoorSubscription.id}
                                        handleSubscriptionClick={() => handleSubscriptionClick(indoorSubscription.id)}
                                    />
                                })}
                            </div>}
                    </div>
                </section>
                <section className="outer-container">
                    <div className="inner-container">
                        <h2 className={styles["outdoor-title"]}>Buiten Stal Abonnementen</h2>
                        {isLoading &&
                            <p>Loading...</p>}
                        {error &&
                            <p className="error">{error}</p>}
                        {outdoorSubscriptions.length > 0 &&
                            <div className={styles["subscription-article-wrapper"]}>
                                {outdoorSubscriptions.map((outdoorSubscription) => {
                                    return <SubscriptionTile
                                        title={outdoorSubscription.name}
                                        stallType={outdoorSubscription.typeOfStall}
                                        careType={outdoorSubscription.typeOfCare}
                                        price={outdoorSubscription.price}
                                        isSoldOut={getAvailableStallsByType(outdoorSubscription.typeOfStall).length === 0}
                                        key={outdoorSubscription.id}
                                        handleSubscriptionClick={() => handleSubscriptionClick(outdoorSubscription.id)}
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