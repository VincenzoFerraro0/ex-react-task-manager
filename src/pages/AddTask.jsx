import { useState, useMemo, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// Simboli non ammessi nel titolo del task
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {

    const { addTask } = useContext(GlobalContext);
    // Stato per il titolo del task (input controllato)
    const [taskTitle, setTaskTitle] = useState("");

    // Riferimenti per gli input non controllati: descrizione e stato
    const descriptionRef = useRef();
    const statusRef = useRef();

    // Validazione del titolo del task, calcolata solo quando cambia `taskTitle`
    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim())
            return "Il nome della task non può essere vuoto";
        if ([...taskTitle].some(char => symbols.includes(char)))
            return "Il nome della task non può contenere simboli";
        return "";
    }, [taskTitle]);

    // Gestione dell'invio del form
    const hendleSubmit = async (e) => {
        e.preventDefault();

        console.log(addTask)

        // Se c'è un errore nel titolo, interrompe l'invio
        if (taskTitleError) return;

        // Creazione dell'oggetto task con i valori attuali
        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };

        try {
            await addTask(newTask);
            alert("task creata con successo")

            // Reset del form 
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";
        } catch (error) {
            alert(error.message)
        }


    };

    return (
        <div className="task-container">
            <h3>Qui puoi aggiungere una task</h3>

            {/* Form di inserimento task */}
            <form onSubmit={hendleSubmit}>

                {/* Campo titolo - input controllato */}
                <label>
                    Nome:
                    <input
                        type="text"
                        placeholder="Nome del task..."
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                        className="input"
                    />
                </label>

                {/* Messaggio di errore se il titolo non è valido */}
                {taskTitleError && <p className="error">{taskTitleError}</p>}

                {/* Campo descrizione - textarea non controllata */}
                <label>
                    Descrizione:
                    <textarea
                        placeholder="Breve descrizione"
                        ref={descriptionRef}
                    />
                </label>

                {/* Campo stato - select non controllata */}
                <label>
                    Seleziona lo stato:
                    <select
                        ref={statusRef}
                        defaultValue={"To do"}
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>

                {/* Bottone di invio disabilitato in caso di errore */}
                <button type="submit" disabled={taskTitleError}>
                    Aggiungi Task
                </button>
            </form>
        </div>
    );
}