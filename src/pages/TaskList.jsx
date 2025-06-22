// Importa il hook useContext da React, per accedere al contesto globale
import { useContext } from "react";

// Importa il contesto globale dove sono salvati i dati (come la lista di tasks)
import { GlobalContext } from "../context/GlobalContext";

// Importa il componente che visualizza una singola riga della tabella
import TaskRow from "../components/TaskRow";


// Componente principale che mostra la lista dei task in una tabella
export default function TaskList() {

    // Estrae 'tasks' dal contesto globale usando useContext
    const { tasks } = useContext(GlobalContext);

    // Mostra i task nella console per debug (utile in fase di sviluppo)
    // console.log(tasks);

    return (
        <>
            <table className="task-table">
                {/* Titolo della tabella visibile sopra di essa */}
                <caption>Tabella delle Tasks</caption>

                {/* Intestazioni della tabella */}
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>

                {/* Corpo della tabella: una riga per ogni task */}
                <tbody>
                    {tasks.map((task) => (
                        // Per ogni task, renderizza il componente TaskRow
                        // Passa il singolo task come prop
                        // Usa task.id come chiave unica per React
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </>
    )
}