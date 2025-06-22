// Importa gli hook necessari da React
import { useCallback, useContext, useMemo, useState } from "react";

// Importa il contesto globale dove sono salvati i dati (come la lista di tasks)
import { GlobalContext } from "../context/GlobalContext";

// Importa il componente che visualizza una singola riga della tabella
import TaskRow from "../components/TaskRow";

// Funzione di debounce per evitare chiamate troppo frequenti (es: durante la digitazione)
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearInterval(timer); // Cancella il timer precedente
        timer = setTimeout(() => {
            callback(value); // Chiama la funzione passata dopo il ritardo
        }, delay);
    };
}

// Componente principale che mostra la lista dei task in una tabella
export default function TaskList() {
    // Estrae 'tasks' dal contesto globale usando useContext
    const { tasks } = useContext(GlobalContext);

    // Stato per memorizzare la query di ricerca (input dell'utente)
    const [searchQuery, setSearchQuery] = useState("");

    // Applica la funzione di debounce al setSearchQuery
    const debaunceSearch = useCallback(debounce(setSearchQuery, 500), []);

    // Stati per il sorting: campo e ordine (ascendente/discendente)
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1); // 1 = ascendente, -1 = discendente

    // Gestisce il cambio di ordinamento quando si clicca sull'intestazione della tabella
    const handleSort = (field) => {
        if (sortBy === field) {
            // Inverte l'ordine se si clicca sullo stesso campo
            setSortOrder(prev => prev * -1);
        } else {
            // Imposta il nuovo campo di ordinamento
            setSortBy(field);
            setSortOrder(1);
        }
    };

    // Sceglie l'icona in base all'ordine
    const sortIcon = sortOrder === 1 ? "↓" : "↑";

    // Filtra e ordina i task in base alla query di ricerca e al tipo di ordinamento
    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks]
            // Filtro in base al titolo, ignorando maiuscole/minuscole
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            // Ordinamento dinamico
            .sort((a, b) => {
                let comparison;

                // Ordinamento alfabetico per titolo
                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title);
                } 
                // Ordinamento logico per stato: To do < Doing < Done
                else if (sortBy === 'status') {
                    const statusOptions = ['To do', 'Doing', 'Done'];
                    comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
                } 
                // Ordinamento per data di creazione
                else if (sortBy === 'createdAt') {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }

                // Applica l'ordine (asc/desc)
                return comparison * sortOrder;
            });
    }, [tasks, sortBy, sortOrder, searchQuery]); // Recalcola solo se uno di questi cambia

    return (
        <div className="task-container">
            <h1>Lista delle tasks</h1>

            {/* Input per cercare le task per nome */}
            <input
                type="text"
                placeholder="Cerca la task..."
                onChange={e => debaunceSearch(e.target.value)}
                className="input"
            />

            {/* Tabella dei task */}
            <table className="task-table">
                {/* Titolo visivo sopra la tabella */}
                <caption>Tabella delle Tasks</caption>

                {/* Intestazioni cliccabili per ordinare */}
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
                    {filteredAndSortedTasks.map((task) => (
                        // Per ogni task, renderizza il componente TaskRow
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}