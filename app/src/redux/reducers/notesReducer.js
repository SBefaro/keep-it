/* const initial_state = [
    {
      "title": "Welcome!",
      "content": "Welcome to Keep It! You can start by reading the \"Help\" section or creating your account.",
      "date": "2022-10-06T17:57:35.377Z",
      "important": true,
      "user": {
        "name": "admin",
        "username": "admin"
      },
      "id": "633f13e8f5a0b4e220213752"
    },
    {
      "title": "Create and Delete are for Users Only",
      "content": "You can visualize them but you won't be able to use them unless you're logged in.",
      "date": "2022-10-06T17:57:28.076Z",
      "important": false,
      "user": {
        "name": "admin",
        "username": "admin"
      },
      "id": "633f1575f5a0b4e220213768"
    },
    {
      "title": "Try the Filters!",
      "content": "You can filter the notes by Importance and by Title/Content using the searchbar.",
      "date": "2022-10-06T17:57:17.061Z",
      "important": true,
      "user": {
        "name": "admin",
        "username": "admin"
      },
      "id": "633f1489f5a0b4e22021375a"
    },
    {
      "title": "\"My Notes\" Section",
      "content": "After login, you will be able to see your Welcome tab in the navbar, where you can see your notes created and also your profile.",
      "date": "2022-10-06T17:57:11.541Z",
      "important": false,
      "user": {
        "name": "admin",
        "username": "admin"
      },
      "id": "633f1507f5a0b4e22021375e"
    },
    {
      "title": "Know More!",
      "content": "You can visit the \"About\" section to know more about me and the tech stack used to create this site.\nHope you enjoy Keep It!",
      "date": "2022-10-06T17:56:11.353Z",
      "important": false,
      "user": {
        "name": "admin",
        "username": "admin"
      },
      "id": "633f16b5f5a0b4e22021376d"
    }
  ] */
  
const initialState = []

const notesReducer = (state = initialState, action) => {
    switch(action.type){
        case '@notes/INIT':
            return action.payload;
        case '@notes/CREATE':
            return [action.payload, ...state];
        case '@notes/EDIT':
            state = state.filter(note => note.id !== action.payload.id)
            return [action.payload, ...state];
        case '@notes/DELETE':
            return state.filter(note => note.id !== action.payload);
        default:
            return state;
        
    }
}


export default notesReducer