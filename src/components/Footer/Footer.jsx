import './Footer.css'
import star from "../../assets/ster-image.jpg";
import FooterArticle from "../FooterArticle/FooterArticle.jsx";
function Footer() {
    return (
        <footer>
            <div className="outer-container footer-info-outer">
                <section className="inner-container footer-info-section">
                    <div className="title-wrapper">
                        <img className="star-image" src={star} alt="ster-icoon"/>
                        <img className="star-image" src={star} alt="ster-icoon"/>
                        <img className="star-image" src={star} alt="ster-iccon"/>
                    </div>
                    <div className="footer-info-wrapper">
                        <FooterArticle
                            title="Openingstijden"
                            classname="footer-info"
                        >
                            <p>ma: 9.00u - 21.00u</p>
                            <p>di: 8.00 - 22.00u</p>
                            <p>wo: 8.00 - 22.00u</p>
                            <p>do: 8.00 - 23.00u</p>
                            <p>vr: 8.00 - 2.00u</p>
                            <p>za: 9.00 - 2.00u</p>
                            <p>zo: 9.00 - 23.00u</p>
                        </FooterArticle>
                        <FooterArticle
                            title="Algemeen"
                            classname="footer-info"
                        >
                            <p>algemene voorwaarden</p>
                            <p>privacy verklaring</p>
                            <p>disclaimer</p>
                            <p>klachtprocedure</p>
                        </FooterArticle>
                        <FooterArticle
                            title="Contact"
                            classname="footer-info borderless"
                        >
                            <p>Landweg 2A</p>
                            <p>1234 AB</p>
                            <p className="footer-info-title">Parkstad</p>
                            <p>tel 012 234 56 78</p>
                            <p>info@blazeofglory.com</p>
                        </FooterArticle>
                    </div>
                    <div>
                        <img src="" alt=""/>
                        <img src="" alt=""/>
                        <img src="" alt=""/>
                    </div>
                </section>
            </div>
            <div className="outer-container closing-outer">
                <section className="inner-container footer-close-section">
                    <p>
                        Copyright pensionstal Blaze of Glory | mede mogelijk gemaakt door Sportcentrum Nieuw-Vennep
                    </p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;