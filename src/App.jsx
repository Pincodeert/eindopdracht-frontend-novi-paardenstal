import './App.css'
import Home from './pages/home/Home.jsx';
import Stalls from "./pages/stalls/Stalls.jsx";
import Subscriptions from "./pages/subscriptions/Subscriptions.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Subscribe from "./pages/subscribe/Subscribe.jsx";

function App() {


  return (
    <Home />,
    <Stalls />,
    <Subscriptions />,
    <Login />,
    <Register />,
    <Profile />,
    <Admin />,
    <Subscribe />
  )
}

export default App
