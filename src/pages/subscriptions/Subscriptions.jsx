import './Subscriptions.css';

import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import SubscriptionTile from "../../components/subscriptionTile/SubscriptionTile.jsx";
import {indoorSubscriptions, outdoorSubscriptions} from "../../constants/testdata.js";
// import {s} from "vite/dist/node/types.d-FdqQ54oU.js";
// import {ReactComponent as StrawIcon} from '../../assets/strawIcon.svg';
// import { ReactComponent as Hay } from '../../assets/Hay.svg';
// import {ReactComponent as Hay} from "../../assets/Hay.svg";

function Subscriptions() {

    function createSubcriptionsSubCatalog(subcriptions) {
        const subscriptionsSubCatalog = subcriptions.map((subscription) => {
            return <SubscriptionTile
                title={subscription.name}
                image={star}
                // image={subscription.subscriptionId}
                imageinfo="star"
                textline1={subscription.typeOfStall}
                textline2={subscription.typeOfCare}
                textline3="inclusief extra's"
                textline4="vele extra's"
                price={subscription.price}
                remark="niet meer beschikbaar"
                // classname="visible"
                isSoldOut={false}
                key={subscription.subscriptionId}
            />
        });
        return subscriptionsSubCatalog;
    }

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
                        <div className="subscription-article-wrapper">
                            {createSubcriptionsSubCatalog(indoorSubscriptions)}
                        </div>
                    </div>
                </section>
                <section className="outer-container subscription-section">
                    <div className="inner-container">
                        <h2>Buiten Stal Abonnementen</h2>
                        <div className="subscription-article-wrapper">
                            {createSubcriptionsSubCatalog(outdoorSubscriptions)}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscriptions;