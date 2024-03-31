import './Subscriptions.css';

import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import Usp from "../../components/usp/Usp.jsx";
import nico from "../../assets/Nico-wijs.jpg";
import Button from "../../components/button/Button.jsx";
import button from "../../components/button/Button.jsx";
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
                            <article className="subscription-article">
                                <h2>Lucky Luke Abonnement</h2>
                                {/*<Strawicon/>*/}
                                {/*<Hay/>*/}
                                <img src={star} alt="ster"/>
                                <div className="subscription-text-wrapper">
                                    <p>kleine binnenstal</p>
                                    <p>half pension</p>
                                    <p>inclusief verzorging</p>
                                    <p>maandelijks opzegbaar</p>
                                </div>
                                <p>€345,-</p>
                                <p>laatste stallen</p>
                                <Button
                                    type="button"
                                    text="Neem dit abonnement"
                                />
                            </article>
                            <article className="subscription-article">
                                <h2>Lucky Luke Abonnement</h2>
                                {/*<Strawicon/>*/}
                                {/*<Hay/>*/}
                                <img src={star} alt="ster"/>
                                <div className="subscription-text-wrapper">
                                    <p>kleine binnenstal</p>
                                    <p>half pension</p>
                                    <p>inclusief verzorging</p>
                                    <p>maandelijks opzegbaar</p>
                                </div>
                                <p>€345,-</p>
                                <p>laatste stallen</p>
                                <Button
                                    type="button"
                                    text="Neem dit abonnement"
                                />
                            </article>
                            <article className="subscription-article">
                                <h2>Lucky Luke Abonnement</h2>
                                {/*<Strawicon/>*/}
                                {/*<Hay/>*/}
                                <img src={star} alt="ster"/>
                                <div className="subscription-text-wrapper">
                                    <p>kleine binnenstal</p>
                                    <p>half pension</p>
                                    <p>inclusief verzorging</p>
                                    <p>maandelijks opzegbaar</p>
                                </div>
                                <p>€345,-</p>
                                <p>laatste stallen</p>
                                <Button
                                    type="button"
                                    text="Neem dit abonnement"
                                />
                            </article>
                            <article className="subscription-article">
                                <h2>Lucky Luke Abonnement</h2>
                                {/*<Strawicon/>*/}
                                {/*<Hay/>*/}
                                <img src={star} alt="ster"/>
                                <div className="subscription-text-wrapper">
                                    <p>kleine binnenstal</p>
                                    <p>half pension</p>
                                    <p>inclusief verzorging</p>
                                    <p>maandelijks opzegbaar</p>
                                </div>
                                <p>€345,-</p>
                                <p>laatste stallen</p>
                                <Button
                                    type="button"
                                    text="Neem dit abonnement"
                                />
                            </article>
                        </div>
                        <div className="usp-button">
                            <img src={nico} alt="foto-by-Leonie-Pin"/>
                            <Button
                                type={button}
                                text="Abonneer"
                                classname="high-lighted"
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