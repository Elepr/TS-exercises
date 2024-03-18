function isNumberPresent(numbers: number[], n: number): boolean {
	for (let i = 0; i < numbers.length; i ++) {
		if (numbers[i] == n) return true
	}
	return false
}

console.log("isNumberPresent :")
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 1))
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 2))
console.log("expected output (true) :", isNumberPresent([1, 2, 3], 3))
console.log("expected output (false) :", isNumberPresent([], 0))
console.log("expected output (false) :", isNumberPresent([1, 2, 3], 7))

