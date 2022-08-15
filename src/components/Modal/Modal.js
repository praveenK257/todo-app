import React, { useState } from "react";

import './Modal.css'

const Modal = ({modalProps, changeTodoTitle}) => {

    const closeModal = (e) => {
        document.getElementById('editModal').classList.remove('show')
    }

    const save = (e) => {
        changeTodoTitle(e, modalProps.todoId)
        document.getElementById('editModal').classList.remove('show')
    }

    return (
        <div id="editModal" className="modal">
           <div className="freeze"></div>
            <div className="modalContent">
                <div className="modalHeader">
                    <span>Editing todo : <strong>{modalProps.heading}</strong></span>
                </div>
                <div className="modalBody">
                        <input id="editModalTextbox" type="text" placeholder="Enter new title"></input>
                </div>
                <div className="modalFooter">
                    <button className="todoBtn" onClick={save}>Save</button>
                    <button className="todoBtn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;