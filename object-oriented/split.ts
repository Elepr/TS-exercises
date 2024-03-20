function split(str: string, separator: string): string[] {
	const splitted: string[] = []

	if (separator.length == 0) {
		for (const letter of str) {
			splitted.push(letter)
		}
	} else {
		let part = ""

		for (let main = 0; main < str.length; main++) {
			let tmp = ""
			for (let sub = 0; ; sub++) {
				tmp += str[main + sub]
				if (str[main + sub] == separator[sub]) {
					if (sub == separator.length - 1) {
						splitted.push(part)
						part = ""
						main += sub
						break
					}
				} else {
					part += tmp
					main += sub
					break
				}
			}
		}
		splitted.push(part)
	}
	return splitted
}

console.log("split :")
console.log("expected output", "Je suis un chat".split(""), ":", split("Je suis un chat", ""))
console.log("expected output", "Je suis un chat".split("J"), ":", split("Je suis un chat", "J"))
console.log("expected output", "Je suis un chat".split("Je"), ":", split("Je suis un chat", "Je"))
console.log("expected output", "Je suis un chat".split("t"), ":", split("Je suis un chat", "t"))
console.log("expected output", "Je suis un chat".split("at"), ":", split("Je suis un chat", "at"))
console.log("expected output", "Je suis un chat".split("u"), ":", split("Je suis un chat", "u"))
console.log("expected output", "Je suis un chat".split("chat"), ":", split("Je suis un chat", "chat"))
console.log("expected output", "Je suis un chat".split("un"), ":", split("Je suis un chat", "un"))
console.log("expected output", "".split(""), ":", split("", ""))
console.log("expected output", "0".split("0"), ":", split("0", "0"))
console.log("expected output", "".split("j"), ":", split("", "j"))
