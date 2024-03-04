function iterativePower(n: number, power: number): number {
    let result = 1

    for (let i = 0; i < power; i++) {
        result *= n
    }
    return result
}

console.log("iterativePower :")
console.log("expected output (1) :", iterativePower(2, 0));
console.log("expected output (1) :", iterativePower(34, 0));
console.log("expected output (64) :", iterativePower(2, 6));
console.log("expected output (10578455953408) :", iterativePower(28, 9));