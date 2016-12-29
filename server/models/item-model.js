var mongoose = require('mongoose'),
	shortid = require('shortid');

const itemSchema = new mongoose.Schema({
    id: { type: String, default: shortid.generate },
    category: { type: String, default: "", trim: true },
    name: { type: String, default: "", trim: true },
    book_value: { type: Number, default: 0 }
}, { collection: 'items' });

module.exports = mongoose.model('Item', itemSchema);
