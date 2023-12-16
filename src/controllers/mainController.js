const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited = products.filter(product => product.category === 'visited')
		const inSale = products.filter(product => product.category === 'in-sale')
		res.render("index", {visited, inSale, toThousand})
	},
	search: (req, res) => {
		let {keywords} = req.query;
		let products = loadProducts();
		let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
		
		return res.render('results',{
			result,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;
