import React, { useState } from "react";

import Todo from '../Todo/Todo'
import './TodoApp.css'

const TodoApp = () => {

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState( [] )
    const [modalProps, setModalProps] = useState({})

    const handleTodoCreation = (e)=>{
        setNewTodo(e.target.value)
    }

    const createTodo = ()=>{
        if(newTodo != ""){
            const todo = {
                id: Date.now(),
                title: newTodo,
                status: 0 // 0-NotComplete, 1-Complete
            }
            setTodos([...todos, todo])
            setNewTodo("")
            const textBox = document.getElementById('createTodoInput')
            textBox.value=""
            textBox.focus()
        }
        else{
            // Show error
        }
    }

    const deleteTodo = (id)=>{
        let newTodos = todos.filter(todo=> todo.id !== id)
        setTodos( newTodos )
    }

    const showEditModal = (modalProps)=>{
        setModalProps(modalProps)
        document.getElementById('editModal').classList.toggle('show')
    }

    return (
        <>
            <div className="appContainer">
                <div className="todoAppHeader">
                <div className="todoAppTitle">
                    Todo App
                </div>
                <div className="todoCreation">
                    <input id="createTodoInput"  className="todoInput create" type="text" placeholder="Type in something" onChange={e => {handleTodoCreation(e)}}></input>
                    <button id="createTodoBtn" className="todoBtn create" onClick={createTodo}>Add Task</button>
                </div>
                </div>
                <hr></hr>
                <div className="todosContainer">
                    { (todos.length === 0) ?
                        <div className="emptyMessage">No tasks found :)</div> :

                        <div className="todos">
                            {
                                todos.map((todo, index)=>
                                    <Todo key={index} todo={todo} deleteTodo={deleteTodo} showEditModal={showEditModal}/>
                                ) 
                            }                           
                        </div>
                    }
                </div>
            </div>
            {/* Modal  */}
            <div id="editModal" className="modal">
                <div className="modalHeader">
                    {modalProps.heading}
                </div>
                <div className="modalContent">
                    {modalProps.primaryMessage}
                </div>
                <div className="modalFooter">
                    <button className="todoBtn" onClick={modalProps.accept}>Save</button>
                    <button className="todoBtn" onClick={modalProps.reject}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default TodoApp;