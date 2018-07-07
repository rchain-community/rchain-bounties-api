module.exports = function (server) {
    require('./issues')(server)
    require('./labels')(server)
}
