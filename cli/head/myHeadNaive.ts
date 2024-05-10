#!/usr/local/bin/ts-node

// Import of all api, we doesn't need type "pocess." after use their. Rest of code is more clear
import { readFileSync } from "fs"
import { argv, stderr, stdout, exit } from "process"

const defaultLineMode = true
const defaultCount = 10
const defaultPrintHeader = false

// Will be modified in processFlags
let lineMode = defaultLineMode
let count = defaultCount
let printHeader = defaultPrintHeader
let files: string[] = []

// Will be modified by main
let errorCode = 0
let forceHeader: string = ""

function printInfo(file: string) {
	const printed = readFileSync(file, { encoding: "utf8" })
	stdout.write(`${printed}\n`)
	exit(0)
}

for (let i = 2; i < argv.length; i++) {
	if (argv[i].startsWith("-n") || argv[i].startsWith("-c")) {

		lineMode = argv[i].startsWith("-c") ? false : true

		let unified: boolean
		let number: string

		if (argv[i].length > 2) {
			unified = true
			number = argv[i].substring(2)
		} else {
			unified = false
			number = argv[i + 1]
		}
		count = parseInt(number)

		if (isNaN(count)) {
			if (number == undefined) {
				stderr.write(`Myhead: option requires an argument -- '${argv[i].slice(1)}'\nTry 'myHeadNaive --help' for more information.\n`)
			} else if (argv[i].startsWith("-c")) {
				stderr.write(`myHead: invalid number of bytes: ‘${number}’\nTry 'myHeadNaive --help' for more information.\n`)
			} else {
				stderr.write(`Myhead: invalid number of lines: '${number}'\nTry 'myHeadNaive --help' for more information.\n`)
			}
			exit(1)
		}

		if (!unified) { i++ }
	} else {
		// Process flags from from argv
		// Append file to files
		switch (argv[i]) {
			case "-q":
				forceHeader = "-q"
				break
			case "-v":
				forceHeader = "-v"
				break
			case "--help":
				printInfo("help.txt")
			case "--version":
				printInfo("version.txt")
			case "-":
				if (argv[i + 1] == "--help") {
					printInfo("help.txt")
				} else if (argv[i + 1] == "--version") {
					printInfo("version.txt")
				} else {
					stderr.write("myHeadNaive: error: Read standard input is not supported\nTry 'myHeadNaive --help' for more information.\n")
					exit(1)
				}

			default:
				files.push(argv[i])
		}
	}
}

if (files.length == 0) {
	stderr.write("myHeadNaive: error: Read standard input is not supported: You must pass at least one file as parameter\nTry 'myHeadNaive --help' for more information.\n")
	exit(1)
}

if (files.length > 1) {
	printHeader = forceHeader != "-q"
} else {
	printHeader = forceHeader == "-v"
}


for (const file of files) {
	try {
		const content = readFileSync(file, { encoding: "utf8" })
		if (printHeader) stdout.write(`==> ${file} <==\n`)
		if (lineMode) {
			const lines = content.split("\n")
			for (let i = 0; i < count; i++) {
				stdout.write(`${lines[i]}\n`)
			}
			stdout.write(`${content}\n`)
		} else {
			for (let i = 0; i < count; i++) {
				stdout.write(content[i])
			}
			if (printHeader && files.length > 1)
				stdout.write("\n")
		}
	} catch (error: any) {
		switch (error.code) {
			case "ENOENT":
				stderr.write(`myHeadNaive: cannot open ${file} for reading: No such file or directory\n`)
				break
			case "EISDIR":
				stderr.write(`myHeadNaive: error reading ${file}: Is a directory\n`)
				break
			case "EACCES":
				stderr.write(`myHeadNaive: cannot open ${file} for reading: Permission denied\n`)
				break

			default:
				stderr.write(`myHeadNaive ${file}: Unknow error: ${error}\n`)
				break
		}
		errorCode = 1
	}
}
exit(errorCode)