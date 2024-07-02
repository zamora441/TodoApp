import { useState, createContext, useMemo} from "react";
import authServiceData from "../services/authService";
import * as jose from 'jose'
const TOKEN = "accessToken";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem(TOKEN)
        if (token) {
            const decodedUser = jose.decodeJwt(token);
            return decodedUser;
        } else {
            return null;
        }
    });
    const [isAuthenticated, setIsAuthenticated] = useState(()=> localStorage.getItem(TOKEN) !== null);

    const login= async (data) => {
        const response = await authServiceData.login(data);
        const token = response.data.authToken;
        saveAccessToken(token)
        const decodedUser = jose.decodeJwt(token);
        setUser(decodedUser);
    }

    const saveAccessToken = newToken => {
        localStorage.setItem(TOKEN,newToken);
        setIsAuthenticated(true);
    }

    const logOut = async () => {
        await authServiceData.logOut();
        localStorage.removeItem(TOKEN);
        setIsAuthenticated(false);
        setUser(null);
    }

    const value = useMemo(()=>({ 
        login,
        saveAccessToken,
        logOut,
        isAuthenticated,
        user
    }), [isAuthenticated, user])


    return (<AuthContext.Provider value={value}>{ children}</AuthContext.Provider>)
}
