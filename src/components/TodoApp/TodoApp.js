import React, { useEffect, useState } from "react";

import Todo from '../Todo/Todo'
import './TodoApp.css'

const TodoApp = () => {

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState( JSON.parse(localStorage.getItem('savedTodos')) || [] )
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
        let newTodos = todos.filter( (todo) => todo.id !== id )
        setTodos( newTodos )
        console.log(newTodos)
    }

    const showEditModal = (modalProps)=>{
        setModalProps(modalProps)
        document.getElementById('editModal').classList.toggle('show')
    }

    // save in localstorage
    const saveTodosState = (todo = undefined)=>{
        if(todo){
            todos.forEach((item, ind) => {
                if(item.id === todo.id ){
                    todos[ind] = todo
                    console.log(todo)
                }
            })   
        }
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    }

    useEffect(()=>{
        saveTodosState()
    },[todos])

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
                                    <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} showEditModal={showEditModal} saveTodosState={saveTodosState}/>
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
                    <input id="editModalTextbox" type="text" value={modalProps.primaryMessage} placeholder="Enter new title"></input>
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