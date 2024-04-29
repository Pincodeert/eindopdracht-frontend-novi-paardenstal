import './Button.css'

function Button(props) {

    return (
        <button
            type={props.type}
            className={props.classname}
            onClick={props.handleClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export default Button;