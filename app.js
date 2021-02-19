var koa = require('koa');
var app = new koa();
const rest = require('./rest');                  //为接口添加    ctx.response.type = 'application/json';
const controller = require('./controller');      //扫描api并自动导入use
const bodyParser = require('koa-bodyparser');    //将请求信息解析为json
const uploadfile = require('./unAutoControllers/upload');//上传文件处理

app.use(bodyParser());
app.use(async (ctx, next)=> {           //允许所有地址的跨域请求
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
});
app.use(rest.restify());

app.use(controller());
app.use(uploadfile);

app.listen(3001);
console.log('app started at port 3001...');




