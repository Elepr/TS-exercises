function recursiveFactorial(n: number): number {
	if (n == 0) return 1
	return n * recursiveFactorial(n-1)
}

console.log("recursiveFactorial :")
console.log("expected output (1) :", recursiveFactorial(0))
console.log("expected output (1) :", recursiveFactorial(1))
console.log("expected output (2) :", recursiveFactorial(2))
console.log("expected output (24) :", recursiveFactorial(4))
console.log("expected output (362880) :", recursiveFactorial(9))