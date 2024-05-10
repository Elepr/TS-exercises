#!/usr/local/bin/ts-node

import { argv, exit, stderr, stdout } from "process"
const fs = require('node:fs')
const readline = require('node:readline')

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

let forceHeader = ""

function printInfo(file: string) {
    const printed = fs.readFileSync(file, { encoding: "utf8" })
    stdout.write(`${printed}\n`)
    exit(0)
}

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

        if (isNaN(count)) {
            if (number == undefined) {
                stderr.write(`Myhead: option requires an argument -- '${argv[i].slice(1)}'\nTry 'myHead --help' for more information.\n`)
            } else if (argv[i].startsWith("-c")) {
                stderr.write(`myHead: invalid number of bytes: ‘${number}’\nTry 'myHead --help' for more information.\n`)
            } else {
                stderr.write(`Myhead: invalid number of lines: '${number}'\nTry 'myHead --help' for more information.\n`)
            }
            exit(1)
        }
        lineMode = argv[i].startsWith("-c") ? false : true
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
                    stderr.write("myHead: error: Read standard input is not supported\nTry 'myHead --help' for more information.\n")
                    exit(1)
                }

            default:
                files.push(argv[i])
        }
    }
}

if (files.length == 0) {
    stderr.write("myHead: error: Read standard input is not supported: You must pass at least one file as parameter\nTry 'myHead --help' for more information.\n")
    exit(1)
}

if (files.length > 1) {
    printHeader = forceHeader != "-q"
} else {
    printHeader = forceHeader == "-v"
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
                const byteStream = fs.createReadStream(file, { highWaterMark: count })
                for await (const chunkOfByte of byteStream) {
                    stdout.write(chunkOfByte)
                    break
                }
                if (printHeader && files.length > 1)
                    stdout.write("\n")
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
main()