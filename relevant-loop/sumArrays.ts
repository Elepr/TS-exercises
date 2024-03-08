function sumArrays(arr1: number[], arr2: number[]): number[] { // it's the  most solution
    let result: number[] = []
    if (arr1.length != arr2.length) return result

    for (let i = 0; i < arr1.length; i++) {
        result[i] = arr1[i] + arr2[i]
    }
    return result
}

console.log("sumArrays :")
console.log("expected output ([20, 20, 20]) :", sumArrays([12, 7, 5], [8, 13, 15]));
console.log("expected output ([0, 0, 0]) :", sumArrays([-12, 7, -5], [12, -7, 5]));
console.log("expected output ([]) :", sumArrays([1, 2, 3], [1, 2, 3, 4]));
console.log("expected output ([]) :", sumArrays([], []));

