function squareRoot(n: number): number {
    let root = 0

    for (let i = 1; i * i <= n; i++) {
        if (i * i == n) root = i
    }
    return root
}

console.log("squareRoot :")
console.log("expected output (1) :", squareRoot(1));
console.log("expected output (3) :", squareRoot(9));
console.log("expected output (65) :", squareRoot(4225));
console.log("expected output (0) :", squareRoot(5));
console.log("expected output (0) :", squareRoot(123));
console.log("expected output (0) :", squareRoot(9098213));