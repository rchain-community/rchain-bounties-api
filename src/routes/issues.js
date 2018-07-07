const github = require('octonode')
const Joi = require('joi')

const client = github.client()
const search = client.search()


const issues = function (page, per_page, state, author, label) {
    const query = {
        q: 'repo:rchain/bounties',
        sort: 'created',
        order: 'desc',
        per_page,
        page
    }

    if (state) query.q += `+state:${state}`
    if (author) query.q += `+author:${author}`
    if (label) query.q += `+label:${label}`

    return new Promise((resolve) => {
        search.issues(query, (err, issues) => { resolve(issues) })
    })
}

module.exports = function (server) {
    server.route({
        method: 'GET',
        path: '/issues',
        handler:  (request, h) => {
            console.log(request.query)
            return issues(
                request.query.page,
                request.query.per_page,
                request.query.state,
                request.query.author,
                request.query.label,
            )
        },
        options: {
            validate: {
                query: {
                    page: Joi.number().integer().min(1).max(100).default(1),
                    per_page: Joi.number().integer().min(1).max(100).default(20),
                    state: Joi.string().default('open'),
                    author: Joi.string(),
                    label: Joi.string()
                }
            }
        }
    });
}
