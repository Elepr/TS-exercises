function isPrime(n: number): boolean {
    if (n < 2) return false
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) return false
    }
    return true
}

console.log("isPrime :")
console.log("expected output (false) :", isPrime(0));
console.log("expected output (false) :", isPrime(1));
console.log("expected output (true) :", isPrime(2));
console.log("expected output (true) :", isPrime(3));
console.log("expected output (true) :", isPrime(23));
console.log("expected output (true) :", isPrime(67));
console.log("expected output (false) :", isPrime(69));
console.log("expected output (true) :", isPrime(89));
console.log("expected output (false) :", isPrime(128));
console.log("expected output (true) :", isPrime(9576890767));