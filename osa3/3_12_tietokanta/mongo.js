const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('no password given as a parameter');
}

const password = process.argv[2];

const appName = 'phonebook-app';

const url = `mongodb+srv://VeikkoLehmuskorpi:${password}@vl-cluster-0-crz1p.mongodb.net/${appName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.map(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number
  });

  person.save().then(response => {
    console.log(
      `added ${response.name} number ${response.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
