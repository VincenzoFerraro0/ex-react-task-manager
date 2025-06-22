import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id))

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    const handleDelate = async () => {
        try {
            await removeTask(task.id)
            navigate("/")
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask)
            setShowEditModal(false)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    return (
        <div className="taskCard">
            <h1>Dettaglio task</h1>
            <p><strong>nome:</strong>{task.title}</p>
            <p><strong>descrizione:</strong>{task.description}</p>
            <p><strong>stato:</strong>{task.status}</p>
            <p><strong>data di creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelate}
                confirmText="Elimina"
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}

            />
        </div>
    )
}