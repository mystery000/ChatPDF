const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        sourceId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const DocumentModel = mongoose.model('documents', documentSchema);

module.exports = DocumentModel;
