import { useState, useEffect } from 'react'
import queryService from './services/countryAPI'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    queryService
      .getAll()
      .then(initCountries => {
        setCountries(initCountries)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log("handleNameChange ran:", event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const filteredCountries = countries.filter(c => {
    const currName = c.name.common.toLowerCase()
    if (filterName === "") {
      return true
    }
    return currName.includes(filterName)
  })

  const handleShow = name => {
    setFilterName(name.toLowerCase())
  }

  return (
    <div>
      <Filter name={filterName} f={handleFilterChange}/>
      <Countries countries={filteredCountries} handleShow={handleShow}/>
    </div>
  )
}

export default App
