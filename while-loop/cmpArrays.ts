function cmpArrays(arr1: number[], arr2: number[]): boolean {
	if (arr1.length != arr2.length) return false

	let i = 0
	while (i < arr1.length) {
		if (arr1[i] != arr2[i]) return false
		i++
	}
	return true
}

console.log("cmpArrays :")
console.log("expected output true :", cmpArrays([0], [0]))
console.log("expected output true :", cmpArrays([12, 7, 5], [12, 7, 5]))
console.log("expected output false :", cmpArrays([12, 7, 5], [12, 7, 6]))
console.log("expected output false :", cmpArrays([12, 7, 5], [12, 7, 5, 0]))
console.log("expected output true :", cmpArrays([], []))