var fn_hello = async (ctx, next) => {
    ctx.response.body = `<h1>Hello, wx</h1>`;
};

module.exports = {
    'GET /wx': fn_hello
};