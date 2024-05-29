import {createContext, useState} from "react";

export const SubscriptionContext = createContext({});

function SubscriptionContextProvider({children}) {

    const [subscription, setSubscription] = useState({
        subscriptionId: 0,
    });

    function selectSubscription(id) {
        setSubscription({
            subscriptionId: id,
        });
    }

    function resetSubscription(){
        setSubscription({
            subscriptionId: 0,
        });
    }
    console.log("dit is de SubscriptionContext talking, subscription idnr: ", subscription.subscriptionId);
    const contextData = {
        subscriptionId: subscription.subscriptionId,
        selectSubscription,
        resetSubscription,
    }
    console.log("en dit is de contextData subsr id: ", contextData);

    return (
        <SubscriptionContext.Provider value={contextData}>
            {children}
        </SubscriptionContext.Provider>
    );

}

export default SubscriptionContextProvider;