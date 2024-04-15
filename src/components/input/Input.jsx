import "./Input.css"
function Input(props) {
    return (
        <label htmlFor={props.labelFor}>
            <input type={props.inputType} id={props.inputId} name={props.inputName}
                   placeholder={props.placeholder}/>
        </label>
    );
}

export default Input;