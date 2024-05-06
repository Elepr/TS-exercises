#!/usr/local/bin/ts-node

import { argv, exit, stderr, stdout } from "process";
const fs = require('node:fs');
const readline = require('node:readline');

// Default values with no flag
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

// Additional instructions :
// - Remove support of -z flag
// - Explicitly fail on - flag (with an error message saying basically "reading on stdin is not supported")
// - Add support for `-n <number>` and `-c <number>`
// - Remove regex for `-n<number` and `-c<number`
// - No other other global variables than the ones above

function processFlags(): any {
    let quietMode = false
    let verboseMode = false

    for (let i = 2; i < argv.length; i++) {
        if (argv[i].startsWith("-n") || argv[i].startsWith("-c")) {
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

            if (argv[i].startsWith("-c")) {
                lineMode = false
            } else lineMode = defaultLineMode

            if (isNaN(count)) {
                if (number == undefined) {
                    stderr.write(`Myhead: option requires an argument -- '${argv[i].slice(1)}'\nTry 'myHead --help' for more information.\n`)
                } else {
                    if (argv[i].startsWith("-c")) {
                        stderr.write(`myHead: invalid number of bytes: ‘${number}’\nTry 'myHead --help' for more information.\n`)
                    } else if (argv[i].startsWith("-n")) {
                        stderr.write(`Myhead: invalid number of lines: '${number}'\nTry 'myHead --help' for more information.\n`)
                    }
                }
                exit(1)
            }

            if (!unified) { i++ }
        } else {
            // Process flags from from argv
            // Append file to files
            switch (argv[i]) {
                case "-q":
                    quietMode = true
                    break
                case "-v":
                    verboseMode = true
                    break
                case "--help":
                    const help = fs.readFileSync("help.txt", { encoding: "utf8" })
                    stdout.write(`${help}\n`)
                    exit(0)
                case "--version":
                    const version = fs.readFileSync("version.txt", { encoding: "utf8" })
                    stdout.write(`${version}\n`)
                    exit(0)
                case "-":
                    if (argv[i + 1] == "--version") {
                        const version = fs.readFileSync("version.txt", { encoding: "utf8" })
                        stdout.write(`${version}\n`)
                    } else if (argv[i + 1] == "--help") {
                        const help = fs.readFileSync("help.txt", { encoding: "utf8" })
                        stdout.write(`${help}\n`)
                    } else {
                        stderr.write("myHead: error: Read standard input is not supported\nTry 'myHead --help' for more information.\n")
                        exit(1)
                    }

                default:
                    files.push(argv[i])
                    break;
            }
        }
    }

    if (files.length == 0) {
        stderr.write("myHead: error: Read standard input is not supported: You must pass at least one file as parameter\nTry 'myHead --help' for more information.\n")
        exit(1)
    }

    if (files.length > 1) {
        printHeader = true
        if (quietMode) printHeader = defaultPrintHeader
    } else {
        printHeader = defaultPrintHeader
        if (verboseMode) printHeader = true
    }
}

async function main() {
    for (const file of files) {
        try {
            if (printHeader) stdout.write(`==> ${file} <==\n`)
            if (lineMode) {
                const lineStream = fs.createReadStream(file)
                const rl = readline.createInterface({
                    input: lineStream
                })
                let printed = 0
                for await (const line of rl) {
                    if (printed >= count) break
                    stdout.write(`${line}\n`)
                    printed++
                }
            } else {
                const byteStream = fs.createReadStream(file, { start: 0, end: count })
                const rb = readline.createInterface({
                    input: byteStream
                })
                for await (const chunkOfBytes of rb) {
                    if (!printHeader) {
                        stdout.write(`${chunkOfBytes.substring(0, chunkOfBytes.length -1)}`)
                    } else {
                        stdout.write(`${chunkOfBytes.substring(0, chunkOfBytes.length -1)}\n`)
                    }
                }
            }

        } catch (error: any) {
            switch (error.code) {
                case "ENOENT":
                    stderr.write(`myHead: cannot open ${file} for reading: No such file or directory\n`)
                    break;
                case "EISDIR":
                    stderr.write(`myHead: error reading ${file}: Is a directory\n`)
                    break
                case "EACCES":
                    stderr.write(`myHead: cannot open ${file} for reading: Permission denied\n`)
                    break
                default:
                    stderr.write(`myHead: ${file}: Unknow error: ${error}\n`)
                    break
            }
            errorCode = 1
        }
    }
    exit(errorCode)
}
processFlags()
main()

