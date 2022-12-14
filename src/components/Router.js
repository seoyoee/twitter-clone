import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div
                style={{
                    maxwidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Auth />} />
                        </>
                    )}
                </Routes>
            </div>
        </HashRouter>
    );
};

export default AppRouter;