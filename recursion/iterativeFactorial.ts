function iterativeFactorial(n: number): number {
	let result = 1

	for (let i = n; i > 0; i--) {
		result *= i
	}
	return result
}

console.log("iterativeFactorial :")
console.log("expected output (1) :", iterativeFactorial(0))
console.log("expected output (1) :", iterativeFactorial(1))
console.log("expected output (2) :", iterativeFactorial(2))
console.log("expected output (24) :", iterativeFactorial(4))
console.log("expected output (362880) :", iterativeFactorial(9))