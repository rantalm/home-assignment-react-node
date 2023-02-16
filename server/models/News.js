const mongoose = require('mongoose')
const { fetchNewsByTermAndLocation } = require('../utils/api')
const { isToday } = require('../utils/helpers')

const url = "mongodb+srv://user2:Oa5QtqFQZx7VW89n@cluster0.wu5s4kq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url, { dbName: 'test2' })

const News = mongoose.model('News', { 
    title: String, author: String, description: String, content: String, url_to_image: String, published_at: Date,
    updated_at: { type: Date, default: () => Date.now() }
})

/**
 * @param { String } term 
 * @param { String } location 
 * @param { String | Number } limit 
 * @param { String | Number } skip 
 * 
 * @returns { Promise }
 */

const getNewsByTermAndLocation = async (term, location, limit=5, skip=0) => {
    try {
        const conditions = {
            $and: [
                {
                    $or: [
                        { title: { $regex: new RegExp(term, "i") } },
                        { description: { $regex: new RegExp(term, "i") } },
                        { content: { $regex: new RegExp(term, "i") } },
                    ]
                },
                {
                    $or: [
                        { title: { $regex: new RegExp(location, "i") } },
                        { description: { $regex: new RegExp(location, "i") } },
                        { content: { $regex: new RegExp(location, "i") } },
                    ]
                }
            ]
        }
        
        /* The amount of queris should be reduce, maybe with aggregation */
        const lastRecord = await News.find(conditions).sort({ 'updated_at' : -1 }).limit(1)
        const count = await News.find(conditions).count()

        let newRecords = null

        if (!lastRecord.length) // No records
            newRecords = await fetchNewsByTermAndLocation(term, location)
        
        else if(!isToday(new Date(lastRecord[0].updated_at)) || count < 10) // No sufficient
            newRecords = await fetchNewsByTermAndLocation(term, location, lastRecord[0].updated_at)

        if (newRecords?.articles.length) {
            const news = newRecords.articles.map(article => ({ 
                title: article.title,
                author: article.author,
                description: article.description,
                content: article.content,
                url_to_image: article.urlToImage,
                published_at: article.publishedAt
            }))

           await News.insertMany(news)
        }

        return News.find(conditions, 'title author description url_to_image published_at').limit(limit).skip(skip)

    } catch(err) {
        console.log( 'Error:::', err )
    }
}

const getArticleContentById = async id => await News.findById(id, 'content')


module.exports = {
    News,
    getNewsByTermAndLocation,
    getArticleContentById
}