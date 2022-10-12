import './Note.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteNote } from '../../../redux/actions/notesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function Note( {title, content, date, important, id, user, editNote, setEditNote }){

    const [year, month] = date.split("-")
    const day = date.split("-")[2].substring(0,2)
    const time = date.split("-")[2].substring(3,11)

    const [isEdit, setIsEdit] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    const handleEdit = () => {
        setIsEdit(!isEdit);
        setEditNote({
            ...editNote,
            id,
            title,
            content,
            important
        })
    }


    const dispatch = useDispatch();

    const handleDelete = (e) =>{
        e.preventDefault();
        const token = user? user.token : null
        if(token){
            dispatch(deleteNote(id, token))
        }
        else{
            setDeleteWarning(true);
            setTimeout(()=>{setDeleteWarning(false)}, 5000)

        }
   
    }

    return(
        <li className={isEdit ? "note" : "note"}>
            <h3 className='note-title'>{title? title : 'Untitled'}</h3>
            <p className='note-content'>{content}</p>
            <small className="datetime">Last modified: {day}/{month}/{year} at {time}</small>  
            <p className="important-text">{important ? <FontAwesomeIcon icon={faCircleExclamation} className="circle__exclamation" /> : 'Not Important'}</p>
            <span className="popup">
            {important ? 'This note is important!' : ""}
            </span> 

            {deleteWarning ? <p className='delete-warning'>You must be logged to delete a note!</p> : ""}
            <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} className="pen" />  
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="trash" />  
        </li>
    )
}