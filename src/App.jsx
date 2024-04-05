import './App.css'
import Home from './pages/home/Home.jsx';
import Stalls from "./pages/stalls/Stalls.jsx";
import Subscriptions from "./pages/subscriptions/Subscriptions.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {


  return (
    <Home />,
    <Stalls />,
    <Subscriptions />,
    <Login />,
    <Register />,
    <Profile />
  )
}

export default App
