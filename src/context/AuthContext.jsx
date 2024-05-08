import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});
function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const navigate = useNavigate();


    function signIn() {
        console.log("de gebruiker is ingelogd");
        toggleIsAuth(true);
        navigate("/profiel/5")
    }

    function signOut() {
        console.log("de gebruiker is uitgelogd");
        toggleIsAuth(false);
        navigate("/");
    }

    const contextData = {
        isAuth: isAuth,
        signIn: signIn,
        signout: signOut,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;