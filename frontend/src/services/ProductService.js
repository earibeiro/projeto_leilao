export const ProductService = {
	getProductsSmall() {
		return new Promise((resolve) => {
			const products = [
				{
					id: '1000',
					name: 'Bamboo Watch',
					description: 'Product Description',
					price: 65,
					inventoryStatus: 'INSTOCK',
					image: 'bamboo-watch.jpg'
				},
				{
					id: '1001',
					name: 'Black Watch',
					description: 'Product Description',
					price: 72,
					inventoryStatus: 'LOWSTOCK',
					image: 'black-watch.jpg'
				},
				{
					id: '1002',
					name: 'Blue Band',
					description: 'Product Description',
					price: 79,
					inventoryStatus: 'OUTOFSTOCK',
					image: 'blue-band.jpg'
				},
				
			];
			resolve(products);
		});
	}
};