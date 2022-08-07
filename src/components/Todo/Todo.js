import React, { useState } from "react";

import './Todo.css'

const Todo = ({todo, deleteTodo}) => {
    
    const [title, setTitle] = useState(todo.title)
    
    const deleteTodoFromParent = ()=>{
        deleteTodo(todo.id)
    }

    return (
        <div className="todo">
            <span className="todoTitle">{title}</span>
            <button className="deleteBtn" onClick={deleteTodoFromParent}> DELETE </button>
            <button className="editBtn"> EDIT </button>
            <button className="statusBtn"> Status </button>
        </div>
    )
}

export default Todo;