const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
}
else if (process.argv.length===4) {
  console.log('Please provide a name and number')
  process.exit(1)
}
else if (process.argv.length>5) {
  console.log('Too many arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://xen:${password}@phonebook.cqyxo.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Phonebook"`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    console.log('Phonebook:')

    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })

    mongoose.connection.close()
  })
}
else if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then(result => {
    console.log('Added', result.name, 'number', result.number, 'to phonebook')

    mongoose.connection.close()
  })
}
