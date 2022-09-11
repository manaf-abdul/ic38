import React from "react";
import HomePage from "./Pages/HomePage";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const RoutesPage = () => {
    return (
        <Router>
        <Routes>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route  path="/statistics">
                <h1>Statistics Page</h1>
            </Route>
            <Route path="/customers">
                <h1>Customers Page</h1>
            </Route>
            <Route path="/diagrams">
                <h1>Diagrams Page</h1>
            </Route>
            </Routes>
    </Router>
    );
};

export default RoutesPage;
