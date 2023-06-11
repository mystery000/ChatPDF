const User = require('../models/user');
const Document = require('../models/document');
const { ingest } = require('../scripts/ingest-data');
const { deleteFile, chat } = require('../utils/helpers');

/*
    POST http://localhost:5000/apis/sources/upload HTTP/1.1

    content-type: multipart/form-data
    Authorization: Bearer

    {
        "sourceId": "5f9f5a24-b63b-4c72-8834-dda001630830",
        "sourceName": "source name",
        "files": []
    }

    return: sourceId(pinecone Index Namespace) when add a soucre
    return documents when append documents to the source
*/

exports.addSource = async (req, res) => {
    try {
        const files = req.body.fileList;
        const sourceId = req.body.sourceId;
        const sourceName = req.body.sourceName || `Untitled_${Date.now()}`;

        if (files.length) {
            // Embedding PDF files into the Pinecone, returns id of pinecone index
            // await emptyFolder(dir);
            const [indexId, fileList] = await ingest(files, sourceId);

            if (sourceId) {
                const documents = fileList.map((file) => ({
                    name: file.filename,
                    path: file.path,
                    indexKey: file.indexKey,
                    size: file.size,
                    sourceId: sourceId,
                    userId: req.user._id,
                }));
                const docs = await Document.insertMany(documents);
                return res.json({ documents: docs });
            } else {
                const [msgUser, msgLangchain] = await chat('please summarize this document', indexId, req.user);
                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            sources: {
                                name: sourceName,
                                sourceId: indexId,
                                messages: [
                                    {
                                        ...msgLangchain,
                                        text: msgLangchain.text + '\n\n What else would you like to know?',
                                    },
                                ],
                            },
                        },
                    },
                );
                const documents = fileList.map((file) => ({
                    name: file.filename,
                    path: file.path,
                    indexKey: file.indexKey,
                    size: file.size,
                    sourceId: indexId,
                    userId: req.user._id,
                }));
                const docs = await Document.insertMany(documents);
                return res.json({ sourceId: indexId, name: sourceName, documents: docs });
            }
        }
        return res.json({ message: 'No files' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ error: err });
    }
};

exports.uploadFile = async (req, res) => {
    const file = req.file;
    return res.json({path: file.path.replace(/\\/g, "/"), filename: file.originalname});
}

exports.deleteFile = async (req, res) => { 
    const path = req.body.path;
    deleteFile(path);
    return res.json({ success: true });
}
/*
    DELETE http://localhost:5000/apis/sources/:sourceId HTTP/1.1

    Authorization: Bearer

    sourceId: String

*/

exports.deleteSource = async (req, res) => {
    const sourceId = req.params.sourceId;
    try {
        await global.index.delete1({ deleteAll: true, namespace: sourceId });
        await User.updateOne(
            { _id: req.user._id, 'sources.sourceId': sourceId },
            {
                $pull: {
                    sources: { sourceId },
                },
            },
        );

        return res.json({ sourceId });
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
};
/*
    DELETE http://localhost:5000/apis/sources/:sourceId/messages HTTP/1.1

    Authorization: Bearer

    sourceId: String

    Remove all messages from source with specifc sourceId
*/

exports.deleteAllMessage = async (req, res) => {
    const sourceId = req.params.sourceId;
    try {
        await User.updateOne(
            { _id: req.user._id, 'sources.sourceId': sourceId },
            {
                $set: {
                    'sources.$.messages': [],
                },
            },
        );
        res.json({ success: 'Cleared successfully!' });
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
};
/*
    GET http://localhost:5000/apis/sources/:sourceId/messages HTTP/1.1

    Authorization: Bearer

    Get messages from specific source
    Return Type: Array
*/

exports.getMessagesFromSource = async (req, res) => {
    try {
        const sourceId = req.params.sourceId;
        const data = await User.findOne(
            {
                _id: req.user._id,
                'sources.sourceId': sourceId,
            },
            'sources.messages.$',
        );
        const messages = data?.sources[0]?.messages ?? [];
        return res.json({ messages });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};
/*
    POST http://localhost:5000/apis/sources/:sourceId/chat HTTP/1.1

    Content-Type: application/json
    Authorization: Bearer

*/

exports.chat = async (req, res) => {
    const sourceId = req.params.sourceId;
    const { question } = req.body;
    try {
        const [msgUser, msgLangchain] = await chat(question, sourceId, req.user);

        await User.findOneAndUpdate(
            { _id: req.user._id, 'sources.sourceId': sourceId },
            {
                $push: {
                    'sources.$.messages': [msgUser, msgLangchain],
                },
            },
        );
        return res.status(200).json({ apiMessage: msgLangchain });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

/*
    GET http://localhost:5000/apis/sources/documents HTTP/1.1

    Authorization: Bearer

    Get all uploaded documents 
    Return Type: Array
*/
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({userId: req.user._id});
        res.status(200).send({ documents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Failed',
            data: {
                error: error.message,
            },
        });
    }
};

/*
    GET http://localhost:5000/apis/sources/documents/:sourceId HTTP/1.1

    Authorization: Bearer

    Get all uploaded documents in specific source
    Return Type: Array
*/
exports.getDocumentsFromSource = async (req, res) => {
    try {
        const documents = await Document.find({ sourceId: req.params.sourceId });

        res.status(200).send({ documents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Failed',
            data: {
                error: error.message,
            },
        });
    }
};
/*
    GET http://localhost:5000/apis/sources HTTP/1.1

    Authorization: Bearer

    Get all sources of logged user
    
    Return Type:
    sources: [
        {
            name,
            sourceId,
            documents: [],
            messages: []
        }
    ]
*/

exports.getSources = (req, res) => {
    const sources = req.user.sources.map(({ sourceId, name }) => ({
        sourceId,
        name,
    }));
    res.json({ sources });
};

/*
    PUT http://localhost:5000/apis/sources/:sourceId HTTP/1.1

    Authorization: Bearer

    Rename document with specific id

    {
        name: 'new document name'
    }
*/

exports.renameSource = async (req, res) => {
    const name = req.body.name;
    const sourceId = req.params.sourceId;
    try {
        await User.updateOne(
            { _id: req.user._id, 'sources.sourceId': sourceId },
            {
                $set: {
                    'sources.$.name': name,
                },
            },
        );
        res.json({ status: 'OK', name, sourceId });
    } catch (error) {
        return res.json({ error: 'failed to rename document' });
    }
};
