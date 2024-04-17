#! /usr/local/bin/ts-node

import { readFileSync } from "node:fs"

if (process.argv.length < 3) {
	process.stderr.write("myCat: error: You must pass at least one file as parameter\n")
	process.exit(1)
}

let returnCode = 0

for (const path of process.argv.slice(2)) {
	try {
		const content = readFileSync(path, { encoding: "utf8" })
		process.stdout.write(content)
	} catch (err: any) {
		switch (err.code) {
		case "ENOENT":
			process.stderr.write(`myCat: ${path}: No such file or directory\n`)
			break
		case "EISDIR":
			process.stderr.write(`myCat: ${path}: Is a directory\n`)
			break
		case "EACCES":
			process.stderr.write(`myCat: ${path}: Permission denied\n`)
			break

		default:
			process.stderr.write(`myCat: ${path}: Unknow error: ${err}\n`)
			break
		}
		returnCode = 1
	}
}

process.exit(returnCode)