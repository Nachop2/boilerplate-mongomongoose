require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


let Person = mongoose.model('Person', personSchema);



const createAndSavePerson = (done) => {

  let person = new Person({
    name: "a",
    age: 10,
    favoriteFoods: ["egg", "burger"]
  })
  person.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [{
  name: "a2",
  age: 10,
  favoriteFoods: ["egg", "salad"]
}, {
  name: "a3",
  age: 11,
  favoriteFoods: ["milk", "fruit"]
}]

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

let personName = "a2"

const findPeopleByName = (personName, done) => {

  Person.find({ name: personName }, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const person = Person.findById({ _id: personId }, function (err, people) {
    if (err) return console.error(err);

  })

  person.favoriteFoods.push(foodToAdd);
  person.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
