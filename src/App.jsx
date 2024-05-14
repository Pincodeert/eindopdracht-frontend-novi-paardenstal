import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Stalls from "./pages/stalls/Stalls.jsx";
import Subscriptions from "./pages/subscriptions/Subscriptions.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Subscribe from "./pages/subscribe/Subscribe.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/stallen" element={<Stalls/>}/>
            <Route path="/abonnementen" element={<Subscriptions/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registreer" element={<Register/>}/>
            <Route path="/profiel/:customerProfileId" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
            <Route path="/inschrijven/:subscriptionId" element={<Subscribe/>}/>
            <Route path="/admin/:userId" element={isAuth ? <Admin/> : <Navigate to="/"/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
