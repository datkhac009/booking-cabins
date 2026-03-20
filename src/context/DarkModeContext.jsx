import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext()


function DarkModeProvider({children}){
    const [isDarkMode,setIsDarkMode] = useLocalStorageState(false,'isDarkMode')

    useEffect(() => {
      if(isDarkMode){
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      }else{
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    }, [isDarkMode])
    
    function toggleDarkMode(){
        setIsDarkMode((isDark) => !isDark)
    }

    return<DarkModeContext.Provider value={{isDarkMode ,toggleDarkMode}} >{children}</DarkModeContext.Provider>


}

 function useDarkMode(){
    const ctx = useContext(DarkModeContext)
    if(ctx === undefined) throw new Error("Dark Mode False");
    
    return ctx
}

export {DarkModeProvider , useDarkMode}