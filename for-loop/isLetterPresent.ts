function isLetterPresent(str: string, letter: string): boolean {
	const regex = /^[a-zA-Z]$/

	if (regex.test(letter)) {
		for (let i = 0; i < str.length; i++) {
			if (str[i] == letter) return true
		}
	}
	return false
}

console.log("isLetterPresent :")
console.log("expected output (true) :", isLetterPresent("Salut c'est cool", "c"))
console.log("expected output (false) :", isLetterPresent("Salut c'est cool", "z"))
console.log("expected output (true) :", isLetterPresent("Salut c'est cool", "S"))
console.log("expected output (false) :", isLetterPresent("abc ABC 123 !?.", "AB"))
console.log("expected output (false) :", isLetterPresent("abC 123 !?.", "bC"))
console.log("expected output (true) :", isLetterPresent("abc 123 !?.", "a"))
console.log("expected output (false) :", isLetterPresent("ab 123 !?.", "ab"))
console.log("expected output (false) :", isLetterPresent("abc 123 !?.", "1"))
console.log("expected output (false) :", isLetterPresent("abc 123 !?.", "12"))
console.log("expected output (false) :", isLetterPresent("abc 123 !?.", "!"))
