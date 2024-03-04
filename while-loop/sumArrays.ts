function sumArrays(arr1: number[], arr2: number[]): number[] {
    return [42]
}

console.log("sumArrays :")
console.log("expected output ([20, 20, 20]) :", sumArrays([12, 7, 5], [8, 13, 15]));
console.log("expected output ([0, 0, 0]) :", sumArrays([-12, 7, -5], [12, -7, 5]));
console.log("expected output ([]) :", sumArrays([1, 2, 3], [1, 2, 3, 4]));
console.log("expected output ([]) :", sumArrays([], []));
