import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import phoneService from './services/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [error, setError] = useState(null)
  const [noti, setNoti] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

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
    }

    const temp = persons.filter(person => person.name === newName)
    if (temp.length !== 0) {
      let result = window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)
      if (!result) {
        return
      }

      const target = temp[0]
      const newPerson = {
        ...target,
        number: newNumber
      }
      
      phoneService
        .update(target.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === target.id ? newPerson : person))
          resetInput()
          setNoti(`Updated ${returnedPerson.name}'s phone number`)
          setTimeout(() => { setNoti(null) }, 5000)
        })
        .catch(error => {
          console.log("Error block triggered")
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => { setError(null) }, 5000)
        })

      return
    }

    phoneService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        resetInput()
        setNoti(`Added ${returnedPerson.name}`)
        setTimeout(() => { setNoti(null) }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  const deletePerson = (id) => {
    const target = persons.find(person => person.id === id)
    let result = window.confirm(`Delete ${target.name}?`)

    if (!result) {
      console.log("Entry not deleted")
      return
    }

    phoneService 
      .deleteEntry(id)
    
    setPersons(persons.filter(person => person.id !== id))
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
      <Notification message={noti} type="noti"/>
      <Notification message={error} type="error"/>
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
            <Person key={person.id} person={person} deletePerson={deletePerson}/>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App