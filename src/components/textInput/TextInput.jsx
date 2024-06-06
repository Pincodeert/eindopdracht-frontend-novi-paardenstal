import "./TextInput.css"
import register from "../../pages/register/Register.jsx";

function TextInput({labelFor, children, inputId, inputName, register, validationRules, errors,textValue, changeHandler, placeholder, required}) {
    return (
        <label htmlFor={labelFor}>
            {children}
            <input
                id={inputId}
                value={textValue}
                placeholder={placeholder}
                {...register(inputName, validationRules)}

                onChange={changeHandler}

                required={required}
            />
            {errors[inputName] && <p className="form-error">{errors[inputName].message}</p>}
        </label>
    );
}

export default TextInput;