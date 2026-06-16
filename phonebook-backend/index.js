const express = require('express')
var morgan = require('morgan')
//const cors = require('cors')

const app = express()
app.use(express.json()) // json parsor for the POST method's body-reading
//app.use(cors()) // allow cross-origin requests (from frontend to backend)
app.use(express.static('dist')) // deploy both frontend and backend from same url

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

/** 
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.tokens
  ].join(' ')
}))
  */

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/**
 * Write something at the root
 */
app.get('/', (request, response) => {
  response.send('<h1>Placeholder Text</h1>')
})

/**
 * GET all entries from the phonebook
 */
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

/**
 * GET the number of entries in phonebook
 * and the time the request was made
 */
app.get('/info', (request, response) => {
  const formattedTime = new Date().toString()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${formattedTime}</p>`
  )
})

/**
 * GET the phonebook entry with the specified id
 */
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (!person) {
    response.status(404).end() // respond with 404 (not found) if person isn't in records
  } else {
    response.json(person)
  }
})

/**
 * DELETE the phonebook entry with the specified id
 */
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id) // only keep people that don't match the id-to-delete
  response.status(204).end() // respond with 204 (no content)
  // because nothing is supposed to be returned from a delete request anyway
})

function getRandomId() {
  const min = Math.max(...persons.map(p => p.id)) + 1 // get the current max id + 1
  const max = 10000000000000
  
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}

/**
 * POST (add) a new entry to the phonebook
 */
app.post('/api/persons', (request, response) => {
  const id = getRandomId()
  const body = request.body
  const nameExists = persons.some(p => p.name === body.name)

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and number missing"
    })
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  //console.log(person)
  response.json(person)
  //response.send(`${person.name} has been added to the phonebook!`)
})

/**
 * Run the server on the RENDER PORT OR default to localhost:3001
 */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})