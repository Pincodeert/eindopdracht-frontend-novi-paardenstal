import './Button.css'
function Button(props) {
    return(
        <button
            type={props.type}
            className={props.classname}
        >
            {props.text}
        </button>
    );
}
export default Button;