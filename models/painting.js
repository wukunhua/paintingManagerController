const db = require('../db');
const Sequelize = require('sequelize');
module.exports = db.defineModel('paintings',{
    src:Sequelize.STRING(100),
    title:Sequelize.STRING(100),
    price: Sequelize.STRING(100),
    introduce: Sequelize.STRING(500),
    class:Sequelize.STRING(500),
    isbanner:Sequelize.STRING(100)
})