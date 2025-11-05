let firstRow = document.querySelector("tbody tr:first-child")
let lastRow = document.querySelector("tbody tr:last-child")
let oddCollection = document.querySelectorAll("tbody tr:nth-child(odd)")

if(oddCollection && oddCollection.length > 0) {
    for(let item of oddCollection){
        item.bgColor = 'magenta';
    }
}

if(firstRow){
    firstRow.bgColor = 'blue';
}

if(lastRow){
    lastRow.bgColor = 'green';
}