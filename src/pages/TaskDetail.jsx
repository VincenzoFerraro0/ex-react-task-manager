import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetail() {

    const { id } = useParams();
    const { tasks } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    const hendleDelate = () => {
        console.log("elimino task", task.id)
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
            <button onClick={hendleDelate}>elimina task</button>
        </div>
    )
}