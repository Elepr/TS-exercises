function isNumberPresent(numbers: number[], n: number): boolean {
    for (const x of numbers) {
        if (x == n) return true
    }
    return false
}

// function isNumberPresent(numbers: number[], n: number): boolean {
//     return numbers.includes(n)
// }

console.log("isNumberPresent :")
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 1));
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 2));
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 3));
console.log("expected output (true) :", isNumberPresent([0], 0));
console.log("expected output (false) :", isNumberPresent([], 0));
console.log("expected output (false) :", isNumberPresent([1, 2, 3], 7));