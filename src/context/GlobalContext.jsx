// Importa la funzione createContext da React per creare un contesto globale
import { createContext } from "react";

// Importa un hook personalizzato che gestisce i dati relativi ai task
import useTasks from "../hooks/useTasks.js";

// Crea un contesto globale che potrà essere utilizzato in tutta l'app
export const GlobalContext = createContext();

// Definisce un componente provider che fornisce i dati ai componenti figli
export function GlobalProvider({ children }) {
    
    // Recupera i dati dei task tramite l'hook personalizzato
    const taskData = useTasks();

    // Ritorna il provider del contesto con i dati dei task disponibili per tutti i figli
    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );
}