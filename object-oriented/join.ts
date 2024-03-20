function join(strs: string[], joiner: string): string {
	let joinStr = ""

	for (const str of strs) {
		joinStr += str + joiner
	}
	if (joiner == "") return joinStr
    return joinStr.slice(0, - joiner.length)
}

console.log("join :")                   
console.log("expected output ", ["je", "suis", "un", "chat"].join(" "), ":", join(["je", "suis", "un", "chat"], " "))
console.log("expected output ", ["je", "suis", "un", "chat"].join("0"), ":", join(["je", "suis", "un", "chat"], "0"))
console.log("expected output ", ["je", "suis", "un", "chat"].join(""), ":", join(["je", "suis", "un", "chat"], ""))
console.log("expected output ", ["je", "suis", "un", "chat"].join("//"), ":", join(["je", "suis", "un", "chat"], "//"))
console.log("expected output ", [].join(" "), ":", join([], " "))