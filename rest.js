//为接口添加响应头   免去每次写接口都添加一遍的麻烦
module.exports = {
    restify:(pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx,next) => {
            if(ctx.request.path.startsWith(pathPrefix)){
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                await next();
            }else{
                await next();
            }
        }
    }
}