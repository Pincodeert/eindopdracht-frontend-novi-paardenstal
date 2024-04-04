import './App.css'
import Home from './pages/home/Home.jsx';
import Stalls from "./pages/stalls/Stalls.jsx";
import Subscriptions from "./pages/subscriptions/Subscriptions.jsx";
import Login from "./pages/login/Login.jsx";
import Registreer from "./pages/registreren/Registreer.jsx";
import Profiel from "./pages/profiel/Profiel.jsx";

function App() {


  return (
    <Home />,
    <Stalls />,
    <Subscriptions />,
    <Login />,
    <Registreer />,
    <Profiel />
  )
}

export default App
