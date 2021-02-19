//自动扫描并导入controllers文件夹下的所有.js文件
const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {      //4.对每个文件暴露出的多个方法进行遍历
        if (url.startsWith('GET ')) {       //5.如果是get方法  就router get 暴露出去  mapping[url] 是他这个接口路径对应的方法
            var path = url.substring(4);    
            router.get(path, mapping[url]);
            //console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            //console.log(`register URL mapping: POST ${path}`);
        } else {
            //console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers'); //1.拿到指定文件夹下的所有文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');     //2.拿到所有js文件
    });

    for (var f of js_files) {
        //console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);//3.导入所有js文件暴露出来的方法   每个文件可能会暴露多个方法
        addMapping(router, mapping);
    }
}


module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};