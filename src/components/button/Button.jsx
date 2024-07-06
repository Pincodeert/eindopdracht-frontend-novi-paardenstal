import styles from './Button.module.css';


function Button({type, classname, handleClick, disabled, children}) {

    return (
        <button
            type={type}
            className={styles[classname]}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;