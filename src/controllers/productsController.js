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
		let products = leerArchivo('productsDataBase')
		res.render('product-edit-form', {products})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		let archivo = leerArchivo('productsDataBase');

		let product

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;