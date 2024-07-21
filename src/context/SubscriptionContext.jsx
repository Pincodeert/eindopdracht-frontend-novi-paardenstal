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

    function resetSubscription() {
        setSubscription({
            subscriptionId: 0,
        });
    }

    const contextData = {
        subscriptionId: subscription.subscriptionId,
        selectSubscription,
        resetSubscription,
    }

    return (
        <SubscriptionContext.Provider value={contextData}>
            {children}
        </SubscriptionContext.Provider>
    );

}

export default SubscriptionContextProvider;