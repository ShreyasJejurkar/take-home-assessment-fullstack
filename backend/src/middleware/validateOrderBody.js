/**
 * TODO (Assessment Task - Backend 2): Implement validation for POST /api/orders body.
 * Validate that req.body has:
 * - items: array of { productId: string, quantity: number }
 * - each item must have productId (non-empty string) and quantity (positive integer)
 * If invalid, respond with 400 and { error: '...' } and do not call next().
 * If valid, call next().
 */
function validateOrderBody(req, res, next) {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain an array of items.' });
  }

  for (const item of items) {
    if (!item.productId || typeof item.productId !== 'string' || item.productId.trim() === '') {
      return res.status(400).json({ error: 'Each item must have a productId without empty value.' });
    }
    if (!item.quantity || typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return res.status(400).json({ error: 'Each item must have a positive quantity value.' });
    }
  }

  next();
}

module.exports = { validateOrderBody };
