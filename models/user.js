const db = require('../db');
const Sequelize = require('sequelize');
module.exports = db.defineModel('users',{
    name:Sequelize.STRING(100),
    password:Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN
})