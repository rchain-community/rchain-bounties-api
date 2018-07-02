const Hapi = require('hapi');
const routes = require('./routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
routes(server)

