#!/usr/local/bin/ts-node

import { argv, exit, stderr, stdout } from "process";
const fs = require('node:fs');
const readline = require('node:readline');

const defaultN = 10
let n = defaultN

const regex = /^-n[0-9]+$/

for (let i = 0; i < argv.length; i++) {
    if (argv[i] == "-n") {
        if (argv[i + 1] != undefined) {
            stderr.write(`Myhead: invalid number of lines: ${argv[i + 1]}\n`)
        } else {
            stderr.write(`Myhead: option requires an argument -- 'n'\n`)
        }
        exit(1)
    }
    if (regex.test(argv[i])) {
        n = parseInt(argv[i].slice(2))
        if (n == 0) exit(0)
        argv.splice(i, 1)
    }
}

if (argv.length < 3) {
    stderr.write("myHead: error: You must pass at least one file as parameter\n")
    exit(1)
}

let errorCode = 0

async function main() {
    for (const arg of argv.slice(2)) {
        try {
            const fileStream = fs.createReadStream(arg);
            const rl = readline.createInterface({
                input: fileStream,
            })
            if (argv.length > 3) stdout.write(`==> ${arg} <==\n`)
            let counter = 0
            for await (const line of rl) {
                if (counter < n) {
                    stdout.write(`${line}\n`);
                    counter++
                } else {
                    break
                }
            }
        } catch (error: any) {
            switch (error.code) {
                case "ENOENT":
                    stderr.write(`myHead: cannot open ${arg} for reading: No such file or directory\n`)
                    break;
                case "EISDIR":
                    stderr.write(`myHead: error reading ${arg}: Is a directory\n`)
                    break
                case "EACCES":
                    stderr.write(`myHead: cannot open ${arg} for reading: Permission denied\n`)
                    break
                default:
                    stderr.write(`myHead: ${arg}: Unknow error: ${error}\n`)
                    break
            }
            errorCode = 1
        }
    }
    exit(errorCode)
}

main()
