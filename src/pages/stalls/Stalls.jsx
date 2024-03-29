import './Stalls.css';
import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import almeria1 from "../../assets/Almeria-1.JPG";
import almeria2 from "../../assets/Almeria-2.JPG";
import almeria5 from "../../assets/Almeria-5.JPG";
import Feature from "../../components/feature/Feature.jsx";
import stable from "../../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg";
import straw from "../../assets/ben-shbeeb-HyTvVA8Ye8I-unsplash.jpg";

function Stalls() {
    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar
                        classname="header-navigation"
                    />
                    <HeaderContent />
                </div>
            </header>
            <main>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="intro-text-wrapper">
                            <h2>Maak kennis met onze stallen</h2>
                            <p>Onze stallen kenmerken zich door consectetur adipisicing elit. At consectetur corporis
                                deleniti dolor, est necessitatibus officiis pariatur sapiente sint temporibus. A alias
                                animi commodi consectetur, consequatur consequuntur deserunt doloremque doloribus
                                eligendi eos error esse laborum maxime natus non omnis pariatur possimus, quis ratione
                                soluta ullam ut voluptates voluptatibus.
                            </p>
                            <div>
                                <img className="star-image" src={star} alt="ster"/>
                                <img className="star-image" src={star} alt="ster"/>
                                <img className="star-image" src={star} alt="ster"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="outer-container feature-section">
                    <div className="inner-container colored">
                        <div className="title-wrapper">
                            <img className="star-image" src={star} alt="ster-icoon"/>
                            <h2>Binnen Stallen</h2>
                            <img className="star-image" src={star} alt="ster-iccon"/>
                        </div>
                        <div className="feature-article-wrapper">
                            <Feature
                                title="Kleine Binnen Stal"
                                item1="binnenstal klein en groot"
                                item2="lorem ipsum"
                                item3="marcus servus est"
                                item4="in vino veritas est"
                                image={stable}
                                info="Image by Anna Kaminova-Unsplashed"
                                buttontext="vol"
                                classname="feature-article"
                            />
                            <Feature
                                title="Grote Binnen stal"
                                item1="functio laesa"
                                item2="scientia vincere tenebras"
                                item3="ubi pus ibi evacua"
                                item4="tumor dolor calor rubor"
                                image={straw}
                                info="Image by Ben shbeen-Unsplashed"
                                buttontext="laatste stallen!!"
                                classname="feature-article reversed-direction"
                            />
                        </div>
                    </div>
                </section>
                <section className="outer-container feature-section">
                    <div className="inner-container">
                        <div className="title-wrapper">
                            <img className="star-image" src={star} alt="ster-icoon"/>
                            <h2>Buiten Stallen</h2>
                            <img className="star-image" src={star} alt="ster-iccon"/>
                        </div>
                        <div className="feature-article-wrapper pale">
                            <Feature
                                title="Kleine Buiten Stal"
                                item1="binnenstal klein en groot"
                                item2="lorem ipsum"
                                item3="marcus servus est"
                                item4="in vino veritas est"
                                image={stable}
                                info="Image by Anna Kaminova-Unsplashed"
                                buttontext="vol"
                                classname="feature-article"
                            />
                            <Feature
                                title="Grote Buiten stal"
                                item1="functio laesa"
                                item2="scientia vincere tenebras"
                                item3="ubi pus ibi evacua"
                                item4="tumor dolor calor rubor"
                                image={straw}
                                info="Image by Ben shbeen-Unsplashed"
                                buttontext="laatste stallen!!"
                                classname="feature-article reversed-direction"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>

        </>
    );
}

export default Stalls;