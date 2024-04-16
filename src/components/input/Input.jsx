import "./Input.css"
function Input(props) {
    return (
        <label htmlFor={props.labelFor}>{props.labelText}
            <input type={props.inputType}
                   id={props.inputId}
                   name={props.inputName}
                   placeholder={props.placeholder}
                   pattern={props.pattern}
            />
        </label>
    );
}

export default Input;