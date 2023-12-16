const fs = require('fs');
const path = require('path');

// LEE Y TRANSFORMA .JSON EN ARRAY DE OBJETOS -->
let leerArchivo = (fileName) => {
const productsFilePath = path.join(__dirname, '../data/', fileName +'.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products
}

// TRANSFORMA EL ARRAY DE OBJETOS EN JSON Y LO REESCRIBE --> 
let cargarArchivo = (newArray, fileName) => {
const pathFile = path.join(__dirname, '../data/', fileName + '.json');
const newJson = JSON.stringify(newArray);
fs.writeFileSync(pathFile, newJson, 'utf-8')
}

let idUnico = () => {
    return Date.now()
}

module.exports = {leerArchivo, cargarArchivo, idUnico}
