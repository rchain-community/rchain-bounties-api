module.exports = function (server) {
    require('./issues')(server)
    require('./issue')(server)
    require('./labels')(server)
}
