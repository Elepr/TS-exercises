#! /usr/local/bin/ts-node

import fs from 'node:fs'

if (process.argv.length <= 2) {
    console.error("myCat: error: You must pass at least one file as parameter")
    process.exit(1)
}

let returnCode = 0

for (const path of process.argv.slice(2)) {
    try {
        const content = fs.readFileSync(path, {encoding: 'utf8'})
        process.stdout.write(content)
    } catch(err: any) {
        switch (err.code) {
            case "ENOENT":
                console.error(`myCat: ${path}: No such file or directory`)
                break;
            case "EISDIR":
                console.error(`myCat: ${path}: Is a directory`)
                break;
            case "EACCES":
                console.error(`myCat: ${path}: Permission denied`)
                break;

            default:
                console.error(`myCat: ${path}: Unknow error:`, err)
                break;
        }
        returnCode = 1
    }
}

process.exit(returnCode)