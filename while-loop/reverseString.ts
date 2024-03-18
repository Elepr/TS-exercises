function reverseString(str: string): string {
	let reversedStr = ""

	let i = str.length -1
	while (i >= 0) {
		reversedStr += str[i]
		i--
	}
	return reversedStr
}

console.log("reverseString :")
console.log("expected output (Je suis un chat) :", reverseString("tahc nu sius eJ"))
