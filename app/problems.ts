const questions: string[] = [
  `function sumArray(numbers) {
      let sum = 0;
      for (let number of numbers) {
          sum += number;
      }
      return sum;
  }
  
  const numbers = [1, 2, 3, 4, 5];
  console.log('Sum:', sumArray(numbers));`,
  `function isEvenOrOdd(number) {
    if (number % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(isEvenOrOdd(10));
console.log(isEvenOrOdd(7));`,
`function findString(array, target) {
    for (let item of array) {
        if (item === target) {
            return true;
        }
    }
    return false;
}

const fruits = ["apple", "banana", "cherry"];
console.log(findString(fruits, "banana"));
console.log(findString(fruits, "grape"));`
  ];
  
  export default questions;
  