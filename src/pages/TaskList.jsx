// Importa il hook useContext da React, per accedere al contesto globale
import { useContext, useMemo, useState } from "react";

// Importa il contesto globale dove sono salvati i dati (come la lista di tasks)
import { GlobalContext } from "../context/GlobalContext";

// Importa il componente che visualizza una singola riga della tabella
import TaskRow from "../components/TaskRow";


// Componente principale che mostra la lista dei task in una tabella
export default function TaskList() {

    // Estrae 'tasks' dal contesto globale usando useContext
    const { tasks } = useContext(GlobalContext);

    // stati ordinamento
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const sortIcon = sortOrder === 1 ? "↓" : "↑"

    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison

            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === 'status') {
                const statusOptions = ['To do', 'Doing', 'Done'];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()

                comparison = dateA - dateB
            }
            return comparison * sortOrder
        })
    }, [tasks, sortBy, sortOrder])


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
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === 'status' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di Creazione {sortBy === 'createdAt' && sortIcon}
                        </th>
                    </tr>
                </thead>

                {/* Corpo della tabella: una riga per ogni task */}
                <tbody>
                    {sortedTask.map((task) => (
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