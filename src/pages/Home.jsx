import horse from '../assets/Paard-bewerkt-header.jpg'

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
                        {/*<div>  hier een div omheen ook al blijft onder elkaar ongeacht schermgrootte?*/}
                        <h2>Welkom bij pensionstal Blaze of Glory!</h2>
                        <p>Pensiostal Blaze of Glory is een 5-steren pensionstal waar niet alleen u, maar ook uw paard
                            een
                            ster is. Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. At consectetur corporis deleniti dolor, est necessitatibus
                            officiis pariatur sapiente sint temporibus. A alias animi commodi consectetur, consequatur
                            consequuntur deserunt doloremque doloribus eligendi eos error esse laborum maxime natus non
                            omnis pariatur possimus, quis ratione soluta ullam ut voluptates voluptatibus.
                        </p>
                        {/*</div>*/}
                        <div>
                            <span><img src="/" alt="foto-1"/></span>
                            <span><img src="/" alt="foto-2"/></span>
                            <span><img src="/" alt="foto-3"/></span>
                        </div>
                    </div>
                </section>
                {/*usp-section*/}
                <section className="outer-container usp-section">
                    <div className="inner-container">
                        <h2>Waarom Blaze of Glory?</h2>
                        <div>
                            <article><img src="/" alt="ster"/><p></p></article>
                            <article><img src="/" alt="ster"/><p></p></article>
                            <article><img src="/" alt="ster"/><p></p></article>
                            <article><img src="/" alt="ster"/><p></p></article>
                            <article><img src="/" alt="ster"/><p></p></article>
                        </div>
                        <img src="" alt=""/>
                        <button type="button">Abonneer hier</button>
                    </div>
                </section>
                {/*features-section*/}
                <section className="outer-container feature-section">
                    <div className="inner-container">
                        <h2>Welke voorzieningen?</h2>
                        <div>
                            <article></article>
                            <article></article>
                            <article></article>
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
