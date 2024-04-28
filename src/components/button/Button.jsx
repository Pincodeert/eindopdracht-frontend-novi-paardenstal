import './Button.css'
function Button(props) {
    // function logClick(note) {
    //     console.log(note)
    // }

    return(
        <button
            type={props.type}
            className={props.classname}
            onClick={props.handleClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
}
export default Button;