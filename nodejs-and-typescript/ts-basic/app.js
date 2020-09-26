"use strict";
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const buttonElement = document.querySelector("button");
const numResults = [];
const textResults = [];
function sum(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + num2;
    }
    else {
        return +num1 + +num2;
    }
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener("click", () => {
    const num1 = +num1Element.value;
    const num2 = +num2Element.value;
    const numResult = sum(num1, num2);
    numResults.push(numResult);
    const stringResult = sum(num1, num2);
    textResults.push(stringResult);
    console.log(numResults);
    console.log(textResults);
    printResult({ val: numResult, timestamp: new Date() });
});
//console.log(sum(1, 6));
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked!');
    }, 1000);
});
myPromise.then((result) => {
    console.log(result.split('w'));
});
