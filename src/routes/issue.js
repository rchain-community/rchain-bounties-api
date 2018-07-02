const github = require('octonode')

const client = github.client();

module.exports = function (server) {
    server.route({
        method: 'GET',
        path: '/issue/{id}',
        handler:  (request, h) => {
            return request.params.id
        }
    });
}
