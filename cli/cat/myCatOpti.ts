#!/usr/local/bin/ts-node

// Import of all api, we doesn't need type "pocess." after use their. Rest of code is more clear

import { argv, stderr, stdout, exit } from "process"
const fs = require('node:fs')
const readline = require('node:readline')
/* The two first index content in argv array is, in first, the path using in shebang, and second, the path of the current prog.
We want just all index after that, cause they're own arguments in this program */
if (argv.length < 3) {
    stderr.write("myCat: error: You must pass at least one file as parameter\n")
    exit(1)
}
// If any error is catch, will return the exitCode set at 0 to the end, is a let cause if a error is throw we set this value to 1
let exitCode = 0

async function main() {
    for (const arg of argv.slice(2)) {
        try {
            const lineStream = fs.createReadStream(arg)
            const rl = readline.createInterface({
                input: lineStream
            })
            for await (const line of rl) {
                stdout.write(`${line}\n`)
            }
        } catch (error: any) {
            switch (error.code) {
                case "ENOENT":
                    stderr.write(`MyCat: ${arg}: No such file or directory\n`)
                    break
                case "EISDIR":
                    stderr.write(`myCat: ${arg}: Is a directory\n`)
                    break
                case "EACCES":
                    stderr.write(`myCat: ${arg}: Permission denied\n`)
                    break

                default:
                    stderr.write(`myCar: ${arg}: Unknow error: ${error}\n`)
                    break
            }
            exitCode = 1
        }
    }
    exit(exitCode)
}
main()

