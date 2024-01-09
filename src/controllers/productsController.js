const fs = require('fs');
const path = require('path');

const {leerArchivo, cargarArchivo, idUnico} = require('../data/dbLogica')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const { id } = req.params;
		let products = leerArchivo('productsDataBase')
		const product = products.find(product => product.id === +id);
		res.render('detail', {title: products.name, product, toThousand })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const { name, price, discount, category, description, image } = req.body;

		let archivo = leerArchivo('productsDataBase');

		const newId = idUnico();

		const newArray = {
            id: newId,
            name : name.trim(),
            price: +price,
            discount: +discount,
            category,
            description: description.trim(),
            image,
        };

		let newArchivo = [...archivo, newArray]
		cargarArchivo(newArchivo, 'productsDataBase');

		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let {id} = req.params
		let products = leerArchivo('productsDataBase')
		let productEdit = products.find(productEdit => productEdit.id === +id);
		
		res.render('product-edit-form', {products, productEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const { name, price, discount, category, description} = req.body;

		let archivo = leerArchivo('productsDataBase');
		
		let productIndex = -1;

		archivo.forEach((product, index) =>{
			if(product.id === +id){
				productIndex = index;
			}
		});

		if(productIndex !== -1){
			const guardarImage = archivo[productIndex].image

		archivo[productIndex] = {
            id: +id,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category,
            description: description.trim(),
        };

		if(guardarImage !== undefined){
			archivo[productIndex].image = guardarImage;
		}
	}

		cargarArchivo(archivo, 'productsDataBase');
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
		const archivoJson = leerArchivo('productsDataBase')

		const productosNoEliminados = archivoJson.filter(product => product.id !== +id)

		cargarArchivo(productosNoEliminados, 'productsDataBase')

		res.redirect('/')
	}
};

module.exports = controller;