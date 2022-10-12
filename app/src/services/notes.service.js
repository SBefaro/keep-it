import axios from 'axios';

const baseUrl = '/api/notes'

const getAllNotes = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const createNote = (newNote, token) => {
    const config = {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    return axios.post(baseUrl, newNote, config)
        .then(response => response.data)
}

const updateNote = (id, newContent) => { 
    return axios.put(`${baseUrl}/${id}`, newContent)
        .then(response => response.data)
}

const deleteNote = (id, token) => {
    const config = {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    return axios.delete(`${baseUrl}/${id}`, config)
    .then(response => response.data)
}

const getAllNotesByUsername = (username) => {
  return axios.get(`/api/users/${username}`)
      .then(response => response.data)
}

//eslint-disable-next-line
export default {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getAllNotesByUsername
}