const name = "Max";
let age = 29;
const hasHobbies = true;

function sumarizeUser(userName, userAge, userhasHobby) {
  return (
    "Name is " +
    userName +
    ", is age is " +
    userAge +
    ", is hobbies are: " +
    userhasHobby
  );
}

console.log(sumarizeUser(name, age, hasHobbies));
