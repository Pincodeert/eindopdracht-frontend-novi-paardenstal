function generateFetchErrorString(category) {
    return `Uw ${category} konden niet worden opgehaald. Neem contact met ons op, 
    wanneer dit probleem zich blijft voordoen.`
}

export function generateSaveErrorString(category) {
    return `Uw ${category} kon(den) niet worden verwerkt. Probeer het opnieuw. Neem contact met ons op, 
    wanneer dit probleem zich blijft voordoen.`
}

export function generateAdminErrorString(text, errormessage) {
    return `Er ging iets mis tijdens ${text}: ${errormessage}`
}

export default generateFetchErrorString;