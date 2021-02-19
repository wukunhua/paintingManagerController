const model = require('../model')
    
let user = model.user;
var users;
// (async () => {
//     users = await user.create({
//         name:"xds",
//         password:"pwd",
//         email: "163@qq.ccom",
//         gender: "1"
//     });
//     console.log(users);
// })()
module.exports = {
    'GET /api/products':async(ctx,next)=>{
         // 设置Content-Type:
         ctx.response.type = 'application/json';
         // 设置Response Body:
         ctx.response.body = {
             products: users
         };
    },
    'GET /api/test':async(ctx,next)=>{
        ctx.rest({
            data:123
        })
    }
}

