import { createContext, useState } from "react";


export const ThemeContext = createContext<any>([]);

export const ThemeProvider = ({children}:any)=>{
    const [theme, setTheme] = useState("pt-BR");

    const toggleTheme = () => {
        setTheme(theme === "pt-BR" ? "en-US" : "pt-BR")
    }

    return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    )
}