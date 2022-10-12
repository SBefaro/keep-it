import notesService from '../../services/notes.service'


export const initNotesAll = () => (dispatch) => {
    return notesService.getAllNotes()
                .then(data => dispatch({
                    type: '@notes/INIT',
                    payload: data
                }))
}

export const initNotesByUsername = (username = "admin") => (dispatch) => {
    return notesService.getAllNotesByUsername(username)
                .then(data => dispatch({
                    type: '@notes/INIT',
                    payload: data.notes
                }))
}

export const createNote = (newNote, token) => dispatch => {
    return notesService.createNote(newNote, token)
                .then(note => dispatch({
                    type: '@notes/CREATE',
                    payload: note
                }))
}

export const deleteNote = (id, token) => dispatch => {
    return notesService.deleteNote(id, token)
                .then(() => dispatch({
                    type:'@notes/DELETE',
                    payload: id
                }))
}

export const updateNote = (id, newContent) => dispatch => {
    return notesService.updateNote(id, newContent)
                .then(note => dispatch({
                    type: '@notes/EDIT',
                    payload: note
                }))
}