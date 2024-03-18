function findNextPrime(n: number): number {
	for (; isPrime(n) == false; n++) {}
	return n
}
import {isPrime} from "./isPrime"

console.log("findNextPrime :")
console.log("expected output (2) :", findNextPrime(0))
console.log("expected output (11) :", findNextPrime(8))
console.log("expected output (37) :", findNextPrime(32))
console.log("expected output (43) :", findNextPrime(43))
console.log("expected output (131) :", findNextPrime(128))
// console.log("expected output (11113) :", findNextPrime(11111));