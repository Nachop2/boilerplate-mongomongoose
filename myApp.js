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

  Person.findById({ _id: personId }, function (err, people) {
    if (err) return console.error(err);
    people.favoriteFoods.push(foodToAdd);
    people.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: -1 })
    .limit(2)
    .select({ age: 0, name: 1 }).exec(function (err, people) {
      if (err) return console.error(err);
      done(null, people);
    })

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
