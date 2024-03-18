function sum(n: number): number {
	if (n == 1) return n
	return n + sum(n-1)
}

console.log(sum(10))
// console.log(sum(-10))


// function sumArray(arr: number[]): number {
//     if (arr.length == 1) return arr[0]
//     return sumArray(arr.slice(1)) + arr[0]
// }

function sumArray(arr: number[]): number {
	if (arr.length == 0) return 0
	if (arr.length == 1) return arr[0]
	// @ts-ignore
	return arr.pop() + sumArray(arr)
}

console.log(sumArray([1, 2, 3, 4, 10]))
console.log(sumArray([]))

function multiArray(arr: number[]): number {
	if (arr.length == 0) return 1
	if (arr.length == 1) return arr[0]
	return multiArray(arr.slice(1)) * arr[0]
}

console.log(multiArray([1, 2, 3, 4, 10]))

// const arrayTest = 8
// console.log([arrayTest])

function replicate(rep: number, num: number ): number[] {
	if (rep <= 0) return []
	return [num].concat(replicate(rep-1, num))
}

console.log(replicate(3, 5)) // [5, 5, 5]
console.log(replicate(1, 69)) // [69]
console.log(replicate(-2, 6)) // []
