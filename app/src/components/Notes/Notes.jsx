import Note from './Note/Note'
import './Notes.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { initNotesByUsername, initNotesAll } from '../../redux/actions/notesActions'
import CreateNoteForm from './CreateNoteForm/CreateNoteForm'
import EditNoteForm from './EditNoteForm/EditNoteForm'
import Filter from '../Filter/Filter'

const Notes = ({title, view}) => {

    const { user } = useSelector(state => state.authReducer)
      
    const notes = useSelector(state => state.notes)
    const [loading, setLoading] = useState(false)
    const [filteredNotes, setFilteredNotes] = useState([])

    // Handler to use as forwardRef
    const noteCreator = useRef()
    const handleCreate = () =>{noteCreator.current.focus()}

    const EDITNOTE_INITIAL_STATE = {
      id: null,
      title: "",
      content: "",
      important: false
    }
    const [editNote, setEditNote] = useState(EDITNOTE_INITIAL_STATE)


    const searchInput = useRef();

    const dispatch = useDispatch()

    useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
        if(view === "home"){
          dispatch(initNotesAll())
        }
        else{
          dispatch(initNotesByUsername(user?.username))
        }
        setLoading(false)
      }, 2000)
    }, [dispatch, view, user?.username])

    useEffect(()=>{
      setFilteredNotes(notes)},[notes])

 
    return (
      <div>
          <h1>{title}</h1>

          <Filter notes={notes} searchInput={searchInput} setFilteredNotes={setFilteredNotes} />

          {loading ? 
          (<div className="d-flex justify-content-center">
              <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                <span className="sr-only"></span>
              </div>
           </div>
          ) :
          (
          <>
          {editNote.id? <EditNoteForm {...editNote} setEditNote={setEditNote} INITIAL_STATE={EDITNOTE_INITIAL_STATE} searchInput={searchInput} /> : null}
          <div>
            <CreateNoteForm user={user} searchInput={searchInput} ref={noteCreator}/>
            {filteredNotes.length === 0 && 
              <div className='empty-notes-container'>
                  <h3 className='empty-notes-title'>Oops! You don't have any notes yet</h3>
                  <p className='empty-notes-text'>Why don't you start by <span className='note-creator-span' onClick={handleCreate}>creating one?</span></p>
              </div>
              }
            <ol className='notes-list'>
              {filteredNotes.map(note => (<Note key={note.id} {...note} user={user} editNote={editNote} setEditNote={setEditNote} />))}
            </ol>
          </div>
          </>
          )}
      </div>
    )
}

export default Notes