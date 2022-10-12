const Help = () => {
    return(
        <div className="faq-container">
            <h1>How <span className="gradient-color">Keep It!</span>  works?</h1>
            <article>
                <h4>Create a Note:</h4>
                <p>When clicking on the "Create a note..." field the form will be displayed. Both title and content are optional fields, but at least one of them must be filled to create the note.</p>
                <p>You can mark the note as 'Important' if you want to highlight it from the not important ones.</p>
                <p>The "Create" button will only be enabled if you are logged in.</p>
            </article>
            <article>
                <h4>Edit a note:</h4>
                <p>The edit button is visible at bottom right of each note. After clicking on it, the form will be displayed with the current information.</p>
                <p>When you finish editing, you can click on the "Edit" button and save your changes.</p>
                <p>I left this feature available for everyone so you can try it out!</p>
            </article>
            <article>
                <h4>Delete a note:</h4>
                <p>The trash button is visible at the bottom right of each note.</p>
                <p>In order to delete a note you must click on it.</p>
                <p>This feature is only available if you're logged in.</p>
            </article>
            <article>
                <h4>Filters and Searchbar:</h4>
                <p>There are three filter buttons where you can choose to display all the notes or only those important/not important ones.</p>
                <p>The search field will filter the notes by title or/and by content.</p>
                <p>Both Importance and Searchbar filters can be combined together.</p>
            </article>
            <article>
                <h4>Personal Notes and Profile</h4>
                <p>After logging in, your name will be displayed in top right of the navbar with an overlay menu.</p>
                <p>In "My Notes" section you can view your created notes.</p>
                <p>In "My Profile" section you can visualize your basic information.</p>
            </article>
            <h3>Thanks for reading and hope you enjoy Keep It!</h3>
        </div>
    )
}

export default Help