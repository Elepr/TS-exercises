function fibonacci(n: number): number {
	if (n < 2) return n
	return fibonacci(n-1) + fibonacci(n-2)
}

console.log("fibonacci :")
console.log("expected output F 0 (0) :", fibonacci(0))
console.log("expected output F 1 (1) :", fibonacci(1))
console.log("expected output F 2 (1) :", fibonacci(2))
console.log("expected output F 3 (2) :", fibonacci(3))
console.log("expected output F 6 (8) :", fibonacci(6))
console.log("expected output (89) :", fibonacci(11))