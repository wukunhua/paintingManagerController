const db = require('../db');
const Sequelize = require('sequelize');
module.exports = db.defineModel('info',{
    start:Sequelize.STRING(100),
    end:Sequelize.STRING(100),
    way: Sequelize.STRING(100),
    driver: Sequelize.STRING(100),
    num: Sequelize.INTEGER(100),
    company: Sequelize.STRING(100),
    issued: Sequelize.STRING(100),
    license: Sequelize.STRING(100),
    startTime: Sequelize.STRING(100),
    endTime: Sequelize.STRING(100),
    type: Sequelize.STRING(100),
})