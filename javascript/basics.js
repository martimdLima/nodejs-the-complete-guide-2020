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
}

const add = (a,b) => a + b;
const add1 = a => a + 1;
const addRandom = () => 3 * 3.14;

const person = {
    name: 'user',
    age: 29,
    greet() {
        console.log('My name is: ' + this.name);
    }
};



console.log(sumarizeUser(name, age, hasHobbies));

console.log(add(1, 2));
console.log(add1(2));
console.log(addRandom());

person.greet();
