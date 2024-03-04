function recPrintCount(n: number): void {}


console.log("recPrintCount :")
recPrintCount(0)
// expected output : 0
console.log()
recPrintCount(1)
// expected output : 0 1
console.log()
recPrintCount(2)
// expected output : 0 1 2
console.log()
recPrintCount(6)
// expected output : 0 1 2 3 4 5 6