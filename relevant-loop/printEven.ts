function printEven(numbers: number[]): void {  // I prefer this on my first for loop, in globality is the same but I think this is more clear
	for (const n of numbers) {
		if (n % 2 == 0) console.log(n)
	}
}

console.log("printEvent :")
printEven([13, 23, 12, 45, 22, 48, 66, 100])
// expected output : 
//   12
//   22
//   48
//   66
//   100
