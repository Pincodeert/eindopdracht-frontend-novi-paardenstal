
// voorbeeld klant
const axl = {
    customerProfileId: "7",
    firstName: "Axl",
    lastName: "Rose",
    street: "Road to Nowhere",
    houseNumber: "1",
    postalCode: "8854",
    residence: "Paradise City",
    telephoneNumber: "0691827364",
    emailAddress: "axl.rose@youcouldbemine.com",
    bankAccountNumber: "43ROSE0843223859",
    username: ""
};

// voorbeeld paard
export const sweethorse = {
    horseId: "11",
    name: "Sweet Horse o' Mine",
    horseNumber: "NL089247764781",
    typeOfFeed: "oats",
    typeOfBedding: "straw",
    nameOfVet: "Dr John",
    residenceOfVet: "New Orleans",
    telephoneOfVet: "0612345678",
    preferredSubscription:
        { subscriptionId: "6",
            name:"Averell Dalton abonnement",
            price: "479,95",
            typeOfCare: "volpension",
            typeOfStall: "kleine buitenstal"
        },
    customerProfileId: "7"
};

export const horses = [
    {
        horseId: "11",
        name: "Sweet Horse o' Mine",
        horseNumber: "NL089247764781",
        typeOfFeed: "oats",
        typeOfBedding: "straw",
        nameOfVet: "Dr John",
        residenceOfVet: "New Orleans",
        telephoneOfVet: "0612345678",
        preferredSubscription: {
            subscriptionId: "6",
            name:"Averell Dalton abonnement",
            price: "479,95",
            typeOfCare: "volpension",
            typeOfStall: "kleine buitenstal"
        },
        customerProfileId: "7",
        stall: {
            stallId: "12",
            name: "Young Guns III",
            type: "kleine buitenstal",
            size: "3 x 3",
            isOccupied: "ja",
            horseId: "11"
        }
    }, {
        horseId: "2",
        name: "Steel Horse",
        horseNumber: "NL011212121212",
        typeOfFeed: "hay",
        typeOfBedding: "shavings",
        nameOfVet: "Dr Hook",
        residenceOfVet: "Trenton",
        telephoneOfVet: "0611223344",
        preferredSubscription: {
            subscriptionId: "1",
            name: "Jolly Jumper abonnement",
            price: "433,95",
            typeOfCare: "halfpension",
            typeOfStall: "grote binnenstal"
        },
        customerProfileId: "2",
        stall: {
            stallId: "1",
            name: "El camino",
            type: "grote binnenstal",
            size: "3 x 4",
            isOccupied: "ja",
            horseId: "2"
        }
    }
];

//voorbeeld stal
export const stallYoung3 = {
    stallId: "12",
    name: "Young Guns III",
    type: "kleine buitenstal",
    size: "3 x 3",
    isOccupied: "ja",
    horseId: "11"
};

export const elCamino = {
    stallId: "1",
    name: "El camino",
    type: "grote binnenstal",
    size: "3 x 4",
    isOccupied: "ja",
    horseId: "2"
}

//voorbeeld abonnemtent type
export const averell = {
    subscriptionId: "6",
    name: "Averell Dalton abonnement",
    price: "479,95",
    typeOfCare: "volpension",
    typeOfStall: "kleine buitenstal"
};

export const jolly = {
    subscriptionId: "1",
    name: "Jolly Jumper abonnement",
    price: "433,95",
    typeOfCare: "halfpension",
    typeOfStall: "grote binnenstal"
}

// voorbeeld abonnement/inschrijving
export const enrollment1 = {
    enrollmentId: "1",
    startDate: "12-05-2023",
    expiredate: "12-05-2024",
    duration: "11",
    isOngoing: "ja",
    cancellationRequested: "nee",
    horseNumber: "NL089247764781",
    subscriptionPrice: "479,95",
    customerProfileId: "7",
    horseId: "11"
};

export const enrollments = [
    {
        enrollmentId: "1",
        startDate: "12-05-2023",
        expiredate: "12-05-2024",
        duration: "11",
        isOngoing: "ja",
        cancellationRequested: "nee",
        horseNumber: "NL089247764781",
        subscriptionPrice: "479,95",
        customerProfileId: "7",
        horseId: "11",
        horse:
            {
                horseId: "11",
                name: "Sweet Horse o' Mine",
                horseNumber: "NL089247764781",
                typeOfFeed: "oats",
                typeOfBedding: "straw",
                nameOfVet: "Dr John",
                residenceOfVet: "New Orleans",
                telephoneOfVet: "0612345678",
                preferredSubscription: {
                    subscriptionId: "6",
                    name: "Averell Dalton abonnement",
                    price: "479,95",
                    typeOfCare: "volpension",
                    typeOfStall: "kleine buitenstal"
                },
                customerProfileId: "7",
                stall: {
                    stallId: "12",
                    name: "Young Guns III",
                    type: "kleine buitenstal",
                    size: "3 x 3",
                    isOccupied: "ja",
                    horseId: "11"
                }
            },
        stall: {
            stallId: "12",
            name: "Young Guns III",
            type: "kleine buitenstal",
            size: "3 x 3",
            isOccupied: "ja",
            horseId: "11"
        },
        subscription: {
            subscriptionId: "6",
            name: "Averell Dalton abonnement",
            price: "479,95",
            typeOfCare: "volpension",
            typeOfStall: "kleine buitenstal"
        }
    },
    {
        enrollmentId: "2",
        startDate: "22-11-2023",
        expiredate: "22-11-2024",
        duration: "6",
        isOngoing: "ja",
        cancellationRequested: "nee",
        horseNumber: "NL089247764778",
        subscriptionPrice: "433,95",
        customerProfileId: "7",
        horseId: "2",
        horse: {
            horseId: "2",
            name: "Steel Horse",
            horseNumber: "NL011212121212",
            typeOfFeed: "hay",
            typeOfBedding: "shavings",
            nameOfVet: "Dr Hook",
            residenceOfVet: "Trenton",
            telephoneOfVet: "0611223344",
            preferredSubscription: {
                subscriptionId: "1",
                name: "Jolly Jumper abonnement",
                price: "433,95",
                typeOfCare: "halfpension",
                typeOfStall: "grote binnenstal"
            },
            customerProfileId: "2",
            stall: {
                stallId: "1",
                name: "El camino",
                type: "grote binnenstal",
                size: "3 x 4",
                isOccupied: "ja",
                horseId: "2"
            }
        },
        stall: {
            stallId: "1",
            name: "El camino",
            type: "grote binnenstal",
            size: "3 x 4",
            isOccupied: "ja",
            horseId: "2"
        },
        subscription: {
            subscriptionId: "1",
            name: "Jolly Jumper abonnement",
            price: "433,95",
            typeOfCare: "halfpension",
            typeOfStall: "grote binnenstal"
        }
    }
]

export default axl;