import './App.css';
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import React from "react";
import TripsPage from "./components/TripsPage";
import BottomBar from "./components/BottomBar/BottomBar";
import TopNav from "./components/TopNav/TopNav";
import HomePage from "./components/HomePage/HomePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import MapPage from "./components/MapPage/MapPage";
import SearchPage from "./components/SearchPage/SearchPage";
import SignIn from './components/SignIn/SignIn';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <div className="App__content">
                    <TopNav />
                    <Routes>
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/" element={<SignIn />} />
                        <Route exact path="/trips" element={<TripsPage />} />
                        <Route exact path="/friends" element={<FriendsPage />} />
                        <Route exact path="/map" element={<MapPage />} />
                        <Route exact path="/search" element={<SearchPage />} />
                    </Routes>
                </div>
                <BottomBar />
            </HashRouter>
        </div>

    );
}

export default App;
