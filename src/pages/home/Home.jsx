import './Home.css';
import almeria1 from '../../assets/Almeria-1.JPG';
import almeria2 from '../../assets/Almeria-2.JPG';
import almeria5 from '../../assets/Almeria-5.JPG';
import nico from '../../assets/Nico-wijs.jpg';
import star from '../../assets/ster-image.jpg';
import stable from '../../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg';
import straw from '../../assets/ben-shbeeb-HyTvVA8Ye8I-unsplash.jpg';
import Button from "../../components/button/Button.jsx";
import button from "../../components/button/Button.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Usp from "../../components/usp/Usp.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Testimonial from "../../components/testimonial/Testimonial.jsx";
import Feature from "../../components/feature/Feature.jsx";
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();
// function logClick() {
//     console.log("YEZZZ!")
// }
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
                {/*intro-section*/}
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="intro-text-wrapper">
                            <h2>Welkom bij pensionstal Blaze of Glory!</h2>
                            <p>Pensiostal Blaze of Glory is een 5-steren pensionstal waar niet alleen u, maar ook uw paard
                                een
                                ster is. Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. At consectetur corporis deleniti dolor, est necessitatibus
                                officiis pariatur sapiente sint temporibus. A alias animi commodi consectetur, consequatur
                                consequuntur deserunt doloremque doloribus eligendi eos error esse laborum maxime natus non
                                omnis pariatur possimus, quis ratione soluta ullam ut voluptates voluptatibus.
                            </p>
                                <div>
                                    <img className="star-image" src={star} alt="ster"/>
                                    <img className="star-image" src={star} alt="ster"/>
                                    <img className="star-image" src={star} alt="ster"/>
                                </div>
                        </div>
                        <div className="intro-image-wrapper">
                            <span className="intro-image">
                                <img src={almeria1} alt="foto-by-Nico-Houweling"/>
                            </span>
                            <span className="intro-image">
                                <img src={almeria2} alt="foto-by-Nico-Houweling"/>
                            </span>
                            <span className="intro-image">
                                <img src={almeria5} alt="foto-by-Nico-Houweling"/>
                            </span>
                        </div>
                    </div>
                </section>
                {/*usp-section*/}
                <section className="outer-container usp-section">
                    <div className="inner-container">
                        <h2>Waarom Blaze of Glory?</h2>
                        <div className="usp-article-wrapper">
                            <Usp
                                text="Comfortabele Binnen en Buiten Stallen"
                            />
                            <Usp
                                text="Keuze uit Half of Vol Pension"
                            />
                            <Usp
                                text="Glorieuze Buitenweide in een country-setting"
                            />
                            <Usp
                                text="Sterren-behandeling ook voor uw paarde(en)"
                            />
                            <Usp
                                text="Eenvoudige online aanmelding en afmelding"
                            />
                        </div>
                        <div className="usp-button">
                        <img src={nico} alt="foto-by-Leonie-Pin"/>
                            <Button
                            type={button}
                            text="Abonneer"
                            handleClick={() => navigate("/abonnementen")}
                            classname="high-lighted"
                            />
                        </div>
                    </div>
                </section>
                {/*features-section*/}
                <section className="outer-container feature-section">
                    <div className="inner-container test">
                        <div className="title-wrapper">
                            <img className="star-image" src={star} alt="ster-icoon"/>
                            <h2>Welke voorzieningen?</h2>
                            <img className="star-image" src={star} alt="ster-iccon"/>
                        </div>
                        <div className="feature-article-wrapper">
                            <Feature
                                title="Onze stallen"
                                item1="binnenstal klein en groot"
                                item2="lorem ipsum"
                                item3="marcus servus est"
                                item4="in vino veritas est"
                                image={stable}
                                info="Image by Anna Kaminova-Unsplashed"
                                linkText="naar onze stallen"
                                event="hier komt een link"
                                classname="feature-article"
                            />
                            <Feature
                                title="Onze abonnementen en tarieven"
                                item1="functio laesa"
                                item2="scientia vincere tenebras"
                                item3="ubi pus ibi evacua"
                                item4="tumor dolor calor rubor"
                                image={straw}
                                info="Image by Ben shbeen-Unsplashed"
                                linkText="naar onze abonnementen en tarieven"
                                event="hier komt een link"
                                classname="feature-article reversed-direction"
                            />

                            <Feature
                                title="Onze Extra's"
                                item1="ad fundum"
                                item2="ora et labora"
                                item3="decompensatio cordis"
                                item4="contusio cerebri"
                                image={stable}
                                info="Image by Anna Kaminova-Unsplashed"
                                linkText="naar onze extra's"
                                event="hier komt een link"
                                classname="feature-article"
                            />
                        </div>
                    </div>
                </section>
                {/*testimonial-section*/}
                <section className="outer-container testimonial-section">
                    <div className="inner-container">
                        <div className="title-wrapper">
                            <img className="star-image" src={star} alt="ster-icoon"/>
                            <h2>Testimonials</h2>
                            <img className="star-image" src={star} alt="ster-iccon"/>
                        </div>
                        <div className="testimonial-article-wrapper">
                            <Testimonial
                                text="This place is really a Paradise City for horses. The grass is green
                                        and the horses are pretty."
                                author="Axl Rose"
                            />
                            <Testimonial
                                text="I was drowned, washed up. But its allright now. It's great to be here with
                                        Jumping
                                        Jack and get some satisfaction."
                                author="Mick Jagger"
                            />
                            <Testimonial
                                text="Whenever my head gets weary, I'm going down to Blaze of Glory."
                                author="Jon Bon Jovi"
                            />
                        </div>
                        <div className="usp-button">
                            <img src={nico} alt="foto-by-Leonie-Pin"/>
                            <Button
                                type={button}
                                text="Abonneer"
                                handleClick={() => navigate("/abonnementen")}
                                classname="high-lighted"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Home
