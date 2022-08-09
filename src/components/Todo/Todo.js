import React, { useState } from "react";

import './Todo.css'
import deleteIcon from '../../images/deleteIcon.png'
import editIcon from '../../images/editIcon.png'

const Todo = ({todo, deleteTodo}) => {
    
    const [title, setTitle] = useState(todo.title)
    
    const deleteTodoFromParent = ()=>{
        deleteTodo(todo.id)
    }

    return (
        <div className="todo">
            <div className="todoTitle">{title}</div>
            <div className="todoActions">
                <button className="todoBtn withIcon" onClick={deleteTodoFromParent}>
                    <img className="todoBtnIcon" src={deleteIcon}></img> 
                </button>
                <button className="todoBtn withIcon">
                    <img className="todoBtnIcon" src={editIcon} style={{height: 27 + 'px'}}></img> 
                </button>
                <button className="todoBtn status"> Status </button>
            </div>
        </div>
    )
}

export default Todo;