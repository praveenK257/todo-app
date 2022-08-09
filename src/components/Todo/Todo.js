import React, { useState } from "react";

import './Todo.css'

const Todo = ({todo, deleteTodo}) => {
    
    const [title, setTitle] = useState(todo.title)
    
    const deleteTodoFromParent = ()=>{
        deleteTodo(todo.id)
    }

    return (
        <div className="todo">
            <div className="todoTitle">{title}</div>
            <div className="todoActions">
                <button className="todoBtn delete" onClick={deleteTodoFromParent}> Delete </button>
                <button className="todoBtn edit"> Edit </button>
                <button className="todoBtn status"> Status </button>
            </div>
        </div>
    )
}

export default Todo;