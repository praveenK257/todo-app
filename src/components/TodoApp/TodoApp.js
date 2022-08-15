import React, { useEffect, useState } from "react";

import Todo from '../Todo/Todo'
import './TodoApp.css'
import Modal from '../Modal/Modal'

const TodoApp = () => {

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState( JSON.parse(localStorage.getItem('savedTodos')) || [] )
    const [modalProps, setModalProps] = useState({})
    const [updateTitleInChild, setTitleInChild] = useState()
    
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
    }

    const showEditModal = (modalProps, childUpdate)=>{
        setModalProps(modalProps)
        setTitleInChild(childUpdate)
        document.getElementById('editModal').classList.toggle('show')
    }

    // save in localstorage
    const saveTodosState = (todo = undefined)=>{
        if(todo){
            todos.forEach((item, ind) => {
                if(item.id === todo.id ){
                    todos[ind] = todo
                }
            })   
        }
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    }

    const changeTodoTitle = (e, id)=>{
        todos.forEach((todo, ind)=>{
            if(todo.id === id){
                let updTodo = todo
                updTodo.title = document.getElementById('editModalTextbox').value
                todos[ind] = updTodo
            }
        })
        setTodos(todos)
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    }

    useEffect(()=>{
        console.log('triggered')
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
                                    <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} showEditModal={showEditModal} saveTodosState={saveTodosState} changeTodoTitle={changeTodoTitle}/>
                                ) 
                            }                           
                        </div>
                    }
                </div>
            </div>
            <Modal modalProps={modalProps} changeTodoTitle={changeTodoTitle}/>
        </>
    )
}

export default TodoApp;