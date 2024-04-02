import './Subscriptions.css';

import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import SubscriptionTile from "../../components/subscriptionTile/SubscriptionTile.jsx";
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
                            <SubscriptionTile
                                title="Rataplan Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="grote binnen stal"
                                textline2="volpension"
                                textline3="inclusief extra's"
                                textline4="vele extra's"
                                price="345"
                                remark="niet meer beschikbaar"
                                classname="visible"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="default"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="visible"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="default"
                            />
                        </div>
                    </div>
                </section>
                <section className="outer-container subscription-section">
                    <div className="inner-container">
                        <h2>Binnen Stal Abonnementen</h2>
                        <div className="subscription-article-wrapper">
                            <SubscriptionTile
                                title="Rataplan Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="grote binnen stal"
                                textline2="volpension"
                                textline3="inclusief extra's"
                                textline4="vele extra's"
                                price="345"
                                remark="niet meer beschikbaar"
                                classname="visible"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="default"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="visible"
                            />
                            <SubscriptionTile
                                title="Lucky Luke Abonnement"
                                image={star}
                                imageinfo="star"
                                textline1="kleine binnen stal"
                                textline2="halfpension"
                                textline3="inclusief verzorging"
                                textline4="maandelijks opzegbaar"
                                price="385"
                                remark="niet meer beschikbaar"
                                classname="default"
                            />
                        </div>

                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscriptions;