function recursivePower(n: number, power: number): number {
	if (power == 0) return 1
	return n * recursivePower(n, power-1)
}

console.log("recursivePower :")
console.log("expected output (1) :", recursivePower(2, 0))
console.log("expected output (1) :", recursivePower(34, 0))
console.log("expected output (64) :", recursivePower(2, 6))
console.log("expected output (10578455953408) :", recursivePower(28, 9))