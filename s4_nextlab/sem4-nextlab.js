//ex video

class Stream {
    #value;
    #nextvalue

    static #count = 0
    constructor(value, nextValue) {
        this.#value = value
        this.#nextvalue = nextValue
        Stream.#count++
    }

    get value() {
        return this.#value
    }

    get next() {
        this.#value = this.#nextvalue(this.#value)
        return this.#value
    }

    static get count() {
        return Stream.#count
    }
}

class ConstantStream extends Stream {
    constructor(value) {
        super(value, value => value)
    }
}

class NextIntegerStream extends Stream {
    constructor() {
        super(0, value => value + 1)
    }
}

const constant = new ConstantStream(1)
const nextInteger = new NextIntegerStream()

// for (let i = 0; i < 10; i++) {
//     console.log(`constant[${i}] = ${constant.next}`)
//     console.log(`nextInteger[${i}] = ${nextInteger.next}`)

// }

// console.log(Stream.count)

// implementați un tip obiectual care implementează un 
// șir crescător având ca elemente toate numerele pare 
// pornind de la o valoare dată. Constructorul primește 
// valoarea inițială a secvenței. Singura metodă este 
// 'next' care calculează următoarea valoare din șir.

class EvenNumberStream extends Stream {
    constructor(initialValue) {
        // Asigurăm că valoarea inițială este pară
        const startValue = initialValue % 2 === 0 ? initialValue : initialValue + 1;
        // Funcția next adaugă 2 pentru a obține următorul număr par
        super(startValue, value => value + 2);
    }
}

const evenStream = new EvenNumberStream(5);
console.log(`Valoarea initiala: ${evenStream.value}`);

console.log('\nPrimele 10 numere pare din sir:');
for (let i = 0; i < 10; i++) {
    console.log(`evenStream[${i}] = ${evenStream.next}`);
}

console.log('\n');

//ex2 video

class Robot {
    constructor(name) {
        this.name = name

    }

    move() {
        console.log(`${this.name} is moving`)
    }

}

const r0 = new Robot('some robot')
r0.move()

class Weapon {
    constructor(description) {
        this.description = description
    }

    fire() {
        console.log(`${this.description} is firing`)
    }
}

const w0 = new Weapon('laser')
w0.fire()

class CombatRobot extends Robot {
    constructor(name) {
        super(name)
        this.weapons = []
    }

    addWeapons(w) {
        this.weapons.push(w)
    }

    fire() {
        console.log('firing all weapons')
        this.weapons.forEach(element => {
            element.fire()
        });
    }
}

const r1 = new CombatRobot('some combat robot')
r1.addWeapons(w0)
r1.move()
r1.fire()

Robot.prototype.fly = function () {
    console.log(`${this.name} is flying`)
}

r1.fly()

console.log('\n');

// implementați următoarea structură de tipuri. 
// Software este un tip care are metoda 'run'. 
// Browser moștenește Software și poate adăuga și 
// instala Plugin. Un Browser poate avea multiple Plugin.

class Software {
    constructor(name) {
        this.name = name;
    }
    
    run() {
        console.log(`${this.name} is running`);
    }
}

class PlugIn {
    constructor(name) {
        this.name = name;
    }
}

class Browser extends Software {
    constructor(name) {
        super(name);
        this.plugins = [];
    }
    
    addPlugin(plugin) {
        this.plugins.push(plugin);
    }
    
    installPlugin(plugin) {
        this.plugins.push(plugin);
    }
}

const browser = new Browser('Google Chrome');

const plugin1 = new PlugIn('AdBlocker');
const plugin2 = new PlugIn('DarkMode');

browser.addPlugin(plugin1);
browser.installPlugin(plugin2);

browser.run();

console.log('Plugins:', browser.plugins);

console.log('\n');
//ex3 video

function fibGen() {
    const cache = [1, 1]
    const fib = (index) => {
        if (index < cache.length) {
            console.log('found ' + index)
            return cache[index]
        } else {
            console.log('calculated ' + index)
            cache[index] = fib(index - 1) + fib(index - 2)
            return cache[index]
        }
    }
    return fib
}

const fib = fibGen()
console.log(fib(1))
console.log(fib(5))
console.log(fib(3))


console.log('\n');

//implementați o variantă recursiva a unei 
// funcții de exponențiere. Atât rezultatele 
// finale cât și cele intermediare vor fi memoizate.

const mem = {};

function putere(baza, exponent) {
    if (exponent === 0) {
        return 1;
    }
    
    const cheie = `${baza}^${exponent}`;
    if (mem[cheie] !== undefined) {
        console.log(`  (din cache: ${cheie} = ${mem[cheie]})`);
        return mem[cheie];
    }
    
    console.log(`  Calculez: ${cheie}`);
    const rezultat = baza * putere(baza, exponent - 1);
    
    mem[cheie] = rezultat;
    
    return rezultat;
}

console.log(`${putere(2, 5)}\n`);

console.log(`${putere(2, 5)}\n`);

console.log(`${putere(2, 8)}\n`);

console.log(mem);


console.log('\n');
//ex4 video

String.prototype.capitalizedWords = function () {
    return this.replace(/\b[a-z]/g, match => match.toUpperCase())
}

console.log("these words will be calipalized".capitalizedWords())


console.log('\n');
// implementați metoda 'times' pe tipul Number, 
// astfel încât 3.times(() => {}) să execute funcția de 3 ori.

Number.prototype.times = function(functie) {
    for (let i = 0; i < this; i++) {
        functie(i);
    }
};

console.log('Executa functia de 3 ori');
(3).times(() => {
    console.log('Hello!');
});

console.log('\n');
//ex5 video

const orderCoffee = (type) => {

    const types = {
        REGULAR: 'REGULAR',
        SPECIAL: 'SPECIAL'
    }

    if (Object.values(types).indexOf(type) === -1) {
        throw new Error('coffee error')
    } else {
        console.log(`preparing ${type} coffee`)
    }
}

try {
    orderCoffee('REGULAR')
    orderCoffee('SWEET_COFFEE_NO_SUGAR')
} catch (err) {
    console.log(err)
}

console.log('\n');

// implementați funcția increaseSalary care primește ca 
// parametrii un array de salarii și un număr reprezentând 
// procentul cu care se vor mări (ex 10). Funcția aruncă 
// excepții dacă primul parametru nu este un array sau al 
// doilea parametru nu este un număr.

function increaseSalary(salarii, procent) {
    if (!Array.isArray(salarii)) {
        throw new Error('Primul parametru trebuie sa fie un array');
    }
    
    if (typeof procent !== 'number') {
        throw new Error('Al doilea parametru trebuie sa fie un numar');
    }
    
    const rezultat = [];
    for (let i = 0; i < salarii.length; i++) {
        rezultat.push(salarii[i] + (salarii[i] * procent / 100));
    }
    return rezultat;
}

const salarii = [3000, 4500, 5000, 3500];
console.log('Salarii initiale:', salarii);

const salariiMarite = increaseSalary(salarii, 10);
console.log('Salarii dupa marire cu 10%:', salariiMarite);

try {
    increaseSalary('nu este array', 10);
} catch (error) {
    console.log('Eroare 1:', error.message);
}

try {
    increaseSalary([3000, 4000], '10');
} catch (error) {
    console.log('Eroare 2:', error.message);
}
