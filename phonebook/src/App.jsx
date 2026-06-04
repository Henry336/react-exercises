import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import AddForm from './components/AddForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(5)
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("reponse evaluated", response)
        setPersons(response.data)
      })
  })

  const resetInput = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("addPerson ran:", event.target)

    const person = {
      name: newName,
      number: newNumber,
      id: newId
    }

    setNewId(newId + 1)

    const temp = persons.filter(person => person.name === newName)
    if (temp.length !== 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(person))
    resetInput()
  }

  const handleNameChange = (event) => {
    console.log("handleNameChange ran:", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("handleNumberChange ran:", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const filteredPeople = persons.filter(person => {
    const currName = person.name.toLowerCase()
    if (filterName === "") {
      return true
    }
    return currName.includes(filterName)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filterName} func={handleFilterChange}/>
      <h3>Add New</h3>
      <AddForm 
        newName={newName}
        newNumber={newNumber}
        nameFunc={handleNameChange}
        numberFunc={handleNumberChange}
        submitFunc={addPerson}
      />

      <h3>Numbers</h3>
      <table>
        <tbody>
          {filteredPeople.map(person => (
            <Person key={person.id} person={person}/>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App