#!/usr/local/bin/ts-node

import { createReadStream } from "fs"
import { argv, stderr, stdout, exit } from "process"
const fs = require('node:fs')
const readline = require('node:readline')

let errorCode = 0

if (argv.length <= 2) {
    stderr.write("myTac: error: Read standard input is not supported: You must pass at least one file as parameter\n")
    exit(1)
}

async function main() {
    for (const arg of argv.slice(2)) {
        try {
            const lineStream = createReadStream(arg)
            const rl = readline.createInterface({
                input: lineStream
            })
            let tmp: string[] = []
            for await (const line of rl) {
                tmp.push(line)
            }
            for (let i = tmp.length - 1; i >= 0; i--) {
                stdout.write(`${tmp.reverse().join("\n")}\n`)
                break
            }
        } catch (error: any) {
            switch (error.code) {
                case "ENOENT":
                    stderr.write(`myTac: failed to open ${arg} for reading: No such file or directory\n`)
                    break
                case "EISDIR":
                    stderr.write(`myTac: ${arg}: read error: Invalid argument\n`)
                    break
                case "EACCES":
                    stderr.write(`myTac: failed to open ${arg} for reading: Permission denied\n`)
                    break
                default:
                    stderr.write(`myTac: ${arg}: Unknow error: ${error}\n`)
                    break
            }
            errorCode = 1
        }
    }
    exit(errorCode)
}
main()