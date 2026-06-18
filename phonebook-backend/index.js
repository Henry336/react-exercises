require('dotenv').config() // load environment variables from .env file
const express = require('express')
const Person = require('./models/person') // CONNECT TO THE DATABASE

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

/**
 * Write something at the root (TEST)
 */
app.get('/', (request, response) => {
  response.send('<h1>Placeholder Text</h1>')
})

/**
 * GET all entries from the phonebook
 */
app.get('/api/persons', (request, response, next) => {
    Person.find({})
      .then(persons => {
        response.json(persons)
      })
      .catch(err => next(err))
})

/**
 * GET the number of entries in phonebook
 * and the time the request was made
 * 
*/
app.get('/info', (request, response) => {
  const formattedTime = new Date().toString()
  Person
    .find({})
    .then(persons => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${formattedTime}</p>`
      )
    })
    .catch(err => {
      response.status(500).end()
    })
})


/**
 * GET the phonebook entry with the specified id
 */
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() // 404 (NOT FOUND)
      }
    })
    .catch(err => next(err))
})

/**
 * DELETE the phonebook entry with the specified id
 */
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

/**
 * The following function is no longer used because we have linked the backend to a MongoDB
function getRandomId() {
  const min = Math.max(...persons.map(p => p.id)) + 1 // get the current max id + 1
  const max = 10000000000000
  
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}
*/

/**
 * UPDATE the phonebook entry with the specified id
 */
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and/or number missing"
    })
  }

  const { name, number } = body

  Person
    .findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save()
    })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

/**
 * POST (add) a new entry to the phonebook
 */
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and/or number missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  // save person to the database
  person
    .save()
    .then(savedPerson => {
      if (body.number.length > 15) {
        const error = new Error('Number cannot be longer than 15 digits')
        error.name = 'ValidationError'
        error.status = 400
        throw error
      }
      console.log(`${savedPerson.name} ${savedPerson.number} has been saved to phonebook`)
      response.json(savedPerson)
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: "wrongly formatted id"})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

/**
 * Run the server on the RENDER PORT OR default to localhost:3001
 */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})