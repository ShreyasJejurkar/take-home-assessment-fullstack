const { products } = require('../data/mockData');

function listProducts(_req, res) {
  res.json(products);
}

/**
 * Get a single product by id.
 * TODO (Assessment Task - Backend 1): Implement this handler to return the product
 * when found, or 404 with { error: 'Product not found' } when the id does not match.
 */
function getProductById(req, res) {

  if (!req.params.id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const product = products.find(p => p.id == req.params.id);

  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ error: 'Product not found' });
  }
}

module.exports = { listProducts, getProductById };
