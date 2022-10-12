import './EditNoteForm.css'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateNote } from '../../../redux/actions/notesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const EditNoteForm = ({title, content, important, id, setEditNote, INITIAL_STATE, searchInput }) => {
    const [editNoteTitle, setEditNoteTitle] = useState(title);
    const [editNoteContent, setEditNoteContent] = useState(content);
    const [importance, setImportance] = useState(important)

    
    const handleContentChange = e => setEditNoteContent(e.target.value);
    const handleTitleChange = e => setEditNoteTitle(e.target.value)
    const handleImportance = () => setImportance(!importance)

    const importanceCheckbox = useRef();

    const dispatch = useDispatch();

    const handleCancel = () => {
        setEditNote(INITIAL_STATE)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const newContent = {
            title: editNoteTitle,
            content: editNoteContent,
            important: importance
        }
        dispatch(updateNote(id, newContent));
        setEditNote(INITIAL_STATE)
        searchInput.current.value = ''
    }

    return(
        <>

            <div className='edit-form-overlay' onClick={handleCancel}></div>
            <form className='note-form edit-form' id='edit-form'>
                <FontAwesomeIcon icon={faXmark} className='x-mark' onClick={handleCancel} />
                <input type="text" name='title' className='input-title edit-title' value={editNoteTitle} onChange={handleTitleChange} placeholder="Title"/>
                <hr className="note-form-hr" />
                <textarea type="text" name='content' className='input-content edit-input' value={editNoteContent} onChange={handleContentChange} placeholder="Create a note..."/>
                <div className='importance-container'>
                    <input type="checkbox" ref={importanceCheckbox} id="importance-checkbox" onChange={handleImportance}/>
                    <label htmlFor='importance-checkbox' className={importance ? 'span-important' : 'span-not-important' }>
                        {importance ?
                        <>
                        <FontAwesomeIcon icon={faCircleExclamation} className="circle-exclamation" /><span>Important</span>
                        </> : 
                        <span>Not Important</span>}
                    </label>
                    <button onClick={handleEdit} className="edit-button">Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
                </div>
            </form>

        </>

    )
}

export default EditNoteForm