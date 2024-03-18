function reverseString(str: string): string {
	let reversedStr = ""

	for (let i = str.length -1; i >= 0; i--) {
		reversedStr += str[i]
	}
	return reversedStr
}

console.log("reverseString :")
console.log("expected output (Je suis un chat) :", reverseString("tahc nu sius eJ"))
