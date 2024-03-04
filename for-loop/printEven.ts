function printEven(numbers: number[]): void {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 == 0) console.log(numbers[i])
    }
}

console.log("printEvent :")
printEven([13, 23, 12, 45, 22, 48, 66, 100]);
// expected output : 
//   12
//   22
//   48
//   66
//   100
