// let sayHello = (name) => `Hello, ${name}!`;

// console.log(sayHello(process.argv[2]));



// const concateneaza = (array) => array.join(' ');

// const cuvinte = ['Ana', 'are', 'mere'];

// console.log(concateneaza(cuvinte));




// function checkDivisible(n, divisor) {
//     if (n % divisor) {
//         return false
//     } else {
//         return true
//     }
// }

// console.log(checkDivisible(10, 2))
// console.log(checkDivisible(10, 3))




// function compara(string1, string2){
//     if(string1.length !== string2.length){
//         return -1;}
//     else {
//         let l1 = string1.length;
//         let l2 = string2.length;
//         let count = 0;
//         for(let i = 0; i < l1; i++){
//             if(string1[i] !== string2[i]){
//                 count++;
//             } 
//         }
//         return count;
//     }
// }

// console.log(compara('abcde', 'decba'));




// function occurences(text, character) {
//     let count = 0
//     for (var i = 0; i < text.length; i++) {
//         if (text.charAt(i) === character) {
//             count++
//         }
//     }
//     return count;
// }

// console.log(occurences("sample text", "e"));




// function array(lista){
//     return lista;
// }

// const lista = [1,2,3,4,5,6,7,8];
// console.log(array(lista));




// function addToArray(array, ...args) {
//     for (var i = 0; i < args.length; i++) {
//         array.push(args[i]);
//     }

//     return array
// }

// let array = ["a"]
// console.log(addToArray(array, "b", "c").join(", "))





// function intercalare(array1, array2){
//     if(array1.length !== array2.length){
//         return -1;
//     }

//     let arrayFinal = [];
//     for(i=0; i<array1.length; i++){
//         arrayFinal.push(array1[i]);
//         arrayFinal.push(array2[i]);
//     }

//     return arrayFinal;
// }

// array1 =[14,7,8,9,0];
// array2=[1,4,2,2,6];

// console.log(intercalare(array1, array2));





// const checkPrime = (n) => {
//     for (let i = 2; i <= Math.sqrt(n); i++) {
//         if (!(n % i)) {
//             return false
//         }
//     }
//     return true
// }

// if (process.argv.length <= 2) {
//     console.log('not enough parameters')
// } else {
//     console.log(checkPrime(parseInt(process.argv[2])))
// }





const sampleString = 'the quick brown fox jumps over the lazy dog'

const getCounts = (text) => {
    const words = text.split(' ')
    const result = {}
    for (let word of words) {
        if (word in result) {
            result[word]++
        } else {
            result[word] = 1
        }

    }
    for (let word in result) {
        result[word] /= words.length
    }
    return result
}

console.log(getCounts(sampleString))