function recursionReverseString(str: string): string {
    if (str == '') return ''
    return recursionReverseString(str.substring(1)) + str[0]
}

console.log("recursionReverseString :")
console.log("expected output (Je suis un chat) :", recursionReverseString("tahc nu sius eJ"));
console.log("expected output ('4321') :", recursionReverseString('1234'));
console.log("expected output ('') :", recursionReverseString(''));