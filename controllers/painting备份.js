//画作相关处理api
const model = require('../model')
    
let painting = model.painting;
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
            console.log(err);
        }
    },
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
    'POST /api/setPaiting':async(ctx,next)=>{
        let paintings = await painting.findAll({
            where: {
                id: 0
            }
        });
        for (let x of paitings) {
            console.log(JSON.stringify(x));
            x.start =  ctx.request.body.start;
            x.end =    ctx.request.body.end;
            x.way =    ctx.request.body.way;
            x.driver = ctx.request.body.driver;
            x.num =    ctx.request.body.num;
            x.company = ctx.request.body.company;
            x.issued = ctx.request.body.issued;
            x.license = ctx.request.body.license;
            x.startTime = ctx.request.body.startTime;
            x.endTime = ctx.request.body.endTime;
            let res = await x.save();
            console.log(res);
        }
        ctx.rest({
            data:'ok',
            code:'v'
        })
    }
}

