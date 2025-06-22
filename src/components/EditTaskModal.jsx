// Importa il componente Modal e gli hook necessari
import Modal from "./Modal"
import { useState, useRef } from "react"

export default function EditTaskModal({ show, onClose, task, onSave }) {
    // Stato per gestire la versione modificata della task
    const [editedTask, setEditedTask] = useState(task);

    // Ref per accedere direttamente al form e inviarlo da fuori
    const editFormRef = useRef();

    // Funzione per aggiornare un campo specifico della task modificata
    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
    };

    // Gestisce l'invio del form, bloccando il comportamento di default e chiamando la funzione onSave
    const hendleSubmit = e => {
        e.preventDefault();
        onSave(editedTask);
    };

    // Estrae i campi principali della task modificata
    const { title, description, status } = editedTask;

    return (
        // Rende il modale di modifica con il form al suo interno
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={hendleSubmit}>
                    {/* Campo per modificare il nome della task */}
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>

                    {/* Campo per modificare la descrizione della task */}
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </label>

                    {/* Campo per modificare lo stato della task */}
                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            {["To do", "Doing", "Done"].map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"               // Testo del pulsante di conferma
            show={show}                        // Mostra o nasconde il modale
            onClose={onClose}                  // Funzione chiamata alla chiusura
            onConfirm={() => editFormRef.current.requestSubmit()}  // Invia il form manualmente
        />
    )
}