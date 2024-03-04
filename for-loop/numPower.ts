function numPower(n: number, power: number): number {
    let result = 1

    for (let i = 0; i < power; i ++) {
        result*= n
    }
    return result
}

console.log("numPower :")
console.log("expected output (1) :", numPower(12, 0));
console.log("expected output (1) :", numPower(34, 0));
console.log("expected output (64) :", numPower(2, 6));
console.log("expected output (10578455953408) :", numPower(28, 9));

