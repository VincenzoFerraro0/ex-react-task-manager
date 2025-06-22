import { Route, Routes } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";



export default function App() {
  return (
    <>
      <nav className="">
        <div className="">
          <Link to={"/"}>📝 TaskManager</Link>
        </div>
        <div className="">
          <div className="">
            <NavLink to={"/"}>Lista Tasks</NavLink>
            <NavLink to={"/add"} >Aggiungi task</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" Component={TaskList} />
        <Route path="/add" Component={AddTask} />
        <Route path="/task/:id" Component={TaskDetail} />
      </Routes>
    </>
  )
}

