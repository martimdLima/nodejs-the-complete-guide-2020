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

buttonElement.addEventListener("click", () => {
  const num1 = +num1Element.value;
  const num2 = +num2Element.value;

  const result = sum(num1, num2);
  const stringResuslt = sum(num1, num2);

  console.log(result);
  console.log(stringResuslt);
});

//console.log(sum(1, 6));
