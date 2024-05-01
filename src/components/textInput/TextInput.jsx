import "./TextInput.css"

function TextInput({labelFor, labelText, inputId, inputName, textValue, changeHandler, placeholder}) {
    return (
        <label htmlFor={labelFor}>
            {labelText}
            <input
                id={inputId}
                name={inputName}
                value={textValue}
                onChange={changeHandler}
                placeholder={placeholder}
            />
        </label>
    );
}

export default TextInput;