import "./TextInput.css"

function TextInput({labelFor, children, inputId, inputName, textValue, changeHandler, placeholder, required}) {
    return (
        <label htmlFor={labelFor}>
            {children}
            <input
                id={inputId}
                name={inputName}
                value={textValue}
                onChange={changeHandler}
                placeholder={placeholder}
                required={required}
            />
        </label>
    );
}

export default TextInput;