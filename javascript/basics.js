const name = "Max";
let age = 29;
const hasHobbies = true;

const sumarizeUser = (userName, userAge, userhasHobby) => {
  return (
    "Name is " +
    userName +
    ", is age is " +
    userAge +
    ", is hobbies are: " +
    userhasHobby
  );
};

console.log(sumarizeUser(name, age, hasHobbies));

const add = (a, b) => a + b;
const add1 = (a) => a + 1;
const addRandom = () => 3 * 3.14;

console.log(add(1, 2));
console.log(add1(2));
console.log(addRandom());

const person = {
  name: "user",
  age: 29,
  greet() {
    console.log("My name is: " + this.name);
  },
};

person.greet();

const hobbies = ["Sports", "Cooking"];

for (let hobby of hobbies) {
  console.log(hobby);
}

console.log(
  hobbies.map((hobby) => {
    return "Hobby: " + hobby;
  })
);

hobbies.push('Programming');
console.log(hobbies);
console.log(hobbies.map((hobby) => "Hobby: " + hobby));

const hobbiesCopy = hobbies.slice();
const hobbiesCopy2 = [...hobbies];

console.log(hobbiesCopy);
console.log(hobbiesCopy2);

// Spread Operator

const copiedPerson = {...person};
console.log(copiedPerson);

// Rest operator

const toArray = (...args) => {
    return args;
};

console.log(toArray(1,2,3, 4, 5));


