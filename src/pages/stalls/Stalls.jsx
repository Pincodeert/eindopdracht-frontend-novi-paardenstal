import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import Footer from "../../components/footer/Footer.jsx";
import star from "../../assets/ster-image.jpg";
import Feature from "../../components/feature/Feature.jsx";
import stable from "../../assets/anna-kaminova-cCsbIhfjfTY-unsplash.jpg";
import straw from "../../assets/ben-shbeeb-HyTvVA8Ye8I-unsplash.jpg";
import NavLinkList from "../../components/navLinkList/NavLinkList.jsx";
import IntroSection from "../../components/introSection/IntroSection.jsx";
import {stallsIntro} from "../../constants/introText.js";

function Stalls() {
    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar>
                        <NavLinkList/>
                    </NavBar>
                    <HeaderContent/>
                </div>
            </header>
            <main>
                <IntroSection
                    title="Maak kennis met onze stallen"
                    text={stallsIntro}
                />
                <section className="outer-container feature-section">
                    <div className="inner-container ">
                        <div className="title-wrapper">
                            <img className="star-image" src={star} alt="ster-icoon"/>
                            <h2>Binnen Stallen</h2>
                            <img className="star-image" src={star} alt="ster-iccon"/>
                        </div>
                        <div className="feature-article-wrapper colored">
                            <Feature
                                title="Kleine Binnen Stal"
                                item1="binnenstal klein en groot"
                                item2="lorem ipsum"
                                item3="marcus servus est"
                                item4="in vino veritas est"
                                image={stable}
                                imageInfo="Image by Anna Kaminova-Unsplashed"
                                linkPath="/abonnementen"
                                linkText="naar abonnementen"
                                // classname="feature-article"
                            />
                            <Feature
                                title="Grote Binnen stal"
                                item1="functio laesa"
                                item2="scientia vincere tenebras"
                                item3="ubi pus ibi evacua"
                                item4="tumor dolor calor rubor"
                                image={straw}
                                imageInfo="Image by Ben shbeen-Unsplashed"
                                linkPath="/abonnementen"
                                linkText="naar abonnementen"
                                classname="reversed-direction"
                                // classname="feature-article reversed-direction"
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
                                imageInfo="Image by Anna Kaminova-Unsplashed"
                                linkPath="/abonnementen"
                                linkText="naar abonnementen"
                                imageClassname="dark-border"
                            />
                            <Feature
                                title="Grote Buiten stal"
                                item1="functio laesa"
                                item2="scientia vincere tenebras"
                                item3="ubi pus ibi evacua"
                                item4="tumor dolor calor rubor"
                                image={straw}
                                imageInfo="Image by Ben shbeen-Unsplashed"
                                linkPath="/abonnementen"
                                linkText="naar abonnementen"
                                classname="reversed-direction"
                                imageClassname="dark-border"
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