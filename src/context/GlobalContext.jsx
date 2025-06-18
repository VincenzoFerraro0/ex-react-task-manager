import { createContext} from "react";
import useTasks from "../hooks/useTasks.js";

export const GlobalContext = createContext();

export function GlobalProvider({children}){

   const taskData = useTasks()
   
    return(
        <GlobalContext.Provider value={{...taskData}}>
            {children}
        </GlobalContext.Provider>
    )
}