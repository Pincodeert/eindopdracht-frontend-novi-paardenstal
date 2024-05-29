function reverseDate(date) {
    const dateString = date.toString();
    let splitDateString = dateString.split("-");
    let reverseArray = splitDateString.reverse();
    let reversedDateString = reverseArray.join("-");
    return reversedDateString;
}

export default reverseDate;