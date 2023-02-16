const nodeCache = require('node-cache')

const cache = new nodeCache()

module.exports = duration => (req, res, next) => {
    if(req.method !== 'GET')
        return next()

    const key = req.originalUrl
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
        console.log(`cache for key: ${ key } exists`)
        res.send(cachedResponse)
    } else {
        res.origonalSend = res.send
        res.send = body => {
            res.origonalSend(body)
            cache.set(key, body, duration)
            console.log(`set cache for key: ${ key }`)
        }
        next()
    }
}