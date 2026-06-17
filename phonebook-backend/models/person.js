// CONNECT TO THE DATABASE

const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB...', url)
mongoose.connect(url)
    .then(result => {
        console.log('Successfully connected to MongoDB')
    })
    .catch(err => {
        console.error('DB connection error:', err.message)
        process.exit(1)
    })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

////////////////////////////////////////////////////////