"use strict";
var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var buttonElement = document.querySelector("button");
function sum(num1, num2) {
    return num1 + num2;
}
buttonElement.addEventListener("click", function () {
    var num1 = +num1Element.value;
    var num2 = +num2Element.value;
    var result = sum(num1, num2);
    console.log(result);
});
//console.log(sum(1, 6));
