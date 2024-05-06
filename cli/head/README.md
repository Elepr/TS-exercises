# myHead
## Introduction
This repository contains a partial reimplementation of the `head` command, which supports the `-n`, `-c`, `-q`, `-v` `--version` and `--help` flags and multiple file support.
Two versions are available, one naive and one optimized.

### Version of the two partial reimplementations of `head`

- 1 **myheadNaive.ts:**
  This version uses the **readFileSync** module of node.js' file system api.
  The file passed as a parameter is stored in its entirety in a variable, then we display only the first few lines, or bytes.
  This method loads the entire file into the ram, which, as we shall see, is relatively slow, and can be very complicated with large files.

- 2 **myHead.ts:**
  This version uses the stream modules of the node.js file system api
  (**createReadStream/readline.createInterface**). The file passed as a
   parameter is read line by line, or, chunk of bytes, which we'll display. The advantage of this
   method is that it doesn't load the ram with the entire file passed as a parameter,
   which, as we'll see, on the one hand conciderably reduces program execution time,
   and on the other hand avoids overloading the ram during execution, and thus crashing the program on large files.

## Benchmarks
To test the performance difference between the two versions, we've written a simple benchmark script.
If you'd like to run it yourself, it's available in `https://github.com/Elepr/bash-script-utils/blob/main/utils/benchmark.sh`

The script generates several large files, then passes them as parameters to each of the two versions of myHead and measures their execution time.
The sizes tested are :

- 1 File one: 100 MB
- 2 File two: 300 MB
- 3 File three: 500 MB
- 4 File four: 800 MB

### Results
#### Computer configuration
CPU : Eight 4,2GHz Intel i5 Kabylake Processors 64 bits
RAM : 12GB
STORAGE : SSD MVMe 512GB

#### Summary
| File size | myHeadNaive.ts | myHead.ts |
|-----------|:--------------:|:---------:|
| 100 MB    |    0m1,140s    |  0m0,858s |
| 300 MB    |    0m1,751s    |  0m0,881s |
| 500 MB    |    0m2,156s    |  0m0,790s |
| 800 MB    |      Crash     |  0m0,889s |

#### Details
##### Naive
<details>
<summary>Test results</summary>

- 1 With the 100 MB file:
  **0m1,140s**

- 2 With the 300 MB file:
  **0m1,751s**

- 3 With the 500 MB file:
  **0m2,156s**

- 4 With the 800 MB file:
```
  FATAL ERROR: v8::ToLocalChecked Empty MaybeLocal
----- Native stack trace -----

 1: 0xcd8aba node::OnFatalError(char const*, char const*) [node]
 2: 0x10af740 v8::api_internal::ToLocalEmpty() [node]
 3: 0xe37bf4  [node]
 4: 0x73ed8fe0eadd 

----- JavaScript stack trace -----

1: readFileSync (node:fs:455:20)
2: /usr/local/bin/myHeadNaive.ts:34:47
3: Module._compile (node:internal/modules/cjs/loader:1368:14)
4: m._compile (/usr/local/lib/node_modules/ts-node/dist/index.js:857:29)
5: Module._extensions..js (node:internal/modules/cjs/loader:1426:10)
6: require.extensions.<computed> (/usr/local/lib/node_modules/ts-node/dist/index.js:859:16)
7: Module.load (node:internal/modules/cjs/loader:1205:32)
8: Module._load (node:internal/modules/cjs/loader:1021:12)
9: executeUserEntryPoint (node:internal/modules/run_main:142:12)
10: phase4 (/usr/local/lib/node_modules/ts-node/dist/bin.js:466:20)


./benchmark.sh: line 32: 18947 Aborted                 (core dumped) ${2} file800mb.txt > /dev/null
```
</details>

##### Optimized
<details>
<summary>Test results</summary>

- 1 With the 100 MB file:
  **0m0,858s**

- 2 With the 300 MB file:
  **0m0,881s**

- 3 With the 500 MB file:
  **0m0,790s**

- 4 With the 800 MB file:
  **0m0,889s**
</details>

#### Conclusion
The various tests carried out demonstrate the flaws and limitations of the naive method.
Loading the ram by opening the test file in its entirety and then displaying only a few lines
is not efficient and not adapted to the use we make of it. On small files the execution time
is very long, on larger files the program crashes.
The stream modules used in the optimized version of the program prove their effectiveness:
execution times are shorter, there's no limit to the size of the file tested,
and the program uses far fewer resources.
The use of the readFile module of the node.js API, implemented in the naive “myHeadNaive.ts” version,
has no relevance in our case, and we prefer stream modules for optimum efficiency.