import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal";

export default function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id))

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const hendleDelate = async () => {
        try {
            await removeTask(task.id)
            navigate("/")
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }
    return (
        <div className="taskCard">
            <h1>Dettaglio task</h1>
            <p><strong>nome:</strong>{task.title}</p>
            <p><strong>descrizione:</strong>{task.description}</p>
            <p><strong>stato:</strong>{task.status}</p>
            <p><strong>data di creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={() => setShowDeleteModal(true)}>elimina task</button>
            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                show={showDeleteModal}
                onClose={()=> setShowDeleteModal(false)}
                onConfirm={hendleDelate}
                confirmText="Elimina"
            />
        </div>
    )
}