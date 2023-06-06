const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
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
