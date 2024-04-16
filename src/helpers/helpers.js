

function initialsName(firstName, lastName) {
    return firstName.charAt(0) + lastName.charAt(0);
}

export function formatInput(inputText) {
    const trimmed = inputText.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function formatPrice(price) {
    return "€" + price + ",-";
}

export function generateSubscriptionDetails(subscription) {
    return `${subscription.typeOfStall} - ${subscription.typeOfCare} - ${formatPrice(subscription.price)} - maandelijks opzegbaar`;
}

export default initialsName;