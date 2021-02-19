const db = require('../db');
const Sequelize = require('sequelize');
module.exports = db.defineModel('paintingClass',{
    name:Sequelize.STRING(100),
    value:Sequelize.STRING(100),
})