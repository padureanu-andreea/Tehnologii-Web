function compresieRLE(text) {
    if (text.length === 0) {
        return '';
    }
    
    let rezultat = '';
    let caracterCurent = text[0];
    let contor = 1;
    
    for (let i = 1; i < text.length; i++) {
        if (text[i] === caracterCurent) {
            contor++;
        } else {
            rezultat += contor + caracterCurent;
            caracterCurent = text[i];
            contor = 1;
        }
    }
    
    rezultat += contor + caracterCurent;
    
    return rezultat;
}

function decompresieRLE(textComprimat) {
    let rezultat = '';
    let i = 0;
    
    while (i < textComprimat.length) {
        let numar = '';
        
        while (i < textComprimat.length && textComprimat[i] >= '0' && textComprimat[i] <= '9') {
            numar += textComprimat[i];
            i++;
        }
        
        const caracter = textComprimat[i];
        i++;
        
        const repetari = parseInt(numar);
        for (let j = 0; j < repetari; j++) {
            rezultat += caracter;
        }
    }
    
    return rezultat;
}

console.log('Compresie RLE \n');

const text1 = 'aaabbbcccdddd';
console.log('Text original:', text1);
const comprimat1 = compresieRLE(text1);
console.log('Text comprimat:', comprimat1);
console.log('Text decomprimat:', decompresieRLE(comprimat1));