import "./TextInput.css"
function TextInput({labelFor, labelText, inputId, inputName, textValue, setTextValue, placeholder}) {
    return (
        <label htmlFor={labelFor}>
            {labelText}
            <input
                id={inputId}
                name={inputName}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder={placeholder}
            />
        </label>
    );
}

export default TextInput;