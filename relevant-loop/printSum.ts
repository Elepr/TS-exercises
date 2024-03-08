function printSum(numbers: number[]): void { //here, we have one less line compared a for loop
    let result = 0
    numbers.forEach(n => result += n)
    console.log(result)
}

console.log("printSum :")
printSum([10, 5, 3]);
// expected output : 18

function printSumOf(numbers: number[]): void { //here we have the same number of line compared a for loop, the differnce is in the loop condition not really profitable
    let result = 0

    for (let n of numbers) {
        result += n
    }
    console.log(result)
}

console.log("printSum :")
printSumOf([10, 5, 3]);
// expected output : 18

function printSumReduce(numbers: number[]): void { //this is my favorit method, just 2 line, is clear, makes the code more reading and compact
    let result = numbers.reduce((a, b) => a + b)
    console.log(result)
}

console.log("printSum :")
printSumReduce([10, 5, 3]);
// expected output : 18