"use strict";
var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var buttonElement = document.querySelector("button");
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
buttonElement.addEventListener("click", function () {
    var numResults = [];
    var textResults = [];
    var num1 = +num1Element.value;
    var num2 = +num2Element.value;
    var numResult = sum(num1, num2);
    numResults.push(numResult);
    var stringResult = sum(num1, num2);
    textResults.push(stringResult);
    console.log(numResults);
    console.log(textResults);
    printResult({ val: numResult, timestamp: new Date() });
});
//console.log(sum(1, 6));
