const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 5000,
    MongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/landlord_db',
    SecretKey: process.env.SECRET_KEY || 'secret_landlord',
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || 86400, // One Day
    API_URL: process.env.API_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
