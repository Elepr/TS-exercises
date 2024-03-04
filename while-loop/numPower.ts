function numPower(n: number, power: number): number {
    let result = 1

    let i = 0
    while (i < power) {
        result *= n
        i++
    }
    return result
}

console.log("numPower :")
console.log("expected output (1) :", numPower(12, 0));
console.log("expected output (1) :", numPower(34, 0));
console.log("expected output (64) :", numPower(2, 6));
console.log("expected output (10578455953408) :", numPower(28, 9));
