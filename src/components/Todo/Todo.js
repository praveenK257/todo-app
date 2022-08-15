import React, { useEffect, useState } from "react";

import './Todo.css'
import deleteIcon from '../../images/deleteIcon.png'
import editIcon from '../../images/editIcon.png'

const Todo = ({todo, deleteTodo, showEditModal, saveTodosState, changeTodoTitle}) => {
    
    const [title, setTitle] = useState(todo.title)
    
    const [status, setStatus] = useState(todo.status)

    const deleteTodoFromParent = ()=>{
        deleteTodo(todo.id)
    }

    const editTodoTitle = (e)=>{
        if(!e){
            return
        }
        let target = e.target.offsetParent
        
    }

    const openEditModal = (e)=>{
        showEditModal({
            target: Todo, heading: todo.title, primaryMessage: title,
            todoId: todo.id, 
            // accept: (e)=>{
            //     changeTodoTitle(e, todo.id)
            //     editTodoTitle()
            //     document.getElementById('editModal').classList.add('show')
            // } 
            // ,
            // reject: (e)=>{
            //     document.getElementById('editModal').classList.remove('show')
            // }
        }, editTodoTitle)
    }

    const editTodoStatus = (e)=>{
        // Toggle status
        let target = e.target
        todo.status = (todo.status==1)?0:1
        setStatus(status==1?0:1)
        // target.classList.toggle('complete')
        // target.parentElement.previousElementSibling.classList.toggle('complete')
        saveTodosState(todo)
    }

    useEffect(()=>{
      console.log('triggered')  
    },[todo])

    return (
        <div className="todo">
            <div className={"todoTitle "+(todo.status==1 ? 'complete': '')}>{title}</div>
            <div className="todoActions">
                <button className="todoBtn withIcon" onClick={deleteTodoFromParent}>
                    <img className="todoBtnIcon" src={deleteIcon}></img> 
                </button>
                <button className="todoBtn withIcon" onClick={openEditModal}>
                    <img className="todoBtnIcon" src={editIcon} style={{height: 27 + 'px'}}></img> 
                </button>
                <button className={"todoBtn status "+(todo.status==1 ? 'complete': '')} onClick={editTodoStatus}> {status == 0 ? "Pending" : "Complete"} </button>
            </div>
        </div>
    )
}

export default Todo;