const github = require('octonode')

const client = github.client();

module.exports = function (server) {
    server.route({
        method: 'GET',
        path: '/labels',
        handler: (request, h) => {
            return new Promise((resolve) => {
                client.repo('rchain/bounties').labels((err, labels) => {
                    resolve(labels)
                })
            })
        }
    });
}
