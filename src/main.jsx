import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import SubscriptionContextProvider, {SubscriptionContext} from "./context/SubscriptionContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <SubscriptionContextProvider>
                    <App/>
                </SubscriptionContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
