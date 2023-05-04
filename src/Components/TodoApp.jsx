import { useEffect, useState } from "react";
import Todo from "./Todos";
import "./TodoApp.css";

const getLocalStorage = () => {
    let todos = localStorage.getItem("todos");
    if (todos) {
        return (todos = JSON.parse(localStorage.getItem("todos")));
    } else {
        return [];
    }
};


export default function TodoApp() {
    const [title, setTitle] = useState();
    const [todos, setTodos] = useState(getLocalStorage());
     
useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


    const handleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id : Math.floor(Math.random() * 100000),
            title : title,
            // completed : false,
        };
        const temp = [...todos];
        temp.push(newTodo);
        setTodos(temp);
        
        setTitle("");
    }

    const handleClear = (e) => {
        e.preventDefault();
        const temp = [];
        setTodos(temp);
    }

    
    
    return (
    <div className="todoContainer">
        <h1>Mis tareas</h1>
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" placeholder="Ingresa una tarea"  value={title}/><input 
            onClick={handleSubmit} 
            type="submit" 
            placeholder="Ingresa una tarea"
            value="crear tarea" 
            className="buttonCreate"/>
            <input 
            onClick={handleClear} 
            type="submit" 
            value="borrar tareas" 
            className="buttonClear"/>
            
        </form>
        <div className="todosContainer">
        {todos.map((item) => (
                <Todo key={item.id} item = {item}/>
            ))}
        </div>
    </div>
    );
}