const github = require('octonode')
const Joi = require('joi');

const client = github.client();


const issues = function (page, per_page, state, author) {
    const query = {
        page: page,
        per_page: per_page,
        state: (state === 'open' || state === 'closed') ? state : 'open',
        author: {
            q: `author:${author}+repo:rchain/bounties`,
            sort: 'created',
            order: 'asc'
        },
    }
    return new Promise((resolve) => {
        if (author) {
            client.search().issues(query.author, (err, issues) => { resolve(issues) })
        } else {
            client.repo('rchain/bounties').issues(query, (err, issues) => { resolve(issues) })
        }
    })
}

module.exports = function (server) {
    server.route({
        method: 'GET',
        path: '/issues',
        handler:  (request, h) => {
            return issues(
                request.query.page,
                request.query.per_page,
                request.query.state,
                request.query.author
            )
        },
        options: {
            validate: {
                query: {
                    page: Joi.number().integer().min(1).max(100).default(1),
                    per_page: Joi.number().integer().min(1).max(100).default(20),
                    state: Joi.string().default('open'),
                    author: Joi.string()
                }
            }
        }
    });
}
