import paard from '../assets/Paard-bewerkt-header.jpg'

function Home() {


    return (
        <>
            <header className="header-section">
                <h2>Blaze of Glory</h2>
                <a href=""><img src="" alt="logo-blaze-of-glory"/>Blaze of Glory</a>
                <nav>
                    <ul>
                        <li><button type="button">home</button></li>
                        <li><button type="button">stallen</button></li>
                        <li><button type="button">abonnementen</button></li>
                        <li><button type="button">registreren</button></li>
                        <li><button type="button">inloggen</button></li>
                    </ul>
                </nav>
                <section>
                    <div>
                        <img src={paard} alt="paard close-up"/>
                    </div>
                    <div>
                        <h1>Blaze of Glory</h1>
                        <h2>Pensionstallen</h2>
                    </div>
                </section>
            </header>
            <main>
                {/*intro-section*/}
                <section>
                    {/*<div>  hier een div omheen ook al blijft onder elkaar ongeacht schermgrootte?*/}
                    <h2>Welkom bij pensionstal Blaze of Glory!</h2>
                    <p>Pensiostal Blaze of Glory is een 5-steren pensionstal waar niet alleen u, maar ook uw paard een
                        ster is. Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. At consectetur corporis deleniti dolor, est necessitatibus
                        officiis pariatur sapiente sint temporibus. A alias animi commodi consectetur, consequatur
                        consequuntur deserunt doloremque doloribus eligendi eos error esse laborum maxime natus non
                        omnis pariatur possimus, quis ratione soluta ullam ut voluptates voluptatibus.
                    </p>
                    {/*</div>*/}
                    <div>
                        <span><img src="" alt=""/></span>
                        <span><img src="" alt=""/></span>
                        <span><img src="" alt=""/></span>
                    </div>
                </section>
                {/*usp-section*/}
                <section>
                    <h2>Waarom Blaze of Glory?</h2>
                    <div>
                        <article></article>
                        <article></article>
                        <article></article>
                        <article></article>
                        <article></article>
                    </div>
                    <img src="" alt=""/>
                    <button type="button">Abonneer hier</button>
                </section>
                {/*features-section*/}
                <section>
                    <h2>Welke voorzieningen?</h2>
                    <div>
                        <article></article>
                        <article></article>
                        <article></article>
                    </div>

                </section>
                {/*testimonial-section*/}
                <section>
                    <h2>Testimonials</h2>
                    <div>
                        <article></article>
                        <article></article>
                        <article></article>
                    </div>
                    <img src="" alt=""/>
                    <button type="button">Abonneer hier</button>
                </section>
            </main>
            <footer>
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
                        Copyright pensionstal Blaze of Glory  |  mede mogelijk gemaakt door  Sportcentrum Nieuw-Vennep
                    </p>
                </section>
            </footer>
        </>
    )
}

export default Home
