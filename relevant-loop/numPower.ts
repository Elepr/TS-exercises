function numPower(n: number, power: number): number {
	let result = 1

	for (let i = 0; i < power; i++) {
		result *= n
	}
	return result
}

// function numPower(n: number, power: number): number {
//     return n ** power
// }

// function numPowerPow(n: number, power: number): number {
//     return Math.pow(n, power)
// }

console.log("numPower :")
console.log("expected output (1) :", numPower(2, 0))
console.log("expected output (1) :", numPower(34, 0))
console.log("expected output (64) :", numPower(2, 6))
console.log("expected output (10578455953408) :", numPower(28, 9))