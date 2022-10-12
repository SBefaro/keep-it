import './Filter.css'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Filter = ({notes, searchInput, setFilteredNotes}) => {
    const radioImportant = useRef();
    const radioNonImportant = useRef();

    const handleFilter = () => {
        let filterResult
        if(searchInput.current.value === ''){
          if(radioImportant.current.checked){
            filterResult = notes.filter(note => note.important)
          }
          else if (radioNonImportant.current.checked){
            filterResult = notes.filter(note => note.important === false)
          }
          else{
            filterResult = notes
          }
        }
        else{
          if(radioImportant.current.checked){
            filterResult = notes.filter(note => note.important && (note.content.toLowerCase().includes(searchInput.current.value.toLowerCase()) || note.title.toLowerCase().includes(searchInput.current.value.toLowerCase())))
            
          }
          else if (radioNonImportant.current.checked){
            filterResult = notes.filter(note => note.important === false && (note.content.toLowerCase().includes(searchInput.current.value.toLowerCase()) || note.title.toLowerCase().includes(searchInput.current.value.toLowerCase())))
            
          }
          else{
            filterResult = notes.filter(note => note.content.toLowerCase().includes(searchInput.current.value.toLowerCase()) || note.title.toLowerCase().includes(searchInput.current.value.toLowerCase()))
            
          }
        }
        return setFilteredNotes(filterResult)
      }


      return (
      <div className='filters'>
        <div className='filters-radio'>
            <input type="radio" name='importance' id='radio-all' value='all' defaultChecked onClick={handleFilter} />
            <label htmlFor='radio-all' className='radio-all-label'>All</label>

            <input type="radio" name='importance' id='radio-important' value='important' onClick={handleFilter} ref={radioImportant} />
            <label htmlFor='radio-important' className='radio-important-label'>Important</label>

            <input type="radio" name='importance' id='radio-not-important' value='not-important' onClick={handleFilter} ref={radioNonImportant} />
            <label htmlFor='radio-not-important' className='radio-not-important-label'>Not Important</label>
        </div>
        <div className='searchbar'>


            <input type="search" name="search-input" className='search-input' placeholder='Search in my notes...'  onInput={handleFilter} ref={searchInput} />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="glass" />

        </div>
      </div>
      )
}

export default Filter