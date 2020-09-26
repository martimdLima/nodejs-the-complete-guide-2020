const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const buttonElement = document.querySelector("button")!;


function sum(num1: number | string, num2: number | string) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + num2;
  } else {
    return +num1 + +num2;
  }
}

function printResult(resultObj: { val: number; timestamp: Date }) {
  console.log(resultObj.val);
}

buttonElement.addEventListener("click", () => {

  const numResults: number[] = [];
  const textResults: string[] = [];  

  const num1 = +num1Element.value;
  const num2 = +num2Element.value;

  const numResult = sum(num1, num2);
  numResults.push(numResult as number);
  const stringResult = sum(num1, num2);
  textResults.push(stringResult as string);
  
  console.log(numResults);
  console.log(textResults);
  
  printResult({val: numResult as number, timestamp: new Date()})
});

//console.log(sum(1, 6));
