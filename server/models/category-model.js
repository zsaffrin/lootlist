var mongoose = require('mongoose'),
	shortid = require('shortid');

const categorySchema = new mongoose.Schema({
    id: { type: String, default: shortid.generate },
    shortname: { type: String, default: "" },
    singlename: { type: String, default: "" },
    displayname: { type: String, default: "" }
}, { collection: 'categories' });

module.exports = mongoose.model('Category', categorySchema);
