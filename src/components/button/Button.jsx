import './Button.css'
function Button(props) {
    function logClick(note) {
        console.log(note)
    }

    return(
        <button
            type={props.type}
            className={props.classname}
            onClick={() =>logClick(props.note)}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
}
export default Button;