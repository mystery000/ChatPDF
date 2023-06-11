const { v4 } = require('uuid');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { TextLoader } = require('langchain/document_loaders/fs/text');
const { initPinecone } = require('../utils/pinecone-client');
const { PINECONE_INDEX_NAME } = require('../config');

const ingest = async (fileList, indexId) => {
    try {
        const embeddings = new OpenAIEmbeddings();
        //change to your own index name
        const PINECONE_NAME_SPACE = indexId || v4();
        const pineCone = new PineconeStore(embeddings, {
            pineconeIndex: global.index,
            namespace: PINECONE_NAME_SPACE,
            textKey: 'text',
        });

        /* Split text into chunks */
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
            keepSeparator: true,
        });

        console.log('Creating vector store...');
        let data = [];
        for (const file of fileList) {
            const indexKey = v4();
            let pdfLoad = new PDFLoader(file.path, { splitPages: true });
            const pdfDocs = await pdfLoad.load();
            let docs = await textSplitter.splitDocuments(pdfDocs);
            /*create and store the embeddings in the vectorStore*/
            let ids = docs.map((doc, ind) => (indexKey + '_' + ind));
            data.push({ ...file, indexKey, size: docs.length});
            await pineCone.addDocuments(docs, ids);
            // rawDocs = [...rawDocs, ...pdfDocs];
        }
        console.log('Created vector store!');

        return [PINECONE_NAME_SPACE, data];
    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to ingest your data');
    }
};

module.exports = {
    ingest,
};
