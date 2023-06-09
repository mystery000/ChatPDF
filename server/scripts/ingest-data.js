const { v4 } = require('uuid');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { TextLoader } = require('langchain/document_loaders/fs/text');
const { initPinecone } = require('../utils/pinecone-client');
const { PINECONE_INDEX_NAME } = require('../config');

const ingest = async (dir, indexId) => {
    try {
        const pinecone = await initPinecone();
        /*load raw docs from the all files in the directory */
        const directoryLoader = new DirectoryLoader(dir, {
            '.pdf': (path) => new PDFLoader(path, { splitPages: true }),
            '.txt': (path) => new TextLoader(path),
        });

        const rawDocs = await directoryLoader.load();
        // console.log(rawDocs);
        /* Split text into chunks */
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
            keepSeparator: true,
        });

        const docs = await textSplitter.splitDocuments(rawDocs);
        console.log('Creating vector store...');
        /*create and store the embeddings in the vectorStore*/
        const embeddings = new OpenAIEmbeddings();
        const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

        //embed the PDF documents

        const PINECONE_NAME_SPACE = indexId || v4();

        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: index,
            namespace: PINECONE_NAME_SPACE,
            textKey: 'text',
        });
        console.log('Created vector store successfully!');
        return PINECONE_NAME_SPACE;
    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to ingest your data');
    }
};

module.exports = {
    ingest,
};
