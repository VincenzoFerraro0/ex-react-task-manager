// Importazione degli hook e dei componenti necessari
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {
    // Estrae l'ID della task dai parametri della route
    const { id } = useParams();

    // Hook per navigare programmaticamente
    const navigate = useNavigate();

    // Accede al contesto globale per ottenere le task e le funzioni di modifica/eliminazione
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    // Trova la task corrispondente all'ID nella lista globale
    const task = tasks.find(t => t.id === parseInt(id))

    // Stati locali per mostrare o nascondere i modali
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Se la task non è stata trovata, mostra un messaggio
    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    // Gestisce l'eliminazione della task
    const handleDelate = async () => {
        try {
            await removeTask(task.id)  // Chiama la funzione di rimozione
            navigate("/")              // Torna alla home dopo l'eliminazione
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    // Gestisce l'aggiornamento della task
    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask)  // Chiama la funzione di aggiornamento
            setShowEditModal(false)        // Chiude il modale di modifica
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    return (
        <div className="taskCard">
            <h1>Dettaglio task</h1>

            {/* Visualizza i dettagli della task */}
            <p><strong>nome:</strong> {task.title}</p>
            <p><strong>descrizione:</strong> {task.description}</p>
            <p><strong>stato:</strong> {task.status}</p>
            <p><strong>data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

            {/* Bottoni per mostrare i modali */}
            <div className="box-buttons">
                <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
                <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
            </div>

            {/* Modale di conferma eliminazione */}
            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelate}
                confirmText="Elimina"
            />

            {/* Modale di modifica task */}
            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}