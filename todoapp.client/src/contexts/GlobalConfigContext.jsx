import { createContext, useState } from "react";

export const GlobalConfigContext = createContext();

// eslint-disable-next-line react/prop-types
export function GlobalConfigContextProvider({ children}) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")

    const handleDarkMode = () => {
        localStorage.setItem("theme", "dark");
        setDarkMode(true);
        document.documentElement.classList.add("dark")
    }
    
    const handleLightMode = () => {
        localStorage.setItem("theme", "light");
        setDarkMode(false);
        document.documentElement.classList.remove("dark")
    }

    const value = {
        handleDarkMode,
        handleLightMode,
        darkMode
    }

    return (<GlobalConfigContext.Provider value={value}> {children}</GlobalConfigContext.Provider>)
}