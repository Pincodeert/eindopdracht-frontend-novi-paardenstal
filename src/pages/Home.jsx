import horse from '../assets/Paard-bewerkt-header.jpg'
import almeria1 from '../assets/Almeria-1.JPG';
import almeria2 from '../assets/Almeria-2.JPG';
import almeria3 from '../assets/Almeria-3.JPG';
import almeria4 from '../assets/Almeria-4.JPG';
import almeria5 from '../assets/Almeria-5.JPG';
import nico from '../assets/Nico-wijs.jpg';
import star from '../assets/ster-image.jpg';
import stable from '../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg';

function Home() {


    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <nav className="header-navigation">
                        <h2>Blaze of Glory</h2>
                        {/*<a href=""><img src="" alt="logo-blaze-of-glory"/>Blaze of Glory</a>*/}
                        <ul>
                            <li>
                                <button type="button">home</button>
                            </li>
                            <li>
                                <button type="button">stallen</button>
                            </li>
                            <li>
                                <button type="button">abonnementen</button>
                            </li>
                            <li>
                                <button type="button">registreren</button>
                            </li>
                            <li>
                                <button type="button">inloggen</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-content-wrapper">
                        <span className="header-content-image">
                            <img src={horse} alt="Original image by Taylor Brandon"/>
                        </span>
                        <div className="header-content-logo">
                            <h1>Blaze of Glory</h1>
                            <h2>Pensionstallen</h2>
                        </div>
                        <div className="header-content-dummy">
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
                            <article className="usp-article">
                                <img src={star} alt="ster"/>
                                <p>Comfortabele Binnen en Buiten Stallen</p>
                            </article>
                            <article className="usp-article">
                                <img src={star} alt="ster"/>
                                <p>Keuze uit Half of Vol Pension</p>
                            </article>
                            <article className="usp-article">
                                <img src={star} alt="ster"/>
                                <p>Glorieuze Buitenweide in een country-setting</p>
                            </article>
                            <article className="usp-article">
                                <img src={star} alt="ster"/>
                                <p>Sterren-behandeling ook voor uw paarde(en)</p>
                            </article>
                            <article className="usp-article">
                                <img src={star} alt="ster"/>
                                <p>Eenvoudige online aanmelding en afmelding</p>
                            </article>
                        </div>
                        <div className="usp-button">
                        <img src={nico} alt="foto-by-Leonie-Pin"/>
                        <button type="button">Abonneer</button>
                        </div>
                    </div>
                </section>
                {/*features-section*/}
                <section className="outer-container feature-section">
                    <div className="inner-container">
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
                                    <img src={stable} alt="Image by Anna Kaminova-Unsplashed"/>
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
                        <h2>Testimonials</h2>
                        <div>
                            <article></article>
                            <article></article>
                            <article></article>
                        </div>
                        <img src="" alt=""/>
                        <button type="button">Abonneer hier</button>
                    </div>
                </section>
            </main>
            <footer className="outer-container footer-section">
                <div className="inner-container">
                    <section>
                        <img src="" alt=""/>
                        <div>
                            <article></article>
                            <article></article>
                            <article></article>
                        </div>
                        <div>
                            <img src="" alt=""/>
                            <img src="" alt=""/>
                            <img src="" alt=""/>
                        </div>
                    </section>
                    <section>
                        <p>
                            Copyright pensionstal Blaze of Glory | mede mogelijk gemaakt door Sportcentrum Nieuw-Vennep
                        </p>
                    </section>
                </div>
            </footer>
        </>
    )
}

export default Home
