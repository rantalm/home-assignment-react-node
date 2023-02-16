const express = require('express')
const cors = require('cors')
const cache = require('./utils/cache')
const { getNewsByTermAndLocation, getArticleContentById } = require('./models/News')
const PORT = process.env.PORT || 5500

const app = express()
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    return res.send('<p>--- news assignment.</p> <p>GET - /api/news/:id</p> <p>GET - /api/news/:term/:location</p>')
});

app.get('/api/news/:id', cache() /* default 10 min */,  async (req, res) => {
    const { id } = req.params
    const article = await getArticleContentById(id)
    
    return res.json(article)
});

app.get('/api/news/:term/:location', cache() /* default 10 min */,  async (req, res) => {
    const { term, location } = req.params
    const news = await getNewsByTermAndLocation(term, location, req.query.count, req.query.offset)
    
    return res.json(news)
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
