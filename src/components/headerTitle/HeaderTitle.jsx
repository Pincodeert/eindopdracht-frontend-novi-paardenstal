import styles from "./HeaderTitle.module.css"

function HeaderTitle({classname}) {
    return (
        <div className={styles[classname]}>
            <h1>Blaze of Glory</h1>
            <h2>Pensionstallen</h2>
        </div>
    );
}

export default HeaderTitle;