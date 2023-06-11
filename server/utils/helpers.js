const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

const User = require('../models/user');
const { initPinecone } = require('./pinecone-client');
const { makeChain } = require('./makechain');
const { PINECONE_INDEX_NAME } = require('../config');

exports.emptyFolder = async (folderPath) => {
  try {
    if (fs.existsSync(path.resolve(folderPath))) {
      fs.rmSync(path.resolve(folderPath), { recursive: true, force: true });
      console.log(`'${folderPath}' has been removed successfully!`);
    } else {
      console.log(`'${folderPath}' does not exist!`);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.rmSync(path.resolve(filePath), { recursive: true, force: true });
      console.log(`'${filePath}' has been removed successfully!`);
    } else {
      console.log(`'${filePath}' does not exist!`);
    }
  } catch (error) {
    console.log(error);
  }
}

exports.chat = async (question, sourceId, user) => {
  /* create vectorstore*/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: global.index,
      textKey: 'text',
      namespace: sourceId, //namespace comes from request parameters
    },
  );
  //create chain
  const chain = makeChain(vectorStore);
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {

    const data = await User.findOne(
      {
        _id: user._id,
        'sources.sourceId': sourceId,
      },
      'sources.messages.$',
    );
    let messages = [];
    if (data) {
      messages = data.sources[0].messages;
    }
    let chat_history = messages.map((message) => message.text).slice(1);
    chat_history = _.chunk(chat_history, 2);
    
    // chat_history.push(sanitizedQuestion);

    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: chat_history || [],
    });
    const { text, sourceDocuments } = response;
    const msgUser = {
      sentAt: new Date(),
      sentBy: user.username,
      isChatOwner: true,
      text: question,
    };
    const msgLangchain = {
      sentAt: new Date(),
      sentBy: 'landlordgenius.ai',
      isChatOwner: false,
      text: text,
      sourceDocuments: sourceDocuments,
    };
    return [msgUser, msgLangchain];
  } catch (err) {
    console.log(err);
  }
}

exports.createIndex = async () => {
  const pinecone = await initPinecone();
  const index = pinecone.Index(PINECONE_INDEX_NAME);
  
  return index;
}