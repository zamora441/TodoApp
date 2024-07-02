import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { AuthContextProvider } from "./contexts/AuthContext";
import ConfirmationEmail from "./components/authentication/ConfirmationEmail";
import HomePage from "./pages/HomePage";
import { GlobalConfigContextProvider } from "./contexts/GlobalConfigContext";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ResetPassword from "./components/authentication/ResetPassword";
import NonUserRoutes from "./routes/NonUserRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
    return (
        <GlobalConfigContextProvider>
            <AuthContextProvider>
                <Routes>
                    <Route element={<NonUserRoutes />}>
                        <Route element={<AuthLayout/> }>
                            <Route path="/login" element={<Login/>} />
                            <Route path="/sign-up" element={<Register/>} />
                            <Route path="/confirmationEmail" element={<ConfirmationEmail />} />
                            <Route path="/resetPassword" element={<ResetPassword/> }/>
                        </Route>
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                    <Route index element={<HomePage/>}/>
                    </Route>
                </Routes>
            </AuthContextProvider>
        </GlobalConfigContextProvider>
    );
}

export default App;