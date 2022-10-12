import './CreateNoteForm.css'
import { useState, useRef, forwardRef} from "react"
import { useDispatch } from 'react-redux'
import { createNote } from '../../../redux/actions/notesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

const CreateNoteForm = forwardRef(({user, searchInput}, ref) => {
    


    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [importance, setImportance] = useState(false)

    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const heightWhenVisible = { height: visible ? '150px' : null }

    const showVisibility = (e) => {
        e.preventDefault();
        if(visible === false){
            setVisible(true)
        } 
    }
    const hideVisibility = e => {
        e.preventDefault();
        if(visible === true){
            setVisible(false)
            setNewNoteTitle('')
            setNewNoteContent('')
        } 
    }

    const importanceCheckbox = useRef();


    const dispatch = useDispatch()

    const handleContentChange = e => setNewNoteContent(e.target.value);
    const handleTitleChange = e => setNewNoteTitle(e.target.value)
    const handleImportance = () => setImportance(!importance)



    const handleSubmit = (e) => {
        e.preventDefault();
        if(newNoteContent !== '' || newNoteTitle !== ''){
            const noteToAdd = {
                title: newNoteTitle || "Untitled",
                content: newNoteContent,
                important: importance
            }
            const token = user? user.token : null
            if(token){
                dispatch(createNote(noteToAdd, token))
                setNewNoteTitle('')
                setNewNoteContent('')
                searchInput.current.value = ''
                if(visible === true){
                    setVisible(false)
                }
            }
        }
    }





    return(
    <form className="note-form">
        <FontAwesomeIcon icon={faXmark} className='x-mark' onClick={hideVisibility} style={showWhenVisible} />
        <input type="text" name='title' className='input-title' value={newNoteTitle} onChange={handleTitleChange} placeholder="Title" style={showWhenVisible}/>
        <hr style={showWhenVisible} className="note-form-hr"></hr>
        <textarea type="text" name='content' className='input-content' value={newNoteContent} onChange={handleContentChange} onFocus={showVisibility} placeholder="Create a note..." style={heightWhenVisible} ref={ref}/>
        <div className='importance-container' style={showWhenVisible}>
            <input type="checkbox" ref={importanceCheckbox} id="importance-checkbox" onChange={handleImportance}/>
            <label htmlFor='importance-checkbox' className={importance ? 'span-important' : 'span-not-important' }>
            
                {importance ?
                <>
                <FontAwesomeIcon icon={faCircleExclamation} className="circle-exclamation" /><span>Important</span>
                </> : 
                <span>Not Important</span>}
            </label>
        
            {user ? "" : <p className='create-warning'>Please login to create a note</p>}
            <button onClick={handleSubmit}>Create <FontAwesomeIcon icon={faCheck} /></button>
        </div>
    </form>
    )
});

export default CreateNoteForm