function findLargest(numbers: number[]): number {
    let largest = numbers[0]

    let i = 0
    while (i < numbers.length) {
        if (largest < numbers[i]) largest = numbers[i]
        i++
    }
    return largest
}

console.log("findLargest :")
console.log("expected output (657) :", findLargest([12, 98, 34, 21, 657, 2, 31, 54, 29]));
console.log("expected output (-2) :", findLargest([-12, -98, -34, -21, -657, -2, -31, -54, -29]));
console.log("expected output (-12) :", findLargest([-12]));
