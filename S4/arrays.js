const words = [
    "fox",
    "wolf",
    "snake",
    "crocodile",
    "lion",
    "cat",
    "crocodile",
    "horse",
    "elephant"
]

const forbiddenWord = "crocodile"
const minLength = 4

const filterWords = (words, forbiddenWord, minLength) => {
    const result = words.filter((word) => {
        if (word !== forbiddenWord && word.length >= minLength) {
            return true
        }
        return false
    })
    return result
}

console.log(filterWords(words, forbiddenWord, minLength))


//folosiți metodele map și filter pentru a procesa un array de numere 
// reprezentând ani de naștere obținând vârstele peste 18 ani.
const aniNastere = [2005, 1990, 2010, 1985, 2002, 2007, 2006];
const anCurent = new Date().getFullYear();
const majori = aniNastere.map(an=>{return anCurent-an}).
filter(varsta=>{return varsta>=18});

console.log(majori); 



const getTotalArea = (squareDimensions) => {
    return squareDimensions.map((side) => {
        return side * side
    }).reduce((prev, current) => {
        return prev + current
    }, 0)

}

const squareDimensions = [3, 5, 12, 3, 5, 3]

const result = getTotalArea(squareDimensions)
console.log("result: ", result)



//implementați o funcție care primește ca parametrii un 
// array de numere și un număr și returnează suma tuturor
// numerelor din array divizibile cu cel de-al doilea parametru.
const numere=[10, 15, 27, 25, 32, 35, 40];
const divizor=5;

const sumaDiv = (numere, divizor)=>{
    if(divizor===0){
        return 0;
    }
    return numere.filter(numar=>{
        return numar%divizor===0;
    }).reduce((prev, curent)=>{
        return prev+curent;
    }, 0);
}

console.log(sumaDiv(numere, divizor));





const formatString = (s, ...format) => {

    let modified = s
    for (let i = 0; i < format.length; i++) {
        if (modified.indexOf('{' + i + '}') !== -1) {
            modified = modified.replace('{' + i + '}', format[i])
        }
    }
    return modified
}

console.log(formatString("this is a {0} string  and we've {1} it ", 'nice', 'modified'))




const sampleArray = [1, 2, 3, 4, 5]

const map = (array, transformation) => {

    const result = []
    for (const element of array) {
        result.push(transformation(element))
    }
    return result
}
console.log(map(sampleArray, (x) => x * 2))




const sampleDictionary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']

const sampleText = `
    best
    read
    on
    windy
    nights
`
const checkAcrostic = (text, dictionary) => {
    const candidate = text.split('\n').filter(e => e).map(e => e.trim()).map(e => e[0]).join('')

    return dictionary.indexOf(candidate) !== -1
}

console.log(checkAcrostic(sampleText, sampleDictionary))


//implementați cenzurarea unui text printr-o funcție. 
// Funcția primește un șir de caractere și un dicționar 
// sub forma unui array. De exemplu pentru șirul 
// "javascript este minunat" și dicționarul ["este"] 
// funcția va produce "javascript e**e minunat".


const cuvantCenzurat = cuvant=>{
    if(cuvant.length<=2){
        return cuvant;
    }
    const primaLitera = cuvant[0];
    const ultimaLitera = cuvant[cuvant.length-1];
    const litereCenzurate='*'.repeat(cuvant.length-2);
    return primaLitera+litereCenzurate+ultimaLitera;
}

const cenzureazaText = (text, dictionar)=>{
    const textCenzurat = dictionar.reduce(
        (textCurent, cuvantDeCenzurat)=>{
            const variantaCenzurata = cuvantCenzurat(cuvantDeCenzurat);
            return textCurent.replaceAll(cuvantDeCenzurat, variantaCenzurata);
        },text);
        return textCenzurat;
}

const text = "javascript este minunat";
const dictionar = ["minunat"];
console.log(cenzureazaText(text, dictionar));




//scrieți o funcție care primește un array de obiecte 
// și un string și returnează array-ul sortat după cheia 
// specificată prin string.

const sorteaza = (array, key)=>{
    const arraySortat= array.slice();
    arraySortat.sort((a, b)=>{
        const valoareA = a[key];
        const valoareB = b[key];
        if(valoareA<valoareB){
            return -1;
        }
        if(valoareA>valoareB){
            return 1;
        }
        return 0;
    });
    return arraySortat;
}

const utilizatori = [
    { nume: "Ana", varsta: 30 },
    { nume: "Mihai", varsta: 25 },
    { nume: "Ion", varsta: 42 },
    { nume: "Elena", varsta: 25 }];

console.log(sorteaza(utilizatori, 'varsta'));