//车牌相关处理api
const model = require('../model')
    
let cp = model.bcp;
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
    'GET /api/bcpInfo':async(ctx,next)=>{
        let pars = GetRequest(ctx.url);
        try{ 
            let cps = await cp.find({
                where:{
                    id:pars.id
                }
            });
            ctx.rest({
                data: cps,
                code: 'v'
            })
        }catch(err){
            ctx.rest({
                data:1,
                code:'err'
            })
            console.log(err);
        }
        console.log("await之后")
    },
    'POST /api/setBcpInfo':async(ctx,next)=>{
    	let res;
        let cps = await cp.findAll({
            where: {
                id: ctx.request.body.id
            }
        });
        for (let x of cps) {
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
            x.type = ctx.request.body.type;
            res = await x.save();
        }
        ctx.rest({
            data:1,
            res:res,
        })
    }
}

