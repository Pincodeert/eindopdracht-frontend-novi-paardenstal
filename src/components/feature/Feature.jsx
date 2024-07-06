import star from "../../assets/ster-image.jpg";
import styles from './Feature.module.css';
import {Link} from "react-router-dom";

function Feature({classname, imageClassname, title, item1, item2, item3, item4, image, imageInfo, linkPath, linkText}) {

    const featureClassname = "feature-article";
    // if(classname) {
    //     classnameString = `${classnameString} ${classname}`;
    // }
    const borderClassname = "feature-image";

    return (
        <article className={`${styles[featureClassname]} ${styles[classname]}`}>
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
            <div className={`${styles[borderClassname]} ${styles[imageClassname]}`}>
                <span>
                    <img src={image} alt={imageInfo}/>
                </span>
                <Link to={linkPath}>{linkText}</Link>
            </div>
        </article>
    );
}

export default Feature;