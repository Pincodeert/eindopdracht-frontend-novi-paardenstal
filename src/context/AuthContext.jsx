import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

export const AuthContext = createContext({});
function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        // status: "pending",
    });

    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token && isTokenValid(token)){
    //         void signIn(token);
    //     } else {
    //         setAuth({
    //             isAuth: false,
    //             user: null,
    //             status: "done",
    //         });
    //     }
    // }, []);

    async function signIn(token) {
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
                    customerProfile: response.data.customerProfile,  // elders te gebruiken in if/else? als CP===null.
                    // dan op inschrijfpagina gelijk door naar stap 3 , voer paard op.
                },
                // status: "done",
            });
            navigate(`/profiel/${response.data.username}`)
            // navigate(`/abonnementen`) // Als inlogstap volgt op keuze abonnement: de subscriptionId van
            // inschrijven/:subscriptionId opslaan in de context en hier in de authcontext checken of er een
            // subscriptionId is. Zo ja =>> navigate(`/inschrijven/subscriptionId`) Zo nee =>> navigate(`/profiel/username`)

            // hier nog een if-else statement plaatsen?
            // if(ROLE===admin) {
            //    navigate((`/admin`))
            // } else if (ROLE===user) {
            // zie boven
            // }
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
            // status: "done",
        });
        navigate("/");
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {/*{auth.status === "done" ? children : <p>Loading...</p>}*/}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;