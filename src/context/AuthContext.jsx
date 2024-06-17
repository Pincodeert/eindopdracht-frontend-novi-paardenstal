import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";
import {SubscriptionContext} from "./SubscriptionContext.jsx";

export const AuthContext = createContext({});
function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)){
            void signIn(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    async function signIn(token, subscriptionId) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log("de decodedToken is: ", decodedToken);
        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("dit is de ingelogde user: ", response);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    authorities: response.data.authorities,
                    customerProfile: response.data.customerProfile,
                },
                status: "done",
            });

            if(response.data.authorities[0].authority === "ROLE_ADMIN" || response.data.authorities[1] === "ROLE_ADMIN") {
                navigate(`/admin`)
            } else if(subscriptionId) {
                navigate(`/inschrijven/${subscriptionId}`);
            } else if(!response.data.customerProfile) {
                navigate(`/abonnementen`);
            } else {
                navigate(`/profiel/${response.data.customerProfile}`)
            }
        } catch (error) {
            console.error(error);
            signOut();
            console.log("de gebruiker ophalen is mislukt, de gebruiker is weer uitgelogd")
        }
    }

    function signOut() {
        localStorage.clear();
        console.log("de gebruiker is uitgelogd");
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        navigate("/");
    }

    function completeUserInfo(customerProfileId) {
        setAuth({
            ...auth,
            user: {
                customerProfile: customerProfileId,
            }
        })
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        signIn,
        signOut,
        completeUserInfo,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;