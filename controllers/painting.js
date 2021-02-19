//画作相关处理api
const model = require('../model')
    
let painting = model.painting;
let paintingClass = model.paintingClass;
function GetRequest(urlStr) {
    var url = "?" + urlStr.split("?")[1];
     var theRequest = new Object();
     if (url.indexOf("?") != -1) {
         var str = url.substr(1);
         strs = str.split("&");
         for (var i = 0; i < strs.length; i++) {
             theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
         }
     }
     return theRequest;
}


module.exports = {
    'GET /api/allpainting':async(ctx,next)=>{//查找所有画作
        let pars = GetRequest(ctx.url);
        try{ 
            let paintings = await painting.findAll();
            ctx.rest({
                data: paintings,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
            console.log(err);
        }
    },
    'GET /api/painting':async(ctx,next)=>{//查找指定ID画作
        let pars = GetRequest(ctx.url);
        try{ 
            let paintings = await painting.find({
                where:{
                    id:pars.id
                }
            });
            ctx.rest({
                data: paintings,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
            console.log(err);
        }
    },
    'GET /api/paintingClass':async(ctx,next)=>{//查找指定分类画作
        let pars = GetRequest(ctx.url);
        try{ 
            let paintings = await painting.findAll({
                where:{
                    class:pars.class
                }
            });
            ctx.rest({
                data: paintings,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
        }
    },
    'GET /api/getAllClass':async(ctx,next)=>{//查找指定分类画作
        let pars = GetRequest(ctx.url);
        try{ 
            let allClass = await paintingClass.findAll({
                
            });
            ctx.rest({
                data: allClass,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
        }
    },
    'POST /api/paintingChange':async(ctx,next)=>{    //   修改指定ID画作
        try{ 
            let paintings = await painting.find({
                where:{
                    id:ctx.request.body.id
                }
            });
            for(let val in ctx.request.body){
                paintings[val] = ctx.request.body[val];
            }
            await paintings.save();
            ctx.rest({
                data: paintings,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
        }
    },
    'POST /api/paintingDel':async(ctx,next)=>{    //   删除指定ID画作
        try{ 
            let paintings = await painting.find({
                where:{
                    id:ctx.request.body.id
                }
            });
            await paintings.destroy();
            ctx.rest({
                data: "删除成功",
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:err,
                code:'err'
            })
        }
    },
    'POST /api/creatPaiting':async(ctx,next)=>{
        painting.create({
            src:"/koaREST/public/uploads/"+ctx.request.body.filename,
            title:ctx.request.body.title,
            price: ctx.request.body.price,
            introduce: ctx.request.body.introduce,
            class:ctx.request.body.class,
            id:Date.now(),
            createAt:Date.now(),
            updateAt:Date.now(),
            isbanner:0
        })
        
        ctx.rest({
            data:'ok',
            code:'v'
        })
    }
}

