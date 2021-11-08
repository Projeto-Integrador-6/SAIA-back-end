require('dotenv/config');

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'admin',
    DATABASE: process.env.DB_DATABASE || 'projetointegradorvi',
    DIALECT: process.env.DB_DIALECT || 'mysql'
}