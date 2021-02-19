//在创建model时  默认添加id creatAT updateAT 和 verson
const Sequelize = require('sequelize');
const config = require('./config');
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,//最大连接数
        min: 0,//最小连接数
        idle: 30000//断开连接后，连接实例在连接池保持的时间
    }
});
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name,attributes){
    var attrs = {};
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value === 'object' && value['type']){ //如果指定了是否为空  
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{  
            attrs[key] = {
                type:value,
                allowNull:false     //没有指定 默认不允许为空
            }
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updateAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name,attrs,{
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    obj.updateAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;