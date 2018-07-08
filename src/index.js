const Hapi = require('hapi');
const routes = require('./routes')
const database = require('../.env.json')
// Server
const server = Hapi.server({ port: 3000, host: 'localhost' })
// Redis
const redis = require("redis")
const client = redis.createClient()
client.on("error", function (err) { console.log("Redis error: " + err) })

const init = async () => {
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}
// Catch errors
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  database.name,
  database.username,
  database.password, {
    host: database.url,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// Init server
init()
routes(server)

