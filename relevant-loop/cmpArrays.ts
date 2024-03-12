function cmpArrays(arr1: number[], arr2: number[]): boolean {
    if (arr1.length != arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false
    }
    return true
}

// function cmpArrays(arr1: number[], arr2: number[]): boolean {
//     return arr1.toString() == arr2.toString()
// }

console.log("cmpArrays :")
console.log("expected output true :", cmpArrays([0], [0]));
console.log("expected output true :", cmpArrays([12, 7, 5], [12, 7, 5]));
console.log("expected output false :", cmpArrays([12, 7, 5], [12, 7, 6]));
console.log("expected output false :", cmpArrays([12, 7, 5], [12, 7, 5, 0]));
console.log("expected output true :", cmpArrays([], []));
