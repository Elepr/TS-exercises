function recPrintReverseCount(n: number): void {
	console.log(n)
	if (n > 0) recPrintReverseCount(n-1)
}

console.log("recPrintReverseCount :")
recPrintReverseCount(0)
// expected output : 0
console.log()
recPrintReverseCount(1)
// expected output : 1 0
console.log()
recPrintReverseCount(2)
// expected output : 2 1 0
console.log()
recPrintReverseCount(6)
// expected output : 6 5 4 3 2 1 0