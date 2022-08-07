import React, { useState } from "react";

import Todo from '../Todo/Todo'
import './TodoApp.css'

const TodoApp = () => {

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState( [] )
    
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
            const textBox = document.getElementById('createTodoInput')
            textBox.value=""
            textBox.focus()
        }
    }

    const deleteTodo = (id)=>{
        let newTodos = todos.filter(todo=> todo.id !== id)
        setTodos( newTodos )
    }

    const editTodo = (updatedTodo)=>{
        let thisTodo = todos.filter(todo=> updatedTodo.id === todo.id)
        thisTodo.title = updatedTodo.title
    }

    return (
        <>
            <div className="todoAppHeader">
            <div className="todoAppTitle">
                Todo App
            </div>
            <div className="todoCreation">
                <input id="createTodoInput" type="text" placeholder="Type in something" onChange={e => {handleTodoCreation(e)}}></input>
                <button id="createTodoBtn" onClick={createTodo}>Add Task</button>
            </div>
            </div>
            <hr></hr>
            <div className="todosContainer">
                { (todos.length === 0) ?
                    <div className="emptyMessage">No tasks found :)</div> :

                    <div>
                        {
                            todos.map((todo, index)=>
                                <Todo key={index} todo={todo} deleteTodo={deleteTodo}/>
                            ) 
                        }                           
                    </div>
                }
            </div>
        </>
    )
}

export default TodoApp;