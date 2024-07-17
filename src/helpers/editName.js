function initialsName(firstName, lastName) {
    return firstName.charAt(0) + lastName.charAt(0);
}

export function displayCompleteName(firstName, lastName) {
    return `${firstName} ${lastName}`
}

export default initialsName;