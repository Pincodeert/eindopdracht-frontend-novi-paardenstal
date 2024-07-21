import styles from "./TextInput.module.css"


function TextInput({labelFor, children, inputId, inputName, register, validationRules, errors, textValue, placeholder, required, labelClassName}) {
    return (
        <label htmlFor={labelFor} className={styles[labelClassName]}>
            {children}
            <input
                id={inputId}
                placeholder={placeholder}
                {...register(inputName, validationRules)}
                defaultValue={textValue}
                required={required}
            />
            {errors[inputName] && <p className="form-error-login">{errors[inputName].message}</p>}
        </label>
    );
}

export default TextInput;