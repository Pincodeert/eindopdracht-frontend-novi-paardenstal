import formatPrice from "./formatPrice.js";

function generateSubscriptionDetails(subscription) {
    return `${subscription.typeOfStall} - ${subscription.typeOfCare} - ${formatPrice(subscription.price)} - maandelijks opzegbaar`;
}

export default generateSubscriptionDetails;