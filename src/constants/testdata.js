
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
    subscriptionId: "2",
    name: "Jolly Jumper abonnement",
    price: "515,95",
    typeOfCare: "volpension",
    typeOfStall: "kleine binnenstal"
}

export const stalls = [
    {
        stallId: "1",
        name: "El camino",
        type: "grote binnenstal",
        size: "3 x 4",
        isOccupied: "ja",
        horseId: "2"
    },
    {
        stallId: "2",
        name: "The Bad",
        type: "grote binnenstal",
        size: "3 x 4",
        isOccupied: "nee",
        horseId: null
    },
    {
        stallId: "12",
        name: "Young Guns III",
        type: "kleine buitenstal",
        size: "3 x 3",
        isOccupied: "ja",
        horseId: "11"
    }
]

export const indoorSubscriptions = [
    {
        subscriptionId: "1",
        name: "Lucky Luke abonnement",
        price: "490,95",
        typeOfCare: "halfpension",
        typeOfStall: "kleine binnenstal"
    },
    {
        subscriptionId: "2",
        name: "Jolly Jumper abonnement",
        price: "515,95",
        typeOfCare: "volpension",
        typeOfStall: "kleine binnenstal"
    },
    {
        subscriptionId: "3",
        name: "Joe Dalton abonnement",
        price: "505,95",
        typeOfCare: "halfpension",
        typeOfStall: "grote binnenstal"
    },
    {
        subscriptionId: "4",
        name: "Jack Dalton abonnement",
        price: "530,95",
        typeOfCare: "volpension",
        typeOfStall: "grote binnenstal"
    }
];

export const outdoorSubscriptions = [
    {
        subscriptionId: "5",
        name: "William Dalton abonnement",
        price: "454,95",
        typeOfCare: "halfpension",
        typeOfStall: "kleine buitenstal"
    },
    {
        subscriptionId: "6",
        name: "Averell Dalton abonnement",
        price: "479,95",
        typeOfCare: "volpension",
        typeOfStall: "kleine buitenstal"
    },
    {
        subscriptionId: "7",
        name: "Ma Dalton abonnement",
        price: "499,95",
        typeOfCare: "halfpension",
        typeOfStall: "grote buitenstal"
    },
    {
        subscriptionId: "8",
        name: "Rataplan abonnement",
        price: "489,95",
        typeOfCare: "volpension",
        typeOfStall: "grote buitenstal"
    }
];

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

export const abonnementen = [
    {
        "id": 1,
        "name": "Lucky Luke abonnement",
        "price": 490.95,
        "typeOfCare": "halfpension",
        "typeOfStall": "kleine binnenstal",
        "enrollments": []
    },
    {
        "id": 2,
        "name": "Jolly Jumper abonnement",
        "price": 515.95,
        "typeOfCare": "volpension",
        "typeOfStall": "kleine binnenstal",
        "enrollments": []
    },
    {
        "id": 3,
        "name": "Joe Dalton abonnement",
        "price": 505.95,
        "typeOfCare": "halfpension",
        "typeOfStall": "grote binnenstal",
        "enrollments": []
    },
    {
        "id": 4,
        "name": "Jack Dalton abonnement",
        "price": 530.95,
        "typeOfCare": "volpension",
        "typeOfStall": "grote binnenstal",
        "enrollments": []
    },
    {
        "id": 5,
        "name": "William Dalton abonnement",
        "price": 454.95,
        "typeOfCare": "halfpension",
        "typeOfStall": "kleine buitenstal",
        "enrollments": []
    },
    {
        "id": 6,
        "name": "Averell Dalton abonnement",
        "price": 479.95,
        "typeOfCare": "volpension",
        "typeOfStall": "kleine buitenstal",
        "enrollments": []
    },
    {
        "id": 7,
        "name": "Ma Dalton abonnement",
        "price": 499.95,
        "typeOfCare": "halfpension",
        "typeOfStall": "grote buitenstal",
        "enrollments": []
    },
    {
        "id": 8,
        "name": "Rataplan abonnement",
        "price": 489.95,
        "typeOfCare": "volpension",
        "typeOfStall": "grote buitenstal",
        "enrollments": []
    }
]

export const beschikbareStallen = [
    {
        "id": 3,
        "name": "The Ugly",
        "size": "3 x 3.5",
        "type": "kleine binnenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 4,
        "name": "The Bold",
        "size": "3 x 3.5",
        "type": "kleine binnenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 5,
        "name": "The Beautiful",
        "size": "3 x 3.5",
        "type": "kleine binnenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 8,
        "name": "Heartbreak Ridge",
        "size": "3 x 4",
        "type": "grote binnenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 9,
        "name": "Los Pollos",
        "size": "3 x 4",
        "type": "grote binnenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 13,
        "name": "The Quick",
        "size": "3 x 3",
        "type": "kleine buitenstal",
        "horse": null,
        "occupied": false
    },
    {
        "id": 14,
        "name": "The Dead",
        "size": "3 x 3",
        "type": "kleine buitenstal",
        "horse": null,
        "occupied": false
    }
]

export default axl;