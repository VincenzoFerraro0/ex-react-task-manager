// Importa la funzione 'memo' da React per ottimizzare le prestazioni
import { memo } from 'react'

// Esporta una funzione di default chiamata TaskRow, memorizzata con 'memo' per evitare rendering inutili
// La funzione riceve un oggetto con una proprietà 'task'
const TaskRow = memo(({ task }) => {

    const statusClassName = task.status.replace(" ","").toLowerCase();
    return (
        // Ritorna un elemento <tr> che rappresenta una riga della tabella dei task
        <tr>
            {/* Prima colonna: mostra il titolo del task */}
            <td >{task.title}</td>

            {/* Seconda colonna: mostra lo stato attuale del task (es. "completato", "in corso") */}
            <td className={statusClassName}>{task.status}</td>

            {/* Terza colonna: mostra la data di creazione del task */}
            <td>{task.createdAt}</td>
        </tr>
    )
})

// Esporta il componente come esportazione predefinita
export default TaskRow