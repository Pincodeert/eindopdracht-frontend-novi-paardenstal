import './Home.css';
import horse from '../assets/Paard-bewerkt-header.jpg'
import almeria1 from '../assets/Almeria-1.JPG';
import almeria2 from '../assets/Almeria-2.JPG';
import almeria5 from '../assets/Almeria-5.JPG';
import nico from '../assets/Nico-wijs.jpg';
import star from '../assets/ster-image.jpg';
import stable from '../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg';
import straw from '../assets/ben-shbeeb-HyTvVA8Ye8I-unsplash.jpg';
import quoteup from '../assets/quotes-up.jpg';
import quotedown from '../assets/quotes-down.jpg';
import Button from "../components/Button.jsx";
import button from "../components/Button.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Usp from "../components/Usp.jsx";

function Home() {

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
                    <div className="header-content-wrapper">
                        <span className="header-content-image">
                            <img src={horse} alt="Original image by Taylor Brandon"/>
                        </span>
                        <div className="header-content-title">
                            <h1>Blaze of Glory</h1>
                            <h2>Pensionstallen</h2>
                        </div>
                    </div>
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
                            <article className="feature-article" >
                                <div className="feature-text">
                                    <h3>Onze stallen</h3>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test-plaatje"/>
                                        <p>binnenstal klein (3x4) en groot (4x4)</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test-plaatje"/>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test"/>
                                        <p>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test"/>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div className="feature-image">
                                    <span>
                                    <img src={stable} alt="Image by Anna Kaminova-Unsplashed"/>
                                    </span>
                                    <button>naar de stallen</button>
                                </div>
                            </article>
                            <article className="feature-article reversed-direction">
                                <div className="feature-text">
                                    <h3>Onze stallen</h3>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test-plaatje"/>
                                        <p>binnenstal klein (3x4) en groot (4x4)</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test-plaatje"/>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test"/>
                                        <p>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div className="feature-text-item">
                                        <img src={star} alt="test"/>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div className="feature-image">
                                    <span>
                                    <img src={straw} alt="Image by Ben shbeen-Unsplashed"/>
                                    </span>
                                    <button>naar de stallen</button>
                                </div>
                            </article>
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
                            <article className="testimonial-article">
                                <div className="quote-wrapper">
                                    <img src={quoteup} alt="quote-icon"/>
                                    <p>
                                        This place is really a Paradise City for horses. The grass is green
                                        and the horses are pretty.
                                    </p>
                                    <img src={quotedown} alt="quote-icon"/>
                                </div>
                                <p>-- Axl Rose --</p>
                            </article>
                            <article className="testimonial-article">
                                <div className="quote-wrapper">
                                    <img src={quoteup} alt="quote-icon"/>
                                    <p>I was drowned, washed up. But its allright now. It's great to be here with
                                        Jumping
                                        Jack and get some satisfaction. </p>
                                    <img src={quotedown} alt="quote-icon"/>
                                </div>
                                <p>-- Mick Jagger --</p>
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
    )
}

export default Home
