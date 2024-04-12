import './Subscriptions.css';

import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import SubscriptionTile from "../../components/subscriptionTile/SubscriptionTile.jsx";
import {indoorSubscriptions, outdoorSubscriptions} from "../../constants/testdata.js";
// import {ReactComponent as Strawicon} from '../../assets/Strawicon.svg';
// import {ReactComponent as Hay} from "../../assets/Hay.svg";

function Subscriptions() {
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
                        <div className="subscription-article-wrapper">
                            {indoorSubscriptions.map((indoorSubscription) => {
                                return <SubscriptionTile
                                            title={indoorSubscription.name}
                                            image={star}
                                            imageinfo="star"
                                            textline1={indoorSubscription.typeOfStall}
                                            textline2={indoorSubscription.typeOfCare}
                                            textline3="inclusief extra's"
                                            textline4="vele extra's"
                                            price={indoorSubscription.price}
                                            remark="niet meer beschikbaar"
                                            classname="visible"
                                            key={indoorSubscription.subscriptionId}
                                        />
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className="outer-container subscription-section">
                    <div className="inner-container">
                        <h2>Buiten Stal Abonnementen</h2>
                        <div className="subscription-article-wrapper">
                            {outdoorSubscriptions.map((outdoorSubscription) => {
                                return <SubscriptionTile
                                            title={outdoorSubscription.name}
                                            image={star}
                                            imageinfo="star"
                                            textline1={outdoorSubscription.typeOfStall}
                                            textline2={outdoorSubscription.typeOfCare}
                                            textline3="inclusief extra's"
                                            textline4="vele extra's"
                                            price={outdoorSubscription.price}
                                            remark="niet meer beschikbaar"
                                            classname="default"
                                            key={outdoorSubscription.subscriptionId}
                                        />
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscriptions;