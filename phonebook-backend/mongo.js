const mongoose = require('mongoose')
let mode = "POST"

if (process.argv.length === 3) {
    mode = "QUERY"
} else if (process.argv.length < 5) {
  console.log('Usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.vwk4c0t.mongodb.net/phonebook?retryWrites=true&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
.catch(err => {
    console.error('DB connection error:', err.message)
    process.exit(1)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (mode === "POST") {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
        process.exit(0)
    }).catch(err => {
        console.error('Save error:', err.message)
        mongoose.connection.close()
        process.exit(1)
    })
}

if (mode === "QUERY") {
    Person
        .find({})
        .then(persons => {
            console.log("phonebook:")
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
            process.exit(0)
        })
        .catch(err => {
            console.error('Query error:', err.message)
            mongoose.connection.close()
            process.exit(1)
        })
}




