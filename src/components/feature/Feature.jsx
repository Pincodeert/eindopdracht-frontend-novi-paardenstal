import star from "../../assets/ster-image.jpg";
import styles from './Feature.module.css';
import {Link} from "react-router-dom";

function Feature({classname, title, item1, item2, item3, item4, image, imageInfo, linkPath, linkText}) {

    let classnameString = "feature-article";
    // if(classname) {
    //     classnameString = `${classnameString} ${classname}`;
    // }


    return (
        <article className={`${styles[classnameString]} ${styles[classname]}`}>
            {console.log("dit is de classnameString:" , classnameString)}
            <div className={styles["feature-text"]}>
                <h3>{title}</h3>
                <div className={styles["feature-text-item"]}>
                    <img src={star} alt="test-plaatje"/>
                    <p>{item1}</p>
                </div>
                <div className={styles["feature-text-item"]}>
                    <img src={star} alt="test-plaatje"/>
                    <p>{item2}</p>
                </div>
                <div className={styles["feature-text-item"]}>
                    <img src={star} alt="test"/>
                    <p>{item3}</p>
                </div>
                <div className={styles["feature-text-item"]}>
                    <img src={star} alt="test"/>
                    <p>{item4}</p>
                </div>
            </div>
            <div className={styles["feature-image"]}>
                <span>
                    <img src={image} alt={imageInfo}/>
                </span>
                <Link to={linkPath}>{linkText}</Link>
            </div>
        </article>
    );
}

export default Feature;