#!/usr/local/bin/ts-node

import { argv, exit, stderr, stdout, stdin } from "process"
import { open, FileHandle } from "fs/promises"
import { readFileSync } from "fs"

const defaultLineMode = true
const defaultCount = 10
const defaultPrintHeader = false

let lineMode = defaultLineMode
let count = defaultCount
let printHeader = defaultPrintHeader
let files: string[] = []

function printInfo(file: string) {
    const printed = readFileSync(file, { encoding: "utf8" })
    stdout.write(`${printed}\n`)
    exit(0)
}

function parseFlags() {
    let forceHeader = ""

    for (let i = 2; i < argv.length; i++) {
        if (argv[i].startsWith('-n') || (argv[i].startsWith('-c'))) {
            let unified: boolean
            let number: string

            if (argv[i].length > 2) {
                unified = true
                number = argv[i].substring(2)
            } else {
                unified = false
                number = argv[i + 1]
            }
            count = Math.abs(parseInt(number))

            if (isNaN(count)) {
                if (number == undefined) {
                    stderr.write(`myTail: option requires an argument -- '${argv[i].slice(1)}'\nTry 'myTail --help' for more information.\n`)
                } else if (argv[i].startsWith("-c")) {
                    stderr.write(`myTail: invalid number of bytes: ‘${number}’\nTry 'myTail --help' for more information.\n`)
                } else {
                    stderr.write(`myTail: invalid number of lines: '${number}'\nTry 'myTail --help' for more information.\n`)
                }
                exit(1)
            }

            lineMode = argv[i].startsWith("-c") ? false : true

            if (!unified) { i++ }
        } else {
            switch (argv[i]) {
                case "-q":
                    forceHeader = '-q'
                    break
                case "-v":
                    forceHeader = '-v'
                    break
                case "--help":
                    printInfo("help.txt")
                case "--version":
                    printInfo("version.txt")

                default:
                    files.push(argv[i])
            }
        }
    }

    if (files.length == 0) {
        stderr.write("myTail: error: Read standard input is not supported: You must pass at least one file as parameter\nTry 'myHead --help' for more information.\n")
        exit(1)
    }

    if (files.length > 1) {
        printHeader = forceHeader != "-q"
    } else {
        printHeader = forceHeader == "-v"
    }
}

async function readBytes(file: FileHandle, from: number, to: number): Promise<string> {
    const fileLength = (await (file.stat())).size
    if (from < 0) {
        from = 0
    } else if (from > fileLength) {
        from = fileLength
    } else if (to < from) {
        to = from
    }

    const buffer = Buffer.alloc((to - from) + 1)

    const readable = file.read({ buffer: buffer, position: from, length: (to - from) + 1 })
    return (await readable).buffer.toString()
}

async function reverseReadLine(file: FileHandle, lineEnd: number): Promise<string> {
    const chunkSize = 1024
    const fileLength = (await file.stat()).size
    let line = ""

    if (lineEnd > fileLength) return line

    for (let i = lineEnd - 1; i >= 0; i -= chunkSize) {
        const start = i - chunkSize + 1
        const end = i
        const chunk = await readBytes(file, start, end)
        for (let i = chunk.length - 1; i >= 0; i--) {
            if (chunk[i] == '\n') return line
            line = chunk[i] + line
        }
    }
    return line
}

async function reverseReadLines(path: string, lines: number): Promise<string[]> {
    let stringArray: string[] = []
    const fileHandle = await open(path, "r")
    let fileEnd = (await fileHandle.stat()).size

    if (lines <= 0) return stringArray

    for (let i = 0; i < lines; i++) {
        const line = await reverseReadLine(fileHandle, fileEnd)
        fileEnd -= line.length + 1
        if (i == 0 && line == "") {
            lines += 1
            continue
        }
        stringArray.push(line)
        if (fileEnd <= 1) break
    }
    fileHandle?.close()
    return stringArray
}

async function main() {
    let errorCode = 0
    parseFlags()

    for (const file of files) {
        try {
            if (printHeader) stdout.write(`==> ${file} <==\n`)
            if (lineMode) {
                const lines = await reverseReadLines(file, count)
                for (let i = lines.length - 1; i >= 0; i--) {
                    stdout.write(`${lines[i]}\n`)
                }
            } else {
                const fileHandle = await open(file, "r")
                const fileLength = fileHandle.stat()
                const result = await readBytes(fileHandle, ((await fileLength).size) - count, (await fileLength).size)
                printHeader && files.length > 1 ? stdout.write(`${result}\n`) : stdout.write(result)
                await fileHandle?.close()
            }
        } catch (err: any) {
            switch (err.code) {
                case "ENOENT":
                    stderr.write(`myTail: cannot open ${file} for reading: No such file or directory\n`)
                    break;
                case "EISDIR":
                    stderr.write(`myTail: error reading ${file}: Is a directory\n`)
                    break
                case "EACCES":
                    stderr.write(`myTail: cannot open ${file} for reading: Permission denied\n`)
                    break
                default:
                    stderr.write(`myTail: ${file}: Unknown error: ${err}\n`)
                    break
            }
            errorCode = 1
        }
    }
    exit(errorCode)
}
main()