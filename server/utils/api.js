const axios = require('axios')
const { getDate30DaysAgo } = require('./helpers')

const apiKey = '28c818474fd9481192089c5bed396613'
const baseUrl = 'https://newsapi.org/v2/everything'

/**
 * 
 * @param { String } term 
 * @param { String } location 
 * @param { String } from 
 * 
 * @returns { Promise }
 */

const fetchNewsByTermAndLocation = (term, location, from) => {
    from = from || getDate30DaysAgo()
    console.log('fetching')
    
    return new Promise((resolve, reject) => {
        axios.get(baseUrl, {
            params: {
                apiKey,
                q: `${term} AND ${location}`, // The api does not support 'country' parameter with 'everything' endpoint
                from
            }
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports = {
    fetchNewsByTermAndLocation
}
